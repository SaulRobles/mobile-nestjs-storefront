import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CollectionsService } from '../services/collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionService: CollectionsService) {}

  @Get()
  getCollections() {
    return this.collectionService.findAll();
  }
}
