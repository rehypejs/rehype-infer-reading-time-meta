# rehype-infer-reading-time-meta

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[rehype][]** plugin to infer the estimated reading time of a document.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(rehypeInferReadingTimeMeta[, options])`](#unifieduserehypeinferreadingtimemeta-options)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([rehype][]) plugin to infer the estimated reading
time of a document.
The estimation takes readability, calibrated relative to the target audience,
into account.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**rehype** adds support for HTML to unified.
**vfile** is the virtual file interface used in unified.
**hast** is the HTML AST that rehype uses.
This is a rehype plugin that inspects hast and adds metadata to vfiles.

## When should I use this?

This plugin is particularly useful in combination with
[`rehype-meta`][rehype-meta].
When both are used together and documents are shared, the estimated reading time
is shown on Slack or certain other services.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install rehype-infer-reading-time-meta
```

In Deno with [`esm.sh`][esmsh]:

```js
import rehypeInferReadingTimeMeta from 'https://esm.sh/rehype-infer-reading-time-meta@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import rehypeInferReadingTimeMeta from 'https://esm.sh/rehype-infer-reading-time-meta@2?bundle'
</script>
```

## Use

Say our module `example.js` contains:

```js
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta'
import rehypeMeta from 'rehype-meta'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

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
```

…then running `node example.js` yields:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
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
The default export is
[`rehypeInferReadingTimeMeta`][api-rehype-infer-reading-time].

### `unified().use(rehypeInferReadingTimeMeta[, options])`

Infer the estimated reading time from a document as file metadata.

The reading time is inferred not just on words per minute, but also takes
readability into account.
The result is stored on `file.data.meta.readingTime`.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `age` (`[number, number]` or `number`, default: `[16, 18]`)
    — target age group; this is the age your target audience was still in
    school; so, set it to `18` if you expect all readers to have finished high
    school, `21` if you expect your readers to be college graduates, etc; can
    be two numbers in an array to get two estimates
*   `mainSelector` (`string`, optional, example: `'main'`)
    — CSS selector to body of content; useful to exclude other things, such as
    the head, ads, styles, scripts, and other random stuff, by focussing all
    strategies in one element

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

It also registers `file.data.meta` with `vfile`.
If you’re working with the file, make sure to import this plugin somewhere in
your types, as that registers the new fields on the file.

```js
/**
 * @typedef {import('rehype-infer-reading-time-meta')}
 */

import {VFile} from 'vfile'

const file = new VFile()

console.log(file.data.meta?.readingTime) //=> TS now knows that this is a `([number, number] | number)?`.
```

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line,
`rehype-infer-reading-time-meta@^2`, compatible with Node.js 16.

This plugin works with `rehype-parse` version 3+, `rehype-stringify` version 3+,
`rehype` version 4+, and `unified` version 6+.

## Security

Use of `rehype-infer-reading-time-meta` is safe.

## Related

*   [`rehype-document`](https://github.com/rehypejs/rehype-document)
    — wrap a fragment in a document
*   [`rehype-meta`](https://github.com/rehypejs/rehype-meta)
    — add metadata to the head of a document
*   [`unified-infer-git-meta`](https://github.com/unifiedjs/unified-infer-git-meta)
    — infer file metadata from Git
*   [`rehype-infer-title-meta`](https://github.com/rehypejs/rehype-infer-title-meta)
    — infer file metadata from the title of a document
*   [`rehype-infer-description-meta`](https://github.com/rehypejs/rehype-infer-description-meta)
    — infer file metadata from the description of a document

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

[size-badge]: https://img.shields.io/bundlejs/size/rehype-infer-reading-time-meta

[size]: https://bundlejs.com/?q=rehype-infer-reading-time-meta

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/main/contributing.md

[support]: https://github.com/rehypejs/.github/blob/main/support.md

[coc]: https://github.com/rehypejs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[rehype-meta]: https://github.com/rehypejs/rehype-meta

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[api-rehype-infer-reading-time]: #unifieduserehypeinferreadingtimemeta-options

[api-options]: #options
