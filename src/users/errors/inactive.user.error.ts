export class InactiveUserError extends Error {
  constructor(message?: string) {
    const msg = message || 'Inactive user';
    super(msg);
  }
}
