import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
    @ApiProperty({ example: 'Jason Sweet', description: 'customer id' })
    Customer: string
}