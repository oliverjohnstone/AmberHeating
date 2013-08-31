var express = require('express')
  , app = express()
  , routes = require('./routes')
  , _ = require('lodash')
  , serviceLocator = require('service-locator').createServiceLocator()
  , properties = require('./site/properties.json')
  , jade = require('jade')
  , logga = require('logga')

serviceLocator.register('properties', properties)
serviceLocator.register('logger', logga())
serviceLocator.register('router', app)

app

  // set the app engine to use jade.express
  .engine('jade', jade.__express)
  .set('view engine', 'jade')
  .set('views', __dirname + '/site/views')

  // Log requests
  .use(express.logger())

  // Compress static assets
  .use('/static', express.compress(
    { filter: function (req, res) {
        return (/svg|json|text|jpeg|jpg|png|javascript/).test(res.getHeader('Content-Type'))
      }
    }))

  // Static assets
  .use('/static', express.static(__dirname + '/site/public'
      , { maxAge: serviceLocator.properties.env === 'development' ? 0 : 2592000000 }))

// Setup the routes page
routes(serviceLocator)

// Handle errors
app.use(function (err, req, res, next) {
  serviceLocator.logger.error('Error occurred while handling request:\n',
    _.pick(req, 'method', 'url', 'query', 'headers', 'ip', 'ips'))
  serviceLocator.logger.error(err.message)
  serviceLocator.logger.error(err.stack)
  var status = err.status || 500
  res.status(status)
  res.render('error/' + status
    , { properties: properties
      }
    , function (err, html) {
        if (err) {
          res.send('Unable to load that page. Sorry!')
        } else {
          res.send(html)
        }
        next()
      }
    )
})

  // Start listening
  .listen(properties.port, properties.host)