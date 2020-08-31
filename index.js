'use strict'

const fp = require('fastify-plugin')

const DEFAULT_ERROR_CODE = 403

const handleError = (error, req, reply, next) => {
  if (error) {
    if (error.handler && typeof error.handler === 'function') {
      error.handler(req, reply, next)
    } else {
      reply
        .code(error.code || DEFAULT_ERROR_CODE)
        .send(error.body)
    }
  } else {
    reply.code(DEFAULT_ERROR_CODE).send()
  }
}

module.exports = fp(function (app, options, done) {
  app.addHook('onRequest', function (req, reply, next) {
    const { blocklist, error } = options
    if (blocklist && blocklist.length && blocklist.includes(req.ip)) {
      handleError(error, req, reply, next)
    } else {
      next()
    }
  })
  done()
}, {
  fastify: '3.x',
  name: 'fastify-blocklist'
})
