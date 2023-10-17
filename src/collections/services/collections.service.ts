import { Injectable, Inject } from '@nestjs/common';
import Shopify from 'shopify-api-node';

import collectionsQueries from '../../queries/collections/collections';
import {
  shopifyCollections,
  shopifyCollection,
  shopifyCollectionProducts,
} from '../interfaces';

import { GlobalService } from '../../utils/global.service';

@Injectable()
export class CollectionsService {
  constructor(@Inject('SBC') private mercuryStore: Shopify) {}

  async getCollections(
    first: number,
    acceptLanguage: string,
    query?: string,
    cursor?: string,
  ) {
    const graphqlQuery = collectionsQueries.getList(first, cursor);

    const shopifyResponse: shopifyCollections =
      await this.mercuryStore.graphql(graphqlQuery);

    //Shopify Data
    const hasNextPage = shopifyResponse.collections.pageInfo.hasNextPage;
    const collectionsArray = shopifyResponse.collections.edges.map(
      (collection) => {
        const filteredCollectionId = collection.node.id.replace(/^\D+/g, '');

        const filteredImage = collection.node.image.id
          ? {
              ...collection.node.image,
              id: collection.node.id.replace(/^\D+/g, ''),
            }
          : null;

        return {
          title: collection.node.title,
          description: collection.node.description,
          descriptionHtml: collection.node.descriptionHtml,
          image: filteredImage,
          handle: collection.node.handle,
          id: filteredCollectionId,
          cursor: collection.cursor,
          hasNextPage,
        };
      },
    );

    return collectionsArray;
  }

  async getCollectionById(collectionId: number) {
    const graphqlQuery = collectionsQueries.getById(collectionId);

    const shopifyResponse: shopifyCollection =
      await this.mercuryStore.graphql(graphqlQuery);
    shopifyResponse.collection.image.id =
      shopifyResponse.collection.image.id.replace(/^\D+/g, '');

    //Filter Shopify Raw Data (esto va en products)
    /* const filteredCollection: any = shopifyResponse.collection
    filteredCollection.pagination = {
      limit: 5,
      offset: 5,
      pages: 5,
      page: 1
    } */

    return shopifyResponse.collection;
  }

  async getCollectionProducts(
    collectionId: number,
    page: number = 1,
    first: number,
    cursor?: string,
  ) {
    const graphqlQuery = collectionsQueries.getProducts(collectionId);

    const shopifyResponse: shopifyCollectionProducts = await this.mercuryStore.graphql(graphqlQuery);

    //this.runProducts(collectionId, first, page);

    const resp: any = GlobalService.cleanShopifyResponse(shopifyResponse, 'products');

    const pagination = {
      page,
      offset: first,
      pages: Math.ceil(resp.productsCount / first),
      total: resp.productsCount
    }

    return {pagination, ...resp};
  }



  async runProducts(id: number, first: number, page: number) {
    let aux: any;
    for (let i = 0; i < page; i++) {
      if(i === 0) {
        const graphqlQuery = collectionsQueries.getProducts(id, first);
        aux = await this.mercuryStore.graphql(graphqlQuery);
        console.log(aux, 'aux')
      }
    }
  }


}
