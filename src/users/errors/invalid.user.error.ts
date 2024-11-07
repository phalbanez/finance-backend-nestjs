export class InvalidUserError extends Error {
  constructor(message?: string) {
    const msg = message || 'Invalid user';
    super(msg);
  }
}
