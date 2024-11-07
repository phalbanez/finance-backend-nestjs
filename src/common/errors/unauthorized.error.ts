export class UnauthorizedError extends Error {
  constructor(message?: string) {
    const msg = message || 'Invalid login or password';
    super(msg);
  }
}
