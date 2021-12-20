const pug = require('pug')
const uuidv1 = require('uuid/v1')
const pckg = require('./package.json')

const hash = uuidv1()
const { version } = pckg

const fn = pug.compileFile('index.pug', { pretty: true })
const props = { version, hash }
const html = fn(props)
const json = JSON.stringify(props)

module.exports = { props, html, json }
