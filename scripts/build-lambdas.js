import { build } from 'esbuild'
import { readdirSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

if (!existsSync('dist')) {
  mkdirSync('dist')
}

const lambdaDirs = readdirSync('./backend', { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name)(async () => {
  for (const dir of lambdaDirs) {
    const entryMjs = join('backend', dir, 'handler.mjs')
    const entryJs = join('backend', dir, 'handler.js')
    let entry

    if (existsSync(entryMjs)) {
      entry = entryMjs
    } else if (existsSync(entryJs)) {
      entry = entryJs
    } else {
      console.log(`⚠️ Skipping ${dir} (no handler.js or handler.mjs found)`)
      continue
    }

    const outfile = join('dist', dir, 'handler.js')

    await build({
      entryPoints: [entry],
      bundle: true,
      platform: 'node',
      target: 'node22',
      outfile,
      sourcemap: true,
      format: 'cjs',
    })
  }
})()
