'use strict'

const test = require('tap').test
const Fastify = require('fastify')
const blocklist = require('.')

test('blocklist ips', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: ['127.0.0.1']
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expected = 403
    t.strictEqual(res.statusCode, expected)
    t.end()
  })
})

test('should handle zero arguments', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {})

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expected = 200
    t.strictEqual(res.statusCode, expected)
    t.end()
  })
})

test('should handle empty array', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: []
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expected = 200
    t.strictEqual(res.statusCode, expected)
    t.end()
  })
})

test('should handle regular expressions', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: [
      /^127\.0\.0\.\d{1-3}$/g
    ]
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expected = 200
    t.strictEqual(res.statusCode, expected)
    t.end()
  })
})

test('do not block not listed ips', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: ['192.0.0.0']
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expected = 200
    t.strictEqual(res.statusCode, expected)
    t.end()
  })
})

test('return custom error code', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: ['127.0.0.1'],
    error: {
      code: 400
    }
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expectedCode = 400
    t.strictEqual(res.statusCode, expectedCode)
    t.end()
  })
})

test('return custom error body', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: ['127.0.0.1'],
    error: {
      body: 'CUSTOM ERROR'
    }
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expectedCode = 403
    const expectedBody = 'CUSTOM ERROR'
    t.strictEqual(res.statusCode, expectedCode)
    t.same(res.body, expectedBody)
    t.end()
  })
})

test('run custom error handler function', (t) => {
  const fastify = Fastify()

  fastify.register(blocklist, {
    blocklist: ['127.0.0.1'],
    error: {
      handler: (req, res, next) => {
        res.code(400).send('ERROR')
        next()
      }
    }
  })

  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/'
  }, (err, res) => {
    t.error(err)
    const expectedCode = 400
    const expectedBody = 'ERROR'
    t.strictEqual(res.statusCode, expectedCode)
    t.strictEqual(res.body, expectedBody)
    t.end()
  })
})
