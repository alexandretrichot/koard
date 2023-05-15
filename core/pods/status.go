package pods

import corev1 "k8s.io/api/core/v1"

func getPodStatus(kPod corev1.Pod) PodStatus {
	switch kPod.Status.Phase {
	case corev1.PodPending:
		return PodStatusPending
	case corev1.PodRunning:
		return PodStatusRunning
	case corev1.PodSucceeded:
		return PodStatusSucceeded
	case corev1.PodFailed:
		return PodStatusFailed
	}

	return PodStatusUnknown
}
