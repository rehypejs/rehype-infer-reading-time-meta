/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 *
 * @typedef Options
 *   Configuration.
 * @property {number|[number, number]} [age=[16, 18]]
 *   Target age group.
 *   This is the age your target audience was still in school.
 *   Set it to 18 if you expect all readers to have finished high school,
 *   21 if you expect your readers to all be college graduates, etc.
 *   Can be two numbers in an array to get two estimates.
 * @property {string} [mainSelector]
 *   CSS selector to body of content.
 *   Useful to exclude other things, such as the head, ads, styles, scripts, and
 *   other random stuff, by focussing all strategies in one element.
 */

import {select} from 'hast-util-select'
import {readingTime} from 'hast-util-reading-time'

/**
 * Plugin to infer file metadata from the document.
 *
 * @type {import('unified').Plugin<[Options?]|Array<void>, Root>}
 */
export default function rehypeInferReadingTimeMeta(options = {}) {
  const {age = [14, 18], mainSelector} = options

  return (tree, file) => {
    const main = mainSelector ? select(mainSelector, tree) : tree
    /** @type {[number, number]|number|undefined} */
    let time

    if (main) {
      if (Array.isArray(age)) {
        // @ts-expect-error: hush, always two items.
        time = age
          .slice(0, 2)
          .map((age) => readingTime(main, {age}))
          .sort((a, b) => a - b)
      } else {
        time = readingTime(main, {age})
      }
    }

    if (time) {
      const matter = /** @type {Record<string, unknown>} */ (
        file.data.matter || {}
      )
      const meta = /** @type {Record<string, unknown>} */ (
        file.data.meta || (file.data.meta = {})
      )

      if (!matter.readingTime && !meta.readingTime) {
        meta.readingTime = time
      }
    }
  }
}
