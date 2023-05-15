package pods

import (
	"time"

	corev1 "k8s.io/api/core/v1"
)

type PodStatus string

const (
	// PodStatusPending is the status of a pod when it is pending.
	PodStatusPending PodStatus = "pending"
	// PodStatusRunning is the status of a pod when it is running.
	PodStatusRunning PodStatus = "running"
	// PodStatusSucceeded is the status of a pod when it is succeeded.
	PodStatusSucceeded PodStatus = "succeeded"
	// PodStatusFailed is the status of a pod when it is failed.
	PodStatusFailed PodStatus = "failed"
	// PodStatusUnknown is the status of a pod when it is unknown.
	PodStatusUnknown PodStatus = "unknown"
)

type Pod struct {
	Namespace       string            `json:"namespace"`
	Name            string            `json:"name"`
	Uid             string            `json:"uid"`
	Status          PodStatus         `json:"status"`
	ResourceVersion string            `json:"resourceVersion"`
	CreatedAt       time.Time         `json:"createdAt"`
	Labels          map[string]string `json:"labels"`
}

type PodDetails struct {
	Pod        `json:",inline"`
	Containers []Container `json:"containers"`
}

type Container struct {
	Name         string                `json:"name"`
	Image        string                `json:"image"`
	Command      []string              `json:"command"`
	Args         []string              `json:"args"`
	Ports        []Port                `json:"ports"`
	State        corev1.ContainerState `json:"state"`
	Ready        bool                  `json:"ready"`
	Started      *bool                 `json:"started"`
	RestartCount int32                 `json:"restartCount"`
}

type Port struct {
	Name          string `json:"name"`
	HostPort      int32  `json:"hostPort"`
	ContainerPort int32  `json:"containerPort"`
	Protocol      string `json:"protocol"`
	HostIP        string `json:"hostIP"`
}

type PodList struct {
	Items []Pod `json:"items"`
	Total int   `json:"total"`
	Limit int   `json:"limit"`
	Skip  int   `json:"skip"`
}
