package logparser

import (
	"testing"
)

var linesToParse map[string]LogLine = map[string]LogLine{
	`I0328 00:01:50.443567 1 start.go:75] cert-manager "msg"="starting controller" "git-commit"="e466a521bc5455def8c224599c6edcd37e86410c" "version"="v1.8.0"`: {
		Message: "starting controller",
		Tags: map[string]string{
			"git-commit": "e466a521bc5455def8c224599c6edcd37e86410c",
			"version":    "v1.8.0",
		},
	},
	`I0328 00:01:50.444184 1 controller.go:242] cert-manager/controller/build-context "msg"="configured acme dns01 nameservers" "nameservers"=["10.32.0.10:53"]`: {
		Message: "configured acme dns01 nameservers",
		Tags: map[string]string{
			"nameservers": "[\"10.32.0.10:53\"]",
		},
	},
	`W0328 00:01:50.445116 1 client_config.go:617] Neither --kubeconfig nor --master was specified. Using the inClusterConfig. This might not work.`: {
		Message: "Neither --kubeconfig nor --master was specified. Using the inClusterConfig. This might not work.",
	},
	`I0328 00:01:50.458847 1 controller.go:70] cert-manager/controller "msg"="enabled controllers: [certificaterequests-approver certificaterequests-issuer-acme certificaterequests-issuer-ca certificaterequests-issuer-selfsigned certificaterequests-issuer-vault certificaterequests-issuer-venafi certificates-issuing certificates-key-manager certificates-metrics certificates-readiness certificates-request-manager certificates-revision-manager certificates-trigger challenges clusterissuers ingress-shim issuers orders]"`: {
		Message: "enabled controllers: [certificaterequests-approver certificaterequests-issuer-acme certificaterequests-issuer-ca certificaterequests-issuer-selfsigned certificaterequests-issuer-vault certificaterequests-issuer-venafi certificates-issuing certificates-key-manager certificates-metrics certificates-readiness certificates-request-manager certificates-revision-manager certificates-trigger challenges clusterissuers ingress-shim issuers orders]",
	},
	`I0328 00:01:50.461866 1 controller.go:134] cert-manager/controller "msg"="starting leader election"`: {
		Message: "starting leader election",
	},
	`I0328 00:01:50.462295 1 controller.go:91] cert-manager/controller "msg"="starting metrics server" "address"={"IP":"::","Port":9402,"Zone":""}`: {
		Message: "starting metrics server",
		Tags: map[string]string{
			"address": "{\"IP\":\"::\",\"Port\":9402,\"Zone\":\"\"}",
		},
	},
	`I0328 00:01:50.463632 1 leaderelection.go:248] attempting to acquire leader lease kube-system/cert-manager-controller...`: {
		Message: "attempting to acquire leader lease kube-system/cert-manager-controller...",
	},
	`I0328 00:02:04.438956 1 leaderelection.go:258] successfully acquired lease kube-system/cert-manager-controller`: {
		Message: "successfully acquired lease kube-system/cert-manager-controller",
	},
	`I0328 00:02:04.446398 1 controller.go:205] cert-manager/controller "msg"="starting controller" "controller"="certificaterequests-approver"`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "certificaterequests-approver",
		},
	},
	`I0328 00:02:04.449160 1 controller.go:205] cert-manager/controller "msg"="starting controller" "controller"="certificaterequests-issuer-selfsigned"`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "certificaterequests-issuer-selfsigned",
		},
	},
	`I0328 00:02:04.451406 1 controller.go:205] cert-manager/controller msg="starting controller" controller=certificates-issuing`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "certificates-issuing",
		},
	},
	`I0328 00:02:04.453128 1 controller.go:205] cert-manager/controller "msg"="starting controller" "controller"=certificates-key-manager`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "certificates-key-manager",
		},
	},
	`I0328 00:02:04.453860 1 controller.go:205] cert-manager/controller "msg"="starting controller" "controller"="certificates-metrics"`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "certificates-metrics",
		},
	},
	`I0328 00:02:04.454981 1 controller.go:205] cert-manager/controller msg="starting controller" controller=orders`: {
		Message: "starting controller",
		Tags: map[string]string{
			"controller": "orders",
		},
	},
}

func TestParseLog(t *testing.T) {
	i := 0
	for line := range linesToParse {
		parsed, err := ParseLogLine(line)
		if err != nil {
			t.Errorf("Error parsing line %d: %v", i, err)
		}
		expected := linesToParse[line]
		if parsed.Message != expected.Message {
			t.Errorf("Error parsing line %d: expected message %s, got %s", i, expected.Message, parsed.Message)
		}
		if len(parsed.Tags) != len(expected.Tags) {
			t.Errorf("Error parsing line %d: expected %d tags, got %d", i, len(expected.Tags), len(parsed.Tags))
			t.Log(parsed.Tags)
		}
		for k, v := range parsed.Tags {
			if expected.Tags[k] != v {
				t.Errorf("Error parsing line %d: expected tag %s=%s, got %s", i, k, expected.Tags[k], v)
			}
		}

		i++
	}
}
