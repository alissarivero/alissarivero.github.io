export type PsychModule = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  minutes: number;
  xp: number;
  badge?: string;
  href: string;
  kind: "lesson" | "flow";
  datasetNote?: string;
  paragraphs?: string[];
  starter?: string;
  /** R that runs before the learner's code (load data, etc.). */
  setup?: string;
  /** Regex tested against the printed R output. */
  check?: string;
  checkHint?: string;
};

export const MODULES: PsychModule[] = [
  {
    slug: "which-test",
    title: "Which statistical test should I perform?",
    short: "Which test",
    blurb: "Walk through the question you are asking and land on a test, with the code that checks assumptions.",
    minutes: 15,
    xp: 40,
    badge: "picked-a-test",
    href: "/psychstats/which-test/",
    kind: "flow",
  },
  {
    slug: "first-dataset",
    title: "What to do when you first get a dataset",
    short: "First dataset",
    blurb: "Open a file, name the variables, and see what each column actually is before you test anything.",
    minutes: 20,
    xp: 30,
    badge: "first-dataset",
    href: "/psychstats/first-dataset/",
    kind: "lesson",
    datasetNote:
      "stroop.csv is simulated for teaching. It copies the idea of Stroop (1935): people name ink colors. Congruent trials use a matching word; incongruent trials do not. Numbers are made up.",
    paragraphs: [
      "A new file is a list of measurements, not an answer. Each row is usually one observation (here, one trial). Each column is a variable.",
      "Before any test, ask three things: What is one row? What does each column mean? Which column is the outcome you care about, and which columns explain it?",
      "In R you load a CSV with read.csv. names() lists the columns. str() tells you whether a column is a number or a category. head() prints the first rows.",
      "Packages such as dplyr and ggplot2 are worth learning in RStudio. This page checks your work with base R, which already runs in the browser.",
    ],
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
cat("Loaded stroop.csv\\n")`,
    starter: `# What are the columns? What type is each one?
names(stroop)
str(stroop)
head(stroop)`,
    check: "condition[\\s\\S]*rt_ms",
    checkHint: "Run the starter code so the output includes the column names rt_ms and condition.",
  },
  {
    slug: "t-tests",
    title: "What is a t-test?",
    short: "t-tests",
    blurb: "Compare a mean to a number, or compare two means, and read the estimate next to the p-value.",
    minutes: 25,
    xp: 40,
    badge: "t-test",
    href: "/psychstats/t-tests/",
    kind: "lesson",
    datasetNote:
      "sleep ships with base R. It is the extra hours of sleep for 10 patients on two drugs, from Student (1908). The same person appears twice, so the comparison is paired.",
    paragraphs: [
      "A t-test asks whether a difference in means is large compared with how much people vary. The result is a difference (the estimate) and a p-value.",
      "A small p-value means the difference would be surprising if the true difference were zero. It does not measure how important the difference is. Read the mean difference first.",
      "Use a one-sample t-test when you compare a mean to a fixed number. Use a paired t-test when the same people are measured twice. Use an independent t-test when the two groups are different people.",
      "This lesson uses the paired test on sleep. group 1 and group 2 are the two drugs.",
    ],
    setup: `cat("Using the built-in sleep data (Student, 1908).\\n")`,
    starter: `t.test(extra ~ group, data = sleep, paired = TRUE)`,
    check: "p-value",
    checkHint: "Run the paired t-test so the output includes a p-value.",
  },
  {
    slug: "correlation",
    title: "What is a correlation?",
    short: "Correlation",
    blurb: "See whether two numeric variables move together, and why you still need the plot.",
    minutes: 20,
    xp: 30,
    badge: "correlation",
    href: "/psychstats/correlation/",
    kind: "lesson",
    datasetNote:
      "Anscombe's quartet ships with base R (Anscombe, 1973). Four pairs of variables share almost the same correlation. The plots do not.",
    paragraphs: [
      "A correlation describes a straight-line association between two numbers. Pearson's r is between -1 and 1. Zero means no straight-line association.",
      "r does not say that one variable causes the other. It also misses curves and clumps. That is why the picture comes before the number.",
      "cor.test() prints r, a confidence interval, and a p-value for the hypothesis that the true correlation is zero.",
    ],
    setup: `cat("Using anscombe from base R.\\n")`,
    starter: `cor.test(anscombe$x1, anscombe$y1)`,
    check: "cor",
    checkHint: "Run cor.test so the output includes the correlation.",
  },
  {
    slug: "regression",
    title: "What is a linear regression?",
    short: "Regression",
    blurb: "Fit a straight line, then read the intercept, the slope, and what the residuals are for.",
    minutes: 25,
    xp: 40,
    badge: "regression",
    href: "/psychstats/regression/",
    kind: "lesson",
    datasetNote:
      "The same simulated Stroop file as the first-dataset project. incongruent is 1 when the trial is incongruent and 0 when it is congruent.",
    paragraphs: [
      "A linear regression draws a straight line through the outcome. The intercept is the line's height when the predictor is 0. The slope is how much the outcome changes when the predictor goes up by 1.",
      "Residuals are the vertical misses: each person's outcome minus the line. A useful line makes those misses small and pattern-free.",
      "The slope's p-value tests whether that slope could plausibly be zero. Still read the slope itself. A tiny p-value with a 2-millisecond effect is a small effect.",
    ],
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
stroop$incongruent <- as.integer(stroop$condition == "incongruent")
cat("Loaded stroop.csv and added incongruent (1 = incongruent).\\n")`,
    starter: `fit <- lm(rt_ms ~ incongruent, data = stroop)
summary(fit)`,
    check: "Coefficients",
    checkHint: "Fit the regression and print summary(fit) so you see the coefficients.",
  },
  {
    slug: "glm",
    title: "What is a GLM?",
    short: "GLM",
    blurb: "Use a generalized linear model when the outcome is not a plain average, starting with yes or no.",
    minutes: 25,
    xp: 40,
    badge: "glm",
    href: "/psychstats/glm/",
    kind: "lesson",
    datasetNote:
      "Still the simulated Stroop file. mistakes is 1 when the trial has at least one error. That is a yes/no outcome, so the mean is a proportion.",
    paragraphs: [
      "Ordinary regression predicts a mean that can be any number. A GLM keeps the same idea (predictors, coefficients) but uses a different scale when the outcome is a count, a proportion, or yes/no.",
      "For yes/no data the usual GLM is logistic regression. Coefficients are changes in log odds. The sign still tells you the direction: positive means the outcome becomes more likely.",
      "You do not need a new philosophy. You need an outcome that matches the model. Means of reaction time can use lm. A binary mistake uses glm with family = binomial.",
    ],
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
stroop$incongruent <- as.integer(stroop$condition == "incongruent")
stroop$mistakes <- as.integer(stroop$errors > 0)
cat("Loaded stroop.csv. mistakes is 1 when errors > 0.\\n")`,
    starter: `fit <- glm(mistakes ~ incongruent, data = stroop, family = binomial)
summary(fit)`,
    check: "Deviance",
    checkHint: "Run the binomial glm and print summary(fit).",
  },
  {
    slug: "frequentist-bayesian",
    title: "Frequentist and Bayesian statistics",
    short: "Two schools",
    blurb: "Ask the same question two ways: how surprising is this data, or how should this data move a prior belief?",
    minutes: 20,
    xp: 30,
    badge: "two-schools",
    href: "/psychstats/frequentist-bayesian/",
    kind: "lesson",
    paragraphs: [
      "A frequentist p-value answers: if there were truly no effect, how often would a study like this look this extreme? The probability is about the data, not about the hypothesis.",
      "A Bayesian analysis starts with a prior: a belief about the effect before these data. The data update that belief into a posterior. A credible interval is a range that, under the model and the prior, contains the most plausible values.",
      "Neither school lets you skip the design. A p-value and a posterior both assume the model is a fair description of how the data were produced.",
      "The snippet below is a toy, not a full Bayesian model. You have a prior probability that a coin is fair, you see 8 heads in 10 flips, and you update with Bayes' rule in base R.",
    ],
    setup: `cat("Toy coin example. No extra packages.\\n")`,
    starter: `prior_fair <- 0.5
# P(8 heads in 10 | fair) vs P(8 heads in 10 | biased toward heads, p = 0.8)
like_fair <- dbinom(8, 10, 0.5)
like_biased <- dbinom(8, 10, 0.8)
# posterior odds = prior odds * likelihood ratio, here prior odds are 1
posterior_fair <- like_fair / (like_fair + like_biased)
cat("Posterior probability the coin is fair:", round(posterior_fair, 3), "\\n")`,
    check: "Posterior probability",
    checkHint: "Run the snippet so it prints the posterior probability.",
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
