import { readFileSync } from 'fs';
export const devIp = readFileSync( __dirname + '/../.env')?.toString()?.match("(DEV_IP=)(.*)")?.[2] ?? '';

// --- COMMONS ---
process.env.APP_ENV = 'prod' // 'debug' <= use it if you want to see more logs
process.env.CRYPT_SECRET = 'ThisIsNotSoSecret';
process.env.BACKEND_URL = `http://${devIp}:8080`;
process.env.STARTING_POINT_URL = 'https://sp.orchesty.com'
process.env.WORKER_API_HOST = `http://${devIp}`

const jestWorkerId = process.env.JEST_WORKER_ID || '';

if (process.env.JEST_DOCKER) {
  // --- DOCKER ---
    process.env.REDIS_DSN = `redis://redis/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `rabbitmq`
} else {
  // --- LOCALHOST ---
    process.env.REDIS_DSN = `redis://${devIp}/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `${devIp}`
}



