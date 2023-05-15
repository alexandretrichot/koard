package namespaces

import (
	"context"
	"koard/pkg/shared"

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

func (s *Service) GetNamespaces(ctx context.Context) (shared.List[Namespace], error) {
	kResp, err := s.clientSet.CoreV1().Namespaces().List(ctx, metav1.ListOptions{
		Limit: 1000,
	})
	if err != nil {
		return shared.List[Namespace]{}, err
	}

	namespaces := []Namespace{}
	for _, kNamespace := range kResp.Items {
		namespaces = append(namespaces, Namespace{
			Name: kNamespace.Name,
		})
	}

	//utils.Debug(pods)

	return shared.List[Namespace]{
		Items: namespaces,
		Total: len(namespaces),
		Limit: 1000,
		Skip:  0,
	}, nil
}
