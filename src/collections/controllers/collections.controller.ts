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
}
