// Need a random export to turn this into a module?
export type Whatever = unknown

declare module 'vfile' {
  interface DataMap {
    meta: {
      /**
       * Estimated reading time of a document.
       *
       * Populated by `rehype-infer-reading-time-meta` from the HTML.
       */
      readingTime?: number | [number, number]
    }
  }
}
