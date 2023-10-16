import { Controller, Get, Headers, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiHeader, ApiProperty } from '@nestjs/swagger';

import { CollectionsService } from '../services/collections.service';
import { collectionsParamsDTO } from '../dtos/collections.dto';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionService: CollectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Shopify collection list' })
  @ApiQuery({type: collectionsParamsDTO})
  @ApiHeader({ name: 'accept-language', required: true, description: 'Store language (en - es)' })
  getCollections(
    @Query('first', ParseIntPipe) first = 10,
    @Query('query') query = null,
    @Query('cursor') cursor = null,
    @Headers('accept-language') acceptLanguage = 'en',
  ) {
    return this.collectionService.getCollections(first, acceptLanguage, query, cursor);
  }

  @Get(':collection_id')
  @ApiOperation({ summary: 'Shopify collection' })
  getCollection(
    @Param('collection_id', ParseIntPipe) collectionId: number,
    @Headers('accept-language') acceptLanguage = 'en',
  ) {
    return this.collectionService.getCollectionById(collectionId);
  }

  @Get(':collection_id/products')
  @ApiOperation({ summary: 'Products in a collection by id' })
  getCollectionProducts(
    @Param('collection_id', ParseIntPipe) collectionId: number,
    @Headers('accept-language') acceptLanguage = 'en',
    @Query('first', ParseIntPipe) first: number,
    @Query('cursor') cursor: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return this.collectionService.getCollectionProducts(collectionId, page, limit, first, cursor);
  }
}
