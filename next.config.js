const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        hostname: 'http://localhost:3000'
      },
    }
  }

  return {
    env: {
      hostname: 'https://mat.henlit.se'
    },
  }
}