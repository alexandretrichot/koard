package pods

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	corev1 "k8s.io/api/core/v1"
	k8sErrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

type Service struct {
	clientSet *kubernetes.Clientset
}

func NewService(clientSet *kubernetes.Clientset) *Service {
	s := &Service{
		clientSet: clientSet,
	}

	return s
}

func (s *Service) GetPods(ctx context.Context, namespace string) (PodList, error) {
	kResp, err := s.clientSet.CoreV1().Pods(namespace).List(ctx, metav1.ListOptions{
		Limit: 1000,
	})
	if err != nil {
		return PodList{}, err
	}

	pods := []Pod{}
	for _, kPod := range kResp.Items {
		pods = append(pods, Pod{
			Name:            kPod.Name,
			Namespace:       kPod.Namespace,
			Uid:             string(kPod.GetUID()),
			Status:          getPodStatus(kPod),
			ResourceVersion: kPod.ResourceVersion,
			Labels:          kPod.Labels,
			CreatedAt:       kPod.CreationTimestamp.Time,
		})
	}

	return PodList{
		Items: pods,
		Total: len(pods),
		Limit: 1000,
		Skip:  0,
	}, nil
}

func (s *Service) GetPod(ctx context.Context, namespace string, podName string) (*PodDetails, error) {
	kPod, err := s.clientSet.CoreV1().Pods(namespace).Get(ctx, podName, metav1.GetOptions{})
	if err != nil {
		if k8sErrors.IsNotFound(err) {
			return nil, nil
		}
		return nil, err
	}

	//utils.Debug(kPod)

	pod := PodDetails{
		Pod: Pod{
			Name:            kPod.Name,
			Namespace:       kPod.Namespace,
			Uid:             string(kPod.GetUID()),
			Status:          getPodStatus(*kPod),
			ResourceVersion: kPod.ResourceVersion,
			Labels:          kPod.Labels,
			CreatedAt:       kPod.CreationTimestamp.Time,
		},
		Containers: []Container{},
	}

	for _, kContainer := range kPod.Spec.Containers {
		// find the container status
		var kContainerStatus corev1.ContainerStatus

		for _, kContainerStatus = range kPod.Status.ContainerStatuses {
			if kContainerStatus.Name == kContainer.Name {
				break
			}
		}

		ports := []Port{}
		for _, kPort := range kContainer.Ports {
			ports = append(ports, Port{
				Name:          kPort.Name,
				HostPort:      kPort.HostPort,
				ContainerPort: kPort.ContainerPort,
				Protocol:      string(kPort.Protocol),
				HostIP:        kPort.HostIP,
			})
		}

		pod.Containers = append(pod.Containers, Container{
			Name:         kContainer.Name,
			Image:        kContainer.Image,
			Command:      kContainer.Command,
			Args:         kContainer.Args,
			Ready:        kContainerStatus.Ready,
			Started:      kContainerStatus.Started,
			RestartCount: kContainerStatus.RestartCount,
			Ports:        ports,
			State:        kContainerStatus.State,
		})
	}

	return &pod, nil
}

type Log struct {
	Raw     string            `json:"raw"`
	Date    *time.Time        `json:"date"`
	Message string            `json:"message"`
	Tags    map[string]string `json:"tags"`
}

func (s *Service) GetPodLogs(ctx context.Context, namespace string, podName string, containerName string, tailLines int64, sinceTime time.Time) ([]Log, error) {
	logs := []Log{}

	kResp, err := s.clientSet.CoreV1().Pods(namespace).GetLogs(podName, &corev1.PodLogOptions{
		Container:  containerName,
		Follow:     false,
		TailLines:  &tailLines,
		SinceTime:  &metav1.Time{Time: sinceTime},
		Timestamps: true,
	}).Stream(ctx)
	if err != nil {
		return logs, err
	}

	defer kResp.Close()

	// read the logs line by line
	scanner := bufio.NewScanner(kResp)
	for scanner.Scan() {
		splitted := strings.SplitN(scanner.Text(), " ", 2)

		var date *time.Time
		if time, err := time.Parse(time.RFC3339, splitted[0]); err == nil {
			date = &time
		}

		logStr := splitted[1]

		if strings.HasPrefix(logStr, "{") && strings.HasSuffix(logStr, "}") {
			// if the log is a json object, try to parse it

			obj := map[string]interface{}{}
			if err := json.Unmarshal([]byte(logStr), &obj); err == nil {
				msg := ""

				if v, ok := obj["msg"].(string); ok {
					msg = fmt.Sprintf("%v", v)
					delete(obj, "msg")
				} else if v, ok := obj["message"].(string); ok {
					msg = fmt.Sprintf("%v", v)
					delete(obj, "message")
				}

				/* if msg == "" {
					msg = logStr
				} */

				tags := map[string]string{}
				for k, v := range obj {
					tags[k] = fmt.Sprintf("%v", v)
				}

				logs = append(logs, Log{
					Date:    date,
					Raw:     logStr,
					Message: msg,
					Tags:    tags,
				})
			}

			continue
		}

		logs = append(logs, Log{
			Date:    date,
			Raw:     logStr,
			Message: logStr,
		})
	}

	return logs, nil
}
