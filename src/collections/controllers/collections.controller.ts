import { Controller, Get, Headers, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CollectionsService } from '../services/collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionService: CollectionsService) {}

  @Get()
  getCollections(
    @Query('first', ParseIntPipe) first: number = 10,
    @Query('query') query: string = null,
    @Query('cursor') cursor: string = null,
    @Headers('accept-language') acceptLanguage = 'en',
  ) {
    return this.collectionService.getCollections(first, acceptLanguage, query, cursor);
  }
}
