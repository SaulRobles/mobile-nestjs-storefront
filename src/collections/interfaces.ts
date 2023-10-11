export interface shopifyCollections {
  collections: {
    pageInfo: {
      hasNextPage: boolean
    }
    edges: {
      cursor: string
      node: {
        title: string
        description: string
        descriptionHtml: string
        image: {
          altText: string | null
          height: number
          width: number
          url: string
          id: string
        }
      }
      handle: string
      id: string
    }[]
  }
}
