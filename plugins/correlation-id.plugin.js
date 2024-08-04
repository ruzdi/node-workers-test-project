const fastifyPlugin = require('fastify-plugin')
const { v4 } = require('uuid');

async function correlationIdPlugin(fastify, options) {
    fastify.addHook('onRequest', (request, reply, done) => {
      const correlationId = request.headers['x-correlation-id'] || v4();
      request.correlationId = correlationId;
      reply.header('x-correlation-id', correlationId);
      done();
    });
  
    fastify.decorateRequest('correlationId', '');
  }

module.exports = fastifyPlugin(correlationIdPlugin);