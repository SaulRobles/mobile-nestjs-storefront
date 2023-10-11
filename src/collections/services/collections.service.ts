import { Injectable, Inject } from '@nestjs/common';
import Shopify from 'shopify-api-node';

import collectionsQueries from '../../queries/collections/collections';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject('SBC') private mercuryStore: Shopify
  ) {}

  findAll() {
    return this.mercuryStore.graphql(collectionsQueries.getAll())
  }
}
