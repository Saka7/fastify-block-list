# fastify-block-list

IP-s blocklisting plugin for fastify

## Install

```bash
npm i fastify-block-list
```

## Usage

Simply require this plugin, and set the array of ip addresses to block

```javascript
const fastify = require('fastify')()
const fastifyBlocklist = require('fastify-block-list')

fastify.register(fastifyBlocklist, {
  blocklist: ['127.0.0.1'],
})

fastify.get('/', (req, res) => {
  res.send({ ok: true })
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  console.log(`Sever is listening on address: ${address}`)
})
```

You can also specify custom error response


```javascript
fastify.register(fastifyBlocklist, {
  blocklist: ['127.0.0.1'],
  error: {
    code: 400,
    body: 'Custom message',
  }
})
```

Or provide custom error handler function 

```javascript
fastify.register(fastifyBlocklist, {
  blocklist: ['127.0.0.1'],
  error: {
    handler: async (req, reply) => {
      reply.code(403).send({error: 'Custom error'})
    }
  }
})
```

Regular expressions are also supported

```javascript
fastify.register(fastifyBlocklist, {
  blocklist: [/^192\.168\.\d{1-3}\.\d{1-3}$/],
})
```



## License

MIT

