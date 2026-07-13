import "vitest";

interface NoViolationsAssertions {
  toHaveNoViolations(): void;
}

declare module "vitest" {
  interface Assertion<T = unknown> extends NoViolationsAssertions {}
  interface AsymmetricMatchersContaining extends NoViolationsAssertions {}
}
