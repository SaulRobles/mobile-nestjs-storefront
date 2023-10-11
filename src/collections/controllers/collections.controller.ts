import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CollectionsService } from '../services/collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionService: CollectionsService) {}

  @Get()
  getCollections(
    @Query('first') first = 10,
    @Query('query') query: string,
    @Query('cursor') cursor: string,
    @Headers('accept-language') acceptLanguage = 'en',
  ) {
    return this.collectionService.getCollections(first, acceptLanguage);
  }
}
