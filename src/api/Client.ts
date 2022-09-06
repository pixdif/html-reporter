import {
	Request,
	RequestContext,
	RequestMethod,
	Response,
} from '@pixdif/model';

interface Callback {
	resolve: (data: Response<unknown>) => void;
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
			delete this.socket;
		}

		const socket = new WebSocket(`ws://${this.wsEndpoint}`);
		this.socket = socket;
		return new Promise((resolve, reject) => {
			socket.onopen = (): void => resolve();
			socket.onclose = reject;

			socket.onmessage = (event): void => {
				let res = null;
				try {
					res = JSON.parse(event.data);
				} catch (error) {
					return;
				}

				const req = this.reqMap.get(res.id);
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
	 * Update a PDF baseline
	 * @param expected
	 * @param actual
	 */
	async updateSnapshot(expected: string, actual: string): Promise<Response<void>> {
		const res = await this.send(RequestMethod.Put, RequestContext.Snapshot, { expected, actual });
		return res as Response<void>;
	}

	/**
	 * Send a command to the server
	 * @param method request method
	 * @param context request context
 	 * @param payload request payload
	 * @return response
	 */
	protected send(
		method: RequestMethod,
		context: RequestContext,
		payload?: unknown,
	): Promise<Response<unknown>> {
		if (!this.socket) {
			return Promise.reject(new Error('Web socket is not disconnected.'));
		}

		const id = this.msgId++;
		const message: Request<unknown> = {
			method,
			context,
			payload,
		};
		this.socket.send(JSON.stringify({
			id,
			...message,
		}));

		return new Promise((resolve, reject) => {
			this.reqMap.set(id, { resolve, reject });
		});
	}
}

export default Client;
