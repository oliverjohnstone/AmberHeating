var fs = require('fs')
  , _ = require('lodash')

module.exports = function (sl) {

  // Robots
  sl.router.get('/robots.txt', function (req, res, next) {
    fs.readFile('site/robots.txt', function (err, data) {
      if (err) {
        next(_.merge({}, err, { status: 404 }))
        return
      }
      res.setHeader('Content-Type', 'text/plain')
      res.end(data)
    })
  })

  // Home
  sl.router.get('/', function (req, res) {
    res.end(res.render('index', { properties: sl.properties }))
  })

  // All other pages
  sl.router.get('/:page', function (req, res, next) {
    if (fs.exists(__dirname + 'site/views/' + req.params.page)) {
      res.end(res.render(req.params.page, { properties: sl.properties }))
    } else {
      next(
        { status: 404
        , message: 'Page not found. ' + req.params.page
        , stack: {}
        })
    }
  })

}