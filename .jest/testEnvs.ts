// --- COMMONS ---
process.env.APP_ENV = 'debug';
process.env.CRYPT_SECRET = 'ThisIsNotSoSecret';
process.env.BACKEND_URL = 'http://127.0.0.40:8080';

const jestWorkerId = process.env.JEST_WORKER_ID || '';

if (process.env.JEST_DOCKER) {
  // --- DOCKER ---
    process.env.UDP_LOGGER_DSN = 'logstash:5005'
    process.env.METRICS_DSN = 'mongodb://mongo:27017/metrics'
    process.env.MONGODB_DSN = `mongodb://mongo:27017/node-sdk${jestWorkerId}`
    process.env.REDIS_DSN = `redis://redis/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `rabbitmq`
} else {
  // --- LOCALHOST ---
    process.env.UDP_LOGGER_DSN = '127.0.0.40:5005'
    process.env.METRICS_DSN = 'mongodb://127.0.0.40:27017/metrics'
    process.env.MONGODB_DSN = `mongodb://127.0.0.40:27017/node-sdk${jestWorkerId}`
    process.env.REDIS_DSN = `redis://127.0.0.40/${jestWorkerId}`
    process.env.RABBITMQ_HOST = `127.0.0.40`
}



