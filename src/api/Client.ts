import { Command } from '@pixdif/model';

interface Callback {
	resolve: (data: unknown) => void;
	reject: () => void;
}

class Client {
	protected readonly wsEndpoint: string;

	protected socket?: WebSocket;

	protected msgId: number;

	protected readonly reqMap: Map<number, Callback>;

	/**
	 * Create a websocket client
	 * @param wsEndpoint Connection endpoint
	 */
	constructor(wsEndpoint: string) {
		this.wsEndpoint = wsEndpoint;
		this.msgId = 1;
		this.reqMap = new Map();
	}

	/**
	 * Connect to the websocket server
	 */
	connect(): Promise<void> {
		if (this.socket) {
			if (this.socket.readyState === WebSocket.OPEN) {
				return Promise.resolve();
			}
			this.socket.close();
		}

		this.socket = new WebSocket(`ws://${this.wsEndpoint}`);
		return new Promise((resolve, reject) => {
			if (!this.socket) {
				reject(new Error('Socket is disconnected.'));
				return;
			}

			this.socket.onopen = (): void => resolve();
			this.socket.onclose = reject;

			this.socket.onmessage = (event): void => {
				let res = null;
				try {
					res = JSON.parse(event.data);
				} catch (error) {
					return;
				}

				const req = this.reqMap.get(res.msgId);
				if (req) {
					req.resolve(res.data);
				}
			};
		});
	}

	/**
	 * Disconnect from the websocket server
	 */
	disconnect(): void {
		if (this.socket) {
			this.socket.close();
			delete this.socket;
		}
	}

	/**
	 * Send a command to the server
	 * @param cmd
	 * @param arg
	 * @return response
	 */
	send(cmd: string, arg: unknown): Promise<unknown> {
		if (!this.socket) {
			return Promise.reject(new Error('Web socket is not disconnected.'));
		}

		const msgId = this.msgId++;
		const message = JSON.stringify({ msgId, cmd, arg });
		this.socket.send(message);

		return new Promise((resolve, reject) => {
			this.reqMap.set(msgId, { resolve, reject });
		});
	}

	/**
	 * Update a PDF baseline
	 * @param baseline
	 * @param output
	 */
	updateBaseline(baseline: string, output: string): Promise<unknown> {
		return this.send(Command.UpdateBaseline, { baseline, output });
	}
}

export default Client;
