package pods

import (
	"context"
	"koard/core/auth"
	"testing"
)

func TestGetPods(t *testing.T) {
	clientSet, err := auth.GetClientSet()
	if err != nil {
		panic(err)
	}

	s := NewService(clientSet)

	pods, err := s.GetPods(context.TODO(), "kube-system")
	if err != nil {
		panic(err)
	}

	for _, pod := range pods.Items {
		t.Logf("Pod: %s\n", pod.Name)
	}
}
