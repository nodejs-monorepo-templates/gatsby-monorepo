import { app } from '@tools/places'
import { spawnSync } from 'child_process'
import process from 'process'
import { dbg } from 'string-template-format-inspect'

const {
  NODE_SCRIPT_RUNNER = 'pnpm run',
} = process.env

const [command, ...prefix] = NODE_SCRIPT_RUNNER.split(/\s+/)

if (!command) {
  throw new TypeError(dbg`Invalid NODE_SCRIPT_RUNNER: ${NODE_SCRIPT_RUNNER}`)
}

const spawnOptions = {
  stdio: 'inherit',
  cwd: app,
} as const

export function runScript(...suffix: [string, ...string[]]) {
  const { error, status } = spawnSync(command, [...prefix, ...suffix], spawnOptions)
  if (error) throw error
  return {
    exit() {
      if (!status) return
      console.error(
        dbg`Command '${[command, ...prefix, ...suffix]}' exits with non-zero status: ${status}`,
      )
      throw process.exit(status)
    },
  }
}
