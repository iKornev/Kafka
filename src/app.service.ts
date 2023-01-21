import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';
import * as date from 'date-and-time';
import * as fs from 'node:fs';
import { MessageDto } from './dto/message.dto';
import * as uuid from 'uuid';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class AppService {

  constructor(
      private readonly producerService: ProducerService,
      private readonly consumerService: ConsumerService
  ) {}



  async getHello()  {

    await this.consumerService.consume(
        { topics : ['test']},
         {
      eachMessage: async ({ topic, partition, message}) => {

        try {
          const dater = (): string => date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');

          fs.appendFileSync('readMe.txt', dater() + ' ' + `${ message.value.toString()  }` + '\n');

          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          })
        } catch (e) {
          console.log(e)
        }
      }
    });
  }

  async send(message: MessageDto): Promise<MessageResponseDto> {

    const kafkaMessage = {
      ...message,
      Id: uuid.v4()
    }
    await this.producerService.produce({
      topic: 'test',
      messages: [{
        value: JSON.stringify(kafkaMessage)
      }]
    })

    return kafkaMessage
  }
}
