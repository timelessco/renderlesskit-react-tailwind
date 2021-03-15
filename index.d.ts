import "@testing-library/jest-dom/extend-expect";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot({
        failureThreshold,
        failureThresholdType,
      }: {
        failureThreshold?: number;
        failureThresholdType?: string;
      } = {}): R;
    }
  }
}
