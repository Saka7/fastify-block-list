# fastify-blocklist

IP-s blocklisting plugin for fastify

## Install

```bash
npm i fastify-blocklist
```

## Usage

Simply require this plugin, and set the array of blocklisted ip addresses

```javascript
const fastify = require('fastify')()
const fastifyBlocklist = require('fastify-blocklist')

fastify.register(fastifyBlocklist, {
  blocklist: ['xxx.xxx.xxx.xxx'],
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
  blocklist: ['xxx.xxx.xxx.xxx'],
  error: {
    code: 400,
    body: 'Custom message',
  }
})
```

Or provide custom error handler function 

```javascript
fastify.register(fastifyBlocklist, {
  blocklist: ['xxx.xxx.xxx.xxx'],
  error: {
    handler: async (req, reply) => {
      reply.code(403).send({error: 'Custom error'})
    }
  }
})
```



## License

MIT

