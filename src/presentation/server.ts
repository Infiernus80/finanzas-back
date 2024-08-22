import express, { Express, Router, Handler, RequestHandler } from 'express';
import { LogAdapter } from '../config/log.adapter';

interface Options {
	port: number;
	routes: Router;
	httpLogger: Handler;
	corsPermisson: Handler;
	serveDocuUI: RequestHandler[];
	setupDocuUI: Handler;
}

export class Server {
	private app: Express;
	private PORT: number;
	private path_api: string;
	private routes: Router;
	private httpLogger: Handler;
	private corsPermisson: Handler;
	private serveDocuUI: RequestHandler[];
	private setupDocuUI: Handler;

	constructor(options: Options) {
		const {
			port,
			routes,
			httpLogger,
			corsPermisson,
			serveDocuUI,
			setupDocuUI,
		} = options;

		this.app = express();
		this.PORT = port;
		this.routes = routes;
		this.path_api = '/finanzas/api';
		this.httpLogger = httpLogger;
		this.corsPermisson = corsPermisson;
		this.serveDocuUI = serveDocuUI;
		this.setupDocuUI = setupDocuUI;
		this.middlewares();
	}

	private middlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.use(this.httpLogger);
		this.app.use(this.corsPermisson);
		this.app.use('/api-docs', this.serveDocuUI, this.setupDocuUI);

		this.app.use(this.routes);
	}

	public start(): void {
		this.app.listen(this.PORT, () => {
			const urlServer = `http://localhost:${this.PORT}${this.path_api}`;
			const urlDocu = `http://localhost:${this.PORT}`;
			LogAdapter.success('Server está corriendo', urlServer);
			LogAdapter.success('Documentación está corriendo:', urlDocu);
		});
	}
}
