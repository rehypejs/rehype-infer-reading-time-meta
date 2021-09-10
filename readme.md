# rehype-infer-reading-time-meta

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to infer the estimated reading time from a document
as file metadata.
This plugin sets `file.data.meta.readingTime`.
This is mostly useful with [`rehype-meta`][rehype-meta].

## Contents

*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(rehypeInferReadingTimeMeta, options?)`](#unifieduserehypeinferreadingtimemeta-options)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install rehype-infer-reading-time-meta
```

## Use

Say `example.js` looks as follows:

```js
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta'
import rehypeDocument from 'rehype-document'
import rehypeMeta from 'rehype-meta'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
  const file = await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeInferReadingTimeMeta)
    .use(rehypeDocument)
    .use(rehypeMeta, {twitter: true})
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(
      '<h1>Build</h1><p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p>'
    )

  console.log(String(file))
}
```

Now, running `node example` yields:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:label1" content="Reading time">
    <meta name="twitter:data1" content="1 minute">
  </head>
  <body>
    <h1>Build</h1>
    <p><strong>We provide the building blocks</strong>: from tiny, focussed, modular utilities to plugins that combine them to perform bigger tasks. And much, much more. You can build on unified, mixing and matching building blocks together, to make all kinds of interesting new things.</p>
  </body>
</html>
```

## API

This package exports no identifiers.
The default export is `rehypeInferReadingTimeMeta`.

### `unified().use(rehypeInferReadingTimeMeta, options?)`

Plugin to infer the estimated reading time from a document as file metadata.

The reading time is inferred not just on words per minute, but also takes
readability into account.

##### `options.age`

Target age group (`number` or `[number, number]`, default: `[16, 18]`).
This is the age your target audience was still in school.
Set it to 18 if you expect all readers to have finished high school, 21 if you
expect your readers to all be college graduates, etc.
Can be two numbers in an array to get two estimates.

##### `options.mainSelector`

CSS selector to body of content (`string`, optional, example: `'main'`).
Useful to exclude other things, such as the head, ads, styles, scripts, and
other random stuff, by focussing on one element.

## Security

Use of `rehype-infer-reading-time-meta` is safe.

## Related

*   [`rehype-document`](https://github.com/rehypejs/rehype-document)
    — Wrap a document around a fragment
*   [`rehype-meta`](https://github.com/rehypejs/rehype-meta)
    — Add metadata to the head of a document
*   [`unified-infer-git-meta`](https://github.com/unifiedjs/unified-infer-git-meta)
    — Infer file metadata from Git
*   [`rehype-infer-title-meta`](https://github.com/rehypejs/rehype-infer-title-meta)
    — Infer file metadata from the title of a document
*   [`rehype-infer-description-meta`](https://github.com/rehypejs/rehype-infer-description-meta)
    — Infer file metadata from the description of a document

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/rehypejs/rehype-infer-reading-time-meta/workflows/main/badge.svg

[build]: https://github.com/rehypejs/rehype-infer-reading-time-meta/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-infer-reading-time-meta.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-infer-reading-time-meta

[downloads-badge]: https://img.shields.io/npm/dm/rehype-infer-reading-time-meta.svg

[downloads]: https://www.npmjs.com/package/rehype-infer-reading-time-meta

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-infer-reading-time-meta.svg

[size]: https://bundlephobia.com/result?p=rehype-infer-reading-time-meta

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[rehype-meta]: https://github.com/rehypejs/rehype-meta
