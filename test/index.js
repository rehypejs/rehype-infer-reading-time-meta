import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import {rehype} from 'rehype'
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta'
import rehypeMeta from 'rehype-meta'

const buf = fs.readFileSync(new URL('fixture.html', import.meta.url))

test('rehypeInferReadingTimeMeta', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('rehype-infer-reading-time-meta')).sort(),
      ['default']
    )
  })

  await t.test('should estimate reading time', async function () {
    const file = await rehype().use(rehypeInferReadingTimeMeta).process(buf)

    assert.deepEqual(file.data, {meta: {readingTime: [2.276_744, 3.477_06]}})
  })

  await t.test('should support `mainSelector`', async function () {
    const file = await rehype()
      .use(rehypeInferReadingTimeMeta, {mainSelector: 'main'})
      .process(buf)

    assert.deepEqual(file.data, {meta: {readingTime: [2.078_285, 3.173_011]}})
  })

  await t.test('should estimate reading time for one age', async function () {
    const file = await rehype()
      .use(rehypeInferReadingTimeMeta, {age: 16})
      .process(buf)

    assert.deepEqual(file.data, {meta: {readingTime: 2.751_701}})
  })

  await t.test('should integrate w/ `rehype-meta`', async function () {
    const file = await rehype()
      .use(rehypeInferReadingTimeMeta)
      .use(rehypeMeta, {twitter: true})
      .process(
        '<h1>Build</h1><p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p>'
      )

    assert.equal(
      String(file),
      '<html><head>\n<meta name="twitter:card" content="summary">\n<meta name="twitter:label1" content="Reading time">\n<meta name="twitter:data1" content="1 minute">\n</head><body><h1>Build</h1><p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p></body></html>'
    )
  })
})
