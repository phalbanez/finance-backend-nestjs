import { BadRequestException } from '@nestjs/common';

export class InvalidUserException extends BadRequestException {
  constructor(message?: string) {
    const msg = message || 'Invalid user';
    super(msg);
  }
}
