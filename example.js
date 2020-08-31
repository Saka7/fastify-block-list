const fastify = require('fastify')()
const fastifyBlocklist = require('.')

fastify.register(fastifyBlocklist, {
  blocklist: ['xxx.xxx.xxx.xxx'],
  error: {
    code: 400,
    body: 'CUSTOM BODY'
  }
})

fastify.get('/', (req, res) => {
  res.send({ ok: true })
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  console.log(`Sever is listening on address: ${address}`)
})
