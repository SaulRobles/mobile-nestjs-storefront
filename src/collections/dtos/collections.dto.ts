import { ApiProperty } from "@nestjs/swagger";

export class collectionsParamsDTO {
  @ApiProperty({ default: 10, required: true, description: 'Qty of collections to show' })
  first: number
  @ApiProperty({ required: false, description: 'Next collections to show' })
  cursor: string
  @ApiProperty({ required: false, description: 'Ask what is this' })
  query: string
}
