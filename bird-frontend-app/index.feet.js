const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const Express = require('express')

const app = new Express()
const port = process.env.PORT_FRONTEND || 3000

const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
)

app.use(webpackHotMiddleware(compiler))

app.use(Express.static('fleetfeet'))

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/fleetfeet/index.html`)
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
