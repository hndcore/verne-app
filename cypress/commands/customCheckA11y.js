const severityLevels = {
  minor: "🟢",
  moderate: "🟡",
  major: "🟠",
  critical: "🔴",
};

const a11Callback = ruleViolations => {
  if (!ruleViolations || ruleViolations.length === 0) {
    Cypress.log({
      name: "a11Callback",
      message: "No accessibility violations found",
      consoleProps: () => ({ violations: [] }),
    });
  }

  ruleViolations.forEach(violation => {
    const domNodes = Cypress.$(violation.nodes.map(node => node.target).join(", "));
    Cypress.log({
      name: `${severityLevels[violation.impact] || "⚪"} A11y`,
      consoleProps: () => violation,
      $el: domNodes,
      message: `${violation.help} - ${violation.helpUrl}`,
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: `🛠️`,
        consoleProps: () => violation,
        $el: Cypress.$(target.join(", ")),
        message: target,
      });
    });
  });
};

Cypress.Commands.add("customCheckA11y", () => {
  cy.checkA11y(null, null, a11Callback);
});
