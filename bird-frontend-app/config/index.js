import { defaultsDeep } from 'lodash'
const defaultConfig = require('./default.json')

let localConfig = {}

const applicationEnv = process.env.APPLICATION_ENV || 'development'

try {
    localConfig = require(`./${applicationEnv}.json`)
} catch (e) {
    // pass
}

export default defaultsDeep(localConfig, defaultConfig)
