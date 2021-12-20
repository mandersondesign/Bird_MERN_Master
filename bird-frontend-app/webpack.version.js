const fs = require('fs')
const chalk = require('chalk')
const { html, json } = require('./version.js')
const name = process.env.NAME || 'main'

const objNames = {
  main: 'static',
  feet: 'fleetfeet',
  marketing: 'marketing',
}

class VersionPlugin {
  constructor (options) {
    console.log('App version: ', chalk.bold.green.inverse(options.version), chalk.bold.cyan.inverse(options.hash))
  }

  apply (compiler) {
    compiler.hooks.done.tap('VersionPlugin', () => {
      fs.writeFileSync(`./${objNames[name]}/index.html`, html)
      fs.writeFileSync(`./${objNames[name]}/meta.json`, json)
    })
  }
}

module.exports = VersionPlugin
