package namespaces

import (
	"context"
	"koard/core/auth"
	"testing"
)

func TestGetNamespaces(t *testing.T) {
	clientSet, err := auth.GetClientSet()
	if err != nil {
		panic(err)
	}

	s := NewService(clientSet)

	namespaces, err := s.GetNamespaces(context.TODO())
	if err != nil {
		panic(err)
	}

	for _, ns := range namespaces.Items {
		t.Logf("Namespace: %s\n", ns.Name)
	}
}
