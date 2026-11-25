/**
 * Strategy Selector
 *
 * Selects candidate diagnostic strategies based on submission context, question domain,
 * and available evidence (working vs final answer).
 */

export class StrategySelector {
  constructor(registry) {
    this.registry = registry;
  }

  /**
   * Selects an ordered list of applicable strategies for this submission.
   *
   * @param {Object} submission - SubmissionEntity (answer, work, etc.)
   * @param {Object} question - Question metadata
   * @returns {Array<Object>} List of applicable strategy instances
   */
  selectStrategies(submission, question) {
    const allStrategies = this.registry.getAll();
    const work = (submission?.work || "").trim();
    const answer = (submission?.answer || "").trim();

    return allStrategies.filter((strategy) => {
      if (typeof strategy.isApplicable === "function") {
        return strategy.isApplicable({ submission, question, work, answer });
      }
      return true;
    });
  }
}
