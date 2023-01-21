import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
    @ApiProperty({ example: '0d517d7e-5f01-4834-b2ac-42bba09f5009', description: 'customer id' })
    Id: string;

    @ApiProperty({ example: 'Jason Sweet', description: 'customer id' })
    Customer: string
}