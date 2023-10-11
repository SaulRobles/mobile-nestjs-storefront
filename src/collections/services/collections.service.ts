import { Injectable, Inject } from '@nestjs/common';
import Shopify from 'shopify-api-node';

import collectionsQueries from '../../queries/collections/collections';
import { shopifyCollections } from '../interfaces';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject('SBC') private mercuryStore: Shopify
  ) {}

  async getCollections(first: number, acceptLanguage: string, query?: string, cursor?: string) {
    const graphqlQuery = collectionsQueries.getCollections(first)
    
    const shopifyResponse: shopifyCollections = await this.mercuryStore.graphql(graphqlQuery)

    //Shopify Data
    const hasNextPage = shopifyResponse.collections.pageInfo.hasNextPage;
    const collectionsArray = shopifyResponse.collections.edges.map((collection) => {
      return {
        title: collection.node.title,
        description: collection.node.description,
        descriptionHtml: collection.node.descriptionHtml,
        image: collection.node.image,
        handle: collection.handle,
        id: collection.id,
        cursor: collection.cursor,
        hasNextPage
      }
    })

    return collectionsArray;
  }
}
