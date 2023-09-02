/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {[number, number] | [number] | number | null | undefined} [age=[16, 18]]
 *   Target age group (default: `[16, 18]`); this is the age your target
 *   audience was still in school; so, set it to `18` if you expect all readers
 *   to have finished high school, `21` if you expect your readers to be
 *   college graduates, etc; can be two numbers in an array to get two
 *   estimates.
 * @property {string | null | undefined} [mainSelector]
 *   CSS selector to body of content (optional); useful to exclude other things,
 *   such as the head, ads, styles, scripts, and other random stuff, by
 *   focussing all strategies in one element.
 */

import {readingTime} from 'hast-util-reading-time'
import {select} from 'hast-util-select'

/** @type {Options} */
const emptyOptions = {}
const defaultAge = [14, 18]

/**
 * Infer file metadata from the estimated reading time of a document.
 *
 * The result is stored on `file.data.meta.readingTime`.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeInferReadingTimeMeta(options) {
  const settings = options || emptyOptions
  const age = settings.age || defaultAge
  const mainSelector = settings.mainSelector || undefined

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    const main = mainSelector ? select(mainSelector, tree) : tree
    /** @type {[number, number] | [number] | number | undefined} */
    let time

    if (main) {
      if (Array.isArray(age)) {
        // @ts-expect-error: `age` is not empty so `time` won’t be either.
        time = age
          .slice(0, 2)
          .map(function (age) {
            return readingTime(main, {age})
          })
          .sort(function (a, b) {
            return a - b
          })
      } else {
        time = readingTime(main, {age})
      }
    }

    if (time) {
      const matter = /** @type {Record<string, unknown>} */ (
        file.data.matter || {}
      )
      const meta = file.data.meta || (file.data.meta = {})

      if (!matter.readingTime && !meta.readingTime) {
        meta.readingTime = time
      }
    }
  }
}
