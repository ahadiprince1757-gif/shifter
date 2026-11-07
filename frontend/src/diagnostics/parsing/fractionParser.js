/**
 * Exact Fraction arithmetic and parsing without floating-point drift.
 */

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export class Fraction {
  constructor(n, d = 1) {
    if (d === 0) {
      throw new Error("Division by zero in Fraction");
    }
    const sign = (n < 0 ? -1 : 1) * (d < 0 ? -1 : 1);
    const absN = Math.abs(Math.round(n));
    const absD = Math.abs(Math.round(d));
    const g = gcd(absN, absD) || 1;

    this.n = sign * (absN / g);
    this.d = absD / g;
  }

  add(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.d + o.n * this.d, this.d * o.d);
  }

  sub(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.d - o.n * this.d, this.d * o.d);
  }

  mul(other) {
    const o = Fraction.from(other);
    return new Fraction(this.n * o.n, this.d * o.d);
  }

  div(other) {
    const o = Fraction.from(other);
    if (o.n === 0) throw new Error("Division by zero fraction");
    return new Fraction(this.n * o.d, this.d * o.n);
  }

  equals(other, tolerance = 1e-9) {
    if (!other) return false;
    try {
      const o = Fraction.from(other);
      return this.n === o.n && this.d === o.d;
    } catch {
      const numVal = typeof other === "number" ? other : parseFloat(other);
      return Math.abs(this.toNumber() - numVal) <= tolerance;
    }
  }

  toNumber() {
    return this.n / this.d;
  }

  toString() {
    if (this.d === 1) return `${this.n}`;
    return `${this.n}/${this.d}`;
  }

  static from(val) {
    if (val instanceof Fraction) return val;
    if (typeof val === "number") {
      if (Number.isInteger(val)) return new Fraction(val, 1);
      // Approximate decimal to fraction up to 1e-6
      const s = val.toString();
      const dec = s.indexOf(".");
      if (dec !== -1) {
        const places = s.length - dec - 1;
        const d = Math.pow(10, Math.min(places, 6));
        const n = Math.round(val * d);
        return new Fraction(n, d);
      }
      return new Fraction(Math.round(val), 1);
    }
    if (typeof val === "string") {
      const trimmed = val.trim();
      const fracMatch = trimmed.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
      if (fracMatch) {
        return new Fraction(parseInt(fracMatch[1], 10), parseInt(fracMatch[2], 10));
      }
      const num = parseFloat(trimmed);
      if (!isNaN(num)) return Fraction.from(num);
    }
    throw new Error(`Cannot convert ${val} to Fraction`);
  }

  static tryParse(val) {
    try {
      return Fraction.from(val);
    } catch {
      return null;
    }
  }
}
