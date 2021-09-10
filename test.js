import fs from 'node:fs'
import test from 'tape'
import {rehype} from 'rehype'
import rehypeMeta from 'rehype-meta'
import rehypeInferReadingTimeMeta from './index.js'

const buf = fs.readFileSync('fixture.html')

test('rehypeInferReadingTimeMeta', async (t) => {
  t.deepEqual(
    (await rehype().use(rehypeInferReadingTimeMeta).process(buf)).data,
    {meta: {readingTime: [2.276_744, 3.477_06]}},
    'should estimate reading time'
  )

  t.deepEqual(
    (
      await rehype()
        .use(rehypeInferReadingTimeMeta, {mainSelector: 'main'})
        .process(buf)
    ).data,
    {meta: {readingTime: [2.078_285, 3.173_011]}},
    'should support `mainSelector`'
  )

  t.deepEqual(
    (await rehype().use(rehypeInferReadingTimeMeta, {age: 16}).process(buf))
      .data,
    {meta: {readingTime: 2.751_701}},
    'should estimate reading time for one age'
  )

  t.equal(
    String(
      await rehype()
        .use(rehypeInferReadingTimeMeta)
        .use(rehypeMeta, {twitter: true})
        .process(
          '<h1>Build</h1><p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p>'
        )
    ),
    '<html><head>\n<meta name="twitter:card" content="summary">\n<meta name="twitter:label1" content="Reading time">\n<meta name="twitter:data1" content="1 minute">\n</head><body><h1>Build</h1><p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p></body></html>',
    'should integrate w/ `rehype-meta`'
  )

  t.end()
})
