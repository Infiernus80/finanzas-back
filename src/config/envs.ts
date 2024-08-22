import dotenv from 'dotenv';
import path from 'path';
import { get } from 'env-var';

const path_env = path.join(__dirname, '../../.env');
dotenv.config({ path: path_env });

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DB_PORT: get('DB_PORT').required().asPortNumber(),
	DB_NAME: get('DB_NAME').required().asString(),
	DB_USER_NAME: get('DB_USER_NAME').required().asString(),
	DB_PASSWORD: get('DB_PASSWORD').required().asString(),
	DB_HOST: get('DB_HOST').required().asString(),
	DATABASE_URL: get('DATABASE_URL').required().asUrlString(),
	JWT_SEED: get('JWT_SEED').required().asString(),
};
