var fs = require('fs')
  , properties = require('./properties')
  , stylusRenderer = require('stylus-renderer')


module.exports = function (pliers) {

  pliers('buildJS', function (done) {
    pliers.logger.info('Building JS files')

    done()
  })

  pliers('buildCSS', function (done) {
    pliers.logger.info('Building CSS files')

    stylusRenderer(['index.styl'],
      { stylusOptions: { compress: false, linenos: true }
      , src: __dirname + '/site/styles'
      , dest: __dirname + '/site/public/build'
      }, function () {
        done()
      })
  })

  pliers('watch', function (done) {
    pliers.logger.info('Watching file changes')

    done()
  })

  pliers('start', function (done) {
    pliers.logger.info('Starting')

    done()
  })

  pliers('compileProperties', function (done) {
    pliers.logger.info('Compiling properties')
    fs.writeFile('site/properties.json',
      JSON.stringify(properties(), null, '  '),
      function (err) {
        if (err) throw err
        done()
      }
    )
  })

  pliers('build', 'compileProperties', 'buildCSS', 'buildJS')

  pliers('go', 'build', 'start')

}