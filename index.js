const fastify = require('fastify')({ logger: true, connectionTimeout: 5000 });
const generateNewWorker = require('./utils/generateNewWorker');
const requestTracker = require('./utils/requestTracker');
const correlationIdPlugin = require('./plugins/correlation-id.plugin');
const ManageWorker = require('./utils/manageWorker');

// Register correlationIdPlugin plugin
fastify.register(correlationIdPlugin);

// const getCatsWorker = generateNewWorker('getCatsWorker');
// const getDogsWorker = generateNewWorker('getDogsWorker');

const catWorkerManager = new ManageWorker('getCatsWorker');
const dogWorkerManager = new ManageWorker('getDogsWorker');


fastify.get('/getCatsInfo', function handler (request, reply) {
  const getCatsWorker = catWorkerManager.getWorker();
  requestTracker[request.id] = (result) => reply.send(result)
  getCatsWorker.postMessage({ requestId: request.id, correlationId: request.correlationId, });
  request.log.info({ requestId: request.id, correlationId: request.correlationId }, 'Sent request to getCatsWorker');
})

fastify.get('/getDogsInfo', function handler (request, reply) {
  const getDogsWorker = dogWorkerManager.getWorker();
  requestTracker[request.id] = (result) => reply.send(result)
  getDogsWorker.postMessage({ requestId: request.id, correlationId: request.correlationId, });
  request.log.info({ requestId: request.id, correlationId: request.correlationId }, 'Sent request to getDogsWorker');
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
