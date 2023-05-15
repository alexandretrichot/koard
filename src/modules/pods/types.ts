export type Pod = {
	name: string;
	namespace: string;
	uid: string;
	resourceVersion: string;
	createdAt: string;
	status: PodStatus;
	statusMessage: string;
	statusReason: string;
	hostIP: string;
	podIP: string;
	labels: Record<string, string>;
};

export type PodDetails = Pod & {
	containers: PodContainer[];
};

export type PodContainer = {
	name: string;
	image: string;
	state: {
		waiting?: {
			reason: string;
			message: string;
		};
		running?: {
			startedAt: string;
		};
		terminated?: {
			startedAt: string;
			finishedAt: string;
			exitCode: number;
			reason: string;
			message: string;
			signal: number;
			containerID: string;
		};
	};
	ports: {
		name: string;
		hostPort: number;
		containerPort: number;
		protocol: string;
		hostIP: string;
	}[];
	ready: boolean;
	started?: boolean;
	restartCount: number;
};

export enum PodStatus {
	Running = 'running',
	Pending = 'pending',
	Succeeded = 'succeeded',
	Failed = 'failed',
	Unknown = 'unknown',
}

export type ContainerLog = {
	raw: string;
	date: string | null;
	message: string;
	tags: Record<string, string>;
};
