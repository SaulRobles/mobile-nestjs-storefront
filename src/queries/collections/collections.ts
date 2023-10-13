import { Collections } from './interfaces';

const collections: Collections = {};

collections.getCollections = (first = 10, cursor = null) => {
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

export default collections;
