export function safeTrigFunction(topic) {
  try {
    if (topic.includes("cos")) return Math.cos;

    if (topic.includes("tan")) {
      return (x) => {
        const val = Math.tan(x);
        if (!isFinite(val) || Math.abs(val) > 10) return NaN;
        return val;
      };
    }

    return Math.sin;
  } catch {
    return () => 0;
  }
}