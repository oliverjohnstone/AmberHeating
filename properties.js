var _ = require('lodash')
  , port = 3306

  , properties =
    { port: port
    , name: 'Amber Heating'
    , projectName: 'amberheating'
    , domain: 'localhost'
    , analytics: ''
    , url: 'http://localhost:' + port
    , social:
      { facebook: 'http://facebook.co.uk/AmberHeating'
      , twitter: 'http://twitter.co.uk/AmberHeating'
      , linkedIn: 'http://linkedIn.co.uk/AmberHeating'
      }
    }

  , environmementProperties =
    { development:
      { database:
        { name: properties.projectName + '-development'
        , host: 'localhost'
        , port: 27017
        }
      }
    }

module.exports = function getProperties(envName) {
  properties.env = envName = envName || process.env.NODE_ENV || 'development'

  if (environmementProperties[envName] === undefined) {
    throw new RangeError('Invalid environment name specified. ' + envName)
  }
  return _.merge({}, properties, environmementProperties[envName])
}