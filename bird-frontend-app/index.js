const Express = require('express');
// const https = require('https');
const pem = require('pem');

pem.createCertificate({ days: 30, selfSigned: true }, (err, keys) => {
  const app = new Express();
  const port = process.env.PORT_FRONTEND || 4444;

  app.use(Express.static('static'));

  app.get('*', (request, response) => {
    response.sendFile(`${__dirname}/static/index.html`)
  });

  // https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(port, error => {
  // 	if (error) {
  // 		console.error(error)
  // 	} else {
  // 		console.info('==> 🌎  Listening on port %s. Open up https://localhost:%s/ in your browser.', port, port)
  // 	}
  // });
  app.listen(port, error => {
    if (error) {
      console.error(error)
    } else {
      console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
  });
});
