export class TemporalSmoother {
  constructor(alpha = 0.85) {
    this.alpha = alpha;
    this.prev = null;
  }

  smooth(value) {
    if (!this.prev) {
      this.prev = value;
      return value;
    }

    this.prev = this.prev * this.alpha + value * (1 - this.alpha);
    return this.prev;
  }
}
