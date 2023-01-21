import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse
} from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message-response.dto';

@ApiTags('Users endpoint')
@Controller('api/message')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Allow to consume messages and save them' })
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Allow to produce messages and send them to kafka' })
  @ApiOkResponse({
    status: 200,
    type: MessageResponseDto
  })
  sendToQueue(
      @Body() message: MessageDto
  ): Promise<MessageResponseDto> {
    return this.appService.send(message);
  }
}
