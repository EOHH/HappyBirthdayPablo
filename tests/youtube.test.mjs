import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/youtube.ts', import.meta.url), 'utf8')
let serial = 0
async function isolatedAPI() {
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } })
  return import(`data:text/javascript;base64,${Buffer.from(`${outputText}\n// test ${serial++}`).toString('base64')}`)
}

function environment() {
  const scripts = []
  const timeouts = []
  globalThis.window = { setTimeout(callback) { timeouts.push(callback); return 0 } }
  globalThis.document = {
    createElement() { return { remove() { this.removed = true } } },
    head: { append(script) { scripts.push(script) } },
  }
  return { scripts, timeouts }
}

test('loads only one official script across concurrent mounts and resolves both callers', async () => {
  const { scripts } = environment()
  const api = await isolatedAPI()
  const first = api.loadYouTube()
  const second = api.loadYouTube()
  assert.equal(first, second)
  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].src, 'https://www.youtube.com/iframe_api')
  window.YT = { Player: class {} }
  window.onYouTubeIframeAPIReady()
  assert.equal(await first, window.YT)
  assert.equal(await second, window.YT)
  assert.equal(await api.loadYouTube(), window.YT)
  assert.equal(scripts.length, 1)
})

test('script failure is rejected and a later user retry loads a fresh script', async () => {
  const { scripts } = environment()
  const api = await isolatedAPI()
  const failed = api.loadYouTube()
  scripts[0].onerror()
  await assert.rejects(failed, /YouTube/)
  assert.equal(scripts[0].removed, true)
  const retried = api.loadYouTube()
  assert.equal(scripts.length, 2)
  window.YT = { Player: class {} }
  window.onYouTubeIframeAPIReady()
  await retried
})

test('API timeout rejects instead of leaving an endless loading state', async () => {
  const { timeouts, scripts } = environment()
  const api = await isolatedAPI()
  const pending = api.loadYouTube()
  timeouts[0]()
  await assert.rejects(pending)
  assert.equal(scripts[0].removed, true)
})

test('API callback preserves an existing host callback', async () => {
  environment()
  let called = 0
  const previous = () => called++
  window.onYouTubeIframeAPIReady = previous
  const api = await isolatedAPI()
  const pending = api.loadYouTube()
  window.YT = { Player: class {} }
  window.onYouTubeIframeAPIReady()
  await pending
  assert.equal(called, 1)
  assert.equal(window.onYouTubeIframeAPIReady, previous)
})

test('non-embeddable, missing and unidentified-client errors have actionable messages', async () => {
  const { youtubeError } = await isolatedAPI()
  assert.match(youtubeError(101), /no permite/)
  assert.match(youtubeError(150), /no permite/)
  assert.match(youtubeError(100), /privado/)
  assert.match(youtubeError(153), /directamente/)
  assert.match(youtubeError(2), /configuración/)
  assert.match(youtubeError(5), /navegador/)
})
