'use strict'
const { resolve } = require('path')
const project = resolve(__dirname, '../..')
const apps = resolve(project, 'apps')
const packages = resolve(project, 'packages')
const test = resolve(project, 'test')
const tools = resolve(project, 'tools')
Object.defineProperty(exports, '__esModule', { value: true })
Object.assign(exports, { project, apps, packages, test, tools })
