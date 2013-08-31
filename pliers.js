var fs = require('fs')
  , properties = require('./properties')

module.exports = function (pliers) {

  pliers('buildJS', function (done) {
    pliers.logger.info('Building JS files')

    done()
  })

  pliers('buildCSS', function (done) {
    pliers.logger.info('Building CSS files')

    done()
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