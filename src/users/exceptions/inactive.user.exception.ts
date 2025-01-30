import { BadRequestException } from '@nestjs/common';

export class InactiveUserException extends BadRequestException {
  constructor(message?: string) {
    const msg = message || 'Inactive user';
    super(msg);
  }
}
