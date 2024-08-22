import { Router } from 'express';

export class ApiRoutes {
	static get routes(): Router {
		const router = Router();
		const apiRoute = '/finanzas/api';
		return router;
	}
}
