// --- COMMONS ---
process.env.APP_ENV = 'debug';
process.env.CRYPT_SECRET = 'ThisIsNotSoSecret';
process.env.BACKEND_URL = 'http://127.0.0.40:8080';
process.env.STARTING_POINT_URL = 'https://sp.orchesty.com'
process.env.WORKER_API_HOST = 'http://127.0.0.40'

const jestWorkerId = process.env.JEST_WORKER_ID || '';

if (process.env.JEST_DOCKER) {
  // --- DOCKER ---
    process.env.REDIS_DSN = `redis://redis/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `rabbitmq`
} else {
  // --- LOCALHOST ---
    process.env.REDIS_DSN = `redis://127.0.0.40/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `127.0.0.40`
}



