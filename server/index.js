const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
app.use(bodyParser.json())
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(
    cookieSession({
      name: 'session',
      keys: ['epcare-secret-key']
    })
  )

  app.post('/login', async function(req, res) {
    const account = req.body.account
    const password = req.body.password
    if (account && password) {
      const result = await login(account, password)
      if (result.data.status === 0) {
        req.session.authUser = result.data.data
      }
      res.json(result.data)
    } else {
      res.status(401).json({
        error: 'Bad credentials'
      })
    }
  })

  app.post('/logout', function(req, res) {
    delete req.session.authUser
    res.json({ ok: true })
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
