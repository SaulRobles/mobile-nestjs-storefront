import { Collections } from './interfaces';

const collections: Collections = {};

collections.getAll = (first = 10) => {
  const query = `{
    collections(first: ${first}) {
      edges {
        node {
          id
        }
      }
    }
  }`

  return query;
}

export default collections;
