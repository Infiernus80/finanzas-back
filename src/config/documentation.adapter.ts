import { url } from 'inspector';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const pahtF = path.join(__dirname, '../presentation/modules/**/*.ts');

export class DocumentationAdapter {
	static get options(): swaggerJsdoc.Options {
		return {
			definition: {
				openapi: '3.1.0',
				info: {
					title: 'Finanzas Personales',
					version: '0.1.0',
					description: 'Documentación sobre la api de finanzas',
				},
				servers: [
					{
						url: 'http://localhost:5000/finanzas/api',
					},
				],
			},
			apis: [pahtF],
		};
	}

	public static setupDicuIU() {
		const specs = swaggerJsdoc(this.options);
		return swaggerUi.setup(specs);
	}

	public static serverDocuUI() {
		return swaggerUi.serve;
	}
}
