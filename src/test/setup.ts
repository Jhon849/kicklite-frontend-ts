import '@testing-library/jest-dom';

// Polyfill/mocks for jsdom environment used by Vitest
// Avoid errors when components call DOM APIs not implemented by jsdom
if (!(Element.prototype as any).scrollIntoView) {
  (Element.prototype as any).scrollIntoView = function scrollIntoView() {
    // no-op in tests
  };
}