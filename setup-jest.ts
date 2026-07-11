import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

const originalConsoleError = console.error;

console.error = (...args: Parameters<typeof console.error>): void => {
  const [error] = args;

  // JSDOM does not yet parse the CSS @layer rule emitted by PrimeNG. This is a
  // test-environment limitation; forward every other error normally.
  if (isJSDOMStyleParsingError(error)) {
    return;
  }

  originalConsoleError(...args);
};

function isJSDOMStyleParsingError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.includes('Could not parse CSS stylesheet')
  );
}
