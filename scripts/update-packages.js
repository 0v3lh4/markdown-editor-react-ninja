const pkg = require('../package.json')
const { spawn } = require('child_process')

const dependencies = Object.keys(pkg.dependencies)
const devDependencies = Object.keys(pkg.devDependencies)

const add = (args) => {
  return spawn('yarn', ['add'].concat(args), { stdio: 'inherit', shell: true })
}

add(dependencies).on('close', () => {
  add(['--dev'].concat(devDependencies)).on('close', (code) => {
    process.exit(code)
  })
})
