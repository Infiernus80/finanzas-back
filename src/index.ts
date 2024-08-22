import 'reflect-metadata';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from './presentation/server';
import { envs } from './config/envs';
import { ApiRoutes } from './presentation/routes';
import { DocumentationAdapter } from './config/documentation.adapter';

(() => {
	main();
})();

async function main() {
	new Server({
		port: envs.PORT,
		corsPermisson: cors({ origin: '*' }),
		httpLogger: morgan('short'),
		routes: ApiRoutes.routes,
		serveDocuUI: DocumentationAdapter.serverDocuUI(),
		setupDocuUI: DocumentationAdapter.setupDicuIU(),
	}).start();
}
