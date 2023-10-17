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
        handle: string
        id: string
      }
    }[]
  }
}

export interface shopifyCollection {
  collection: {
    id: string
    handle: string
    title: string
    description: string
    descriptionHtml: string
    productsCount: number
    image: {
      altText: string | null
      height: number
      width: number
      url: string | null
      id: string
    }
  }
}

export interface shopifyCollectionProducts {
  collection: {
    productsCount: number
    products: {
      edges: {
        cursor: string
        node: {
          id: string
          title: string
          description: string
          descriptionHtml: string
          totalInventory: number
          productType: string
          handle: string
          tags: string[]
          options: {
            id: string
            name: string
            values: string[]
          }[]
          variants: {
            node: {
              id: string
              title: string
              sku: string
              barcode: string
              displayName: string
              availableForSale: boolean
              inventoryQuantity: number
              selectedOptions: {
                name: string
                value: string
              }[]
              price: string
              compareAtPrice: null//Revisar
              image: null //revisar
              weight: number
            }
          }[]
          onlineStoreUrl: string | null
          collections: {
            edges: {
              node: {
                title: string
                description: string
                descriptionHtml: string
                image: {
                  id: string
                  altText: string | null
                  height: number
                  width: number
                  url: string
                }
                handle: string
                id: string
              }
            }[]
          }
          publishedAt: string
          images: {
            edges: {
              cursor: string
              node: {
                altText: string | null
                height: number
                width: number
                url: string
                id: string
              }
            }[]
          }
        }
      }[]
    }
  }
}
