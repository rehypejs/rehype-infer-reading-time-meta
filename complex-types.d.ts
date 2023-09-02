interface InferReadingTimeMeta {
  /**
   * Reading time of the document in minutes (optional); if two numbers are
   * given, they represent a range of two estimates.
   *
   * Inferred by `rehype-infer-reading-time-meta` from HTML.
   * Used by `rehype-meta`.
   */
  readingTime?:
    | [lowEstimate: number, highEstimate: number]
    | [estimate: number]
    | number
    | null
    | undefined
}

// Add custom data supported when `rehype-infer-reading-time-meta` is added.
declare module 'vfile' {
  interface DataMapMeta extends InferReadingTimeMeta {}

  interface DataMap {
    meta: DataMapMeta
  }
}

export {}
