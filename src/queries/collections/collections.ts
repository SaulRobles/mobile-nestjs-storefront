import { Collections } from './interfaces';

const collections: Collections = {};

collections.getList = (first = 10, cursor = null) => {
  const query = `{
    collections(first: ${first} ${cursor && cursor !== '""' ? `after: "${cursor}"` : '' }) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          title
          description
          descriptionHtml
          image {
            altText
            height
            width
            url
            id
          }
          handle
          id
        }
      }
    }
  }`

  return query;
}

collections.getById = (collectionId: number) => {
  const query = `{
    collection(id: "gid://shopify/Collection/${collectionId}") {
      id
      handle
      title
      description
      descriptionHtml
      productsCount
      image {
        altText
        height
        width
        url
        id
      }
    }
  }`

  return query;
}

collections.getProducts = (collectionId: number) => {
  const query = `{
    collection(id: "gid://shopify/Collection/${collectionId}") {
      productsCount
      products(first: 2) {
        edges {
          cursor
          node {
            id
            title
            description
            descriptionHtml
            totalInventory
            productType
            handle
            tags
            options {
              id
              name
              values
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  sku
                  barcode
                  displayName
                  availableForSale
                  inventoryQuantity
                  selectedOptions {
                    name,
                    value
                  }
                  price
                  compareAtPrice
                  image {
                    altText
                    height
                    width
                    url
                    id
                  }
                  weight
                }
              }
            }
            onlineStoreUrl
            collections(first: 1) {
              edges {
                node {
                  title
                  description
                  descriptionHtml
                  image {
                    id
                    altText
                    height
                    width
                    url
                  }
                  handle
                  id
                }
              }
            }
            publishedAt
            images(first: 50) {
              edges {
                cursor
                node {
                  altText
                  height
                  width
                  url
                  id
                }
              }
            }
          }
        }
      }
    }
  }`

  return query;
}

export default collections;
