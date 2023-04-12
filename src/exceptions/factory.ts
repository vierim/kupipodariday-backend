import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionFactory extends HttpException {
  constructor() {
    super(
      'Превышена сумма, необходимая для покупки подарка',
      HttpStatus.BAD_REQUEST,
    );
  }
}
