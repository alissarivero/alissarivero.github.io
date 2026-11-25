import { LESSON_PAGES } from "./pages";

export type Kind = "lesson" | "page" | "assignment" | "project";

export type PsychModule = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  minutes: number;
  xp: number;
  badge?: string;
  href: string;
  kind: Kind;
  /** Assignment pages sit under this lesson slug. */
  parent?: string;
  datasetNote?: string;
  levels: { overview: string[]; detailed: string[] };
  figures?: { after: number; id: string }[];
  showFlow?: boolean;
  starter?: string;
  setup?: string;
  check?: string;
  checkHint?: string;
  selfCheck?: boolean;
};

const item = (
  partial: Omit<PsychModule, "href"> & { href?: string }
): PsychModule => ({
  ...partial,
  href: partial.href ?? `/psychstats/${partial.slug}/`,
});

const RAW: PsychModule[] = [
  item({
    slug: "why-r",
    kind: "lesson",
    title: "Why do most psychologists use R?",
    short: "Why R",
    blurb: "It is free, it handles complex analyses and figures, and the field can share the code.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "introduction",
    kind: "lesson",
    title: "Why statistics is more interesting than you think",
    short: "Introduction",
    blurb: "Statistics is how psychologists ask questions they could not ask by watching alone.",
    minutes: 15,
    xp: 0,
    levels: {
      overview: [
        "Piaget sat with children and wrote down what they actually did. That is a descriptive question: what does the behavior look like? You still need a way to summarize hundreds of observations so a reader can see the pattern. Description is a statistical job.",
        "An experiment asks why. You change one thing, hold the rest as still as you can, and look at what the mind does in response. The inference — this difference is about the process, not about who happened to walk in — is what a test is for. Prediction is a third question. Josh Tenenbaum’s work asks whether a learner’s next judgment can be forecast from a model of how they update beliefs. The success criterion is the future behavior, not a p-value alone.",
        "Yes, statistics is hard. The hardness is mostly that the same word (significant, normal, effect) means something precise and something casual, and psychology uses both. This course teaches the precise meaning from a psychologist’s chair. There is no mathematical track. If you can say what a row is and what you would tell a reader, you are doing statistics.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "r-setup",
    kind: "assignment",
    parent: "why-r",
    title: "Getting R set up on your computer",
    short: "Install R",
    blurb: "Install R and RStudio, open a script, and run one line on your own machine.",
    minutes: 30,
    xp: 20,
    badge: "r-setup",
    selfCheck: true,
    levels: {
      overview: [
        "Have R and RStudio on your computer, a folder for this course, and one script that runs.",
        "Install R first, from the CRAN site, and then install RStudio Desktop, which is the window you will actually work in. R is the engine. RStudio is the desk: a script on the top left, the console below it, and your files to the side. Make a folder called psych-stats. In RStudio, use Session, then Set Working Directory, then To Source File Location, once your script is saved inside that folder. That is the step that makes read.csv find your file.",
        "In a new script, type print(2 + 2), save the file, and run the line. You should see 4 in the console. Then install one package you will want later, with install.packages('ggplot2'), and load it with library(ggplot2). If library() runs without an error, you are set up. Mark this complete when that is true on your machine. The browser cannot see your computer, so the check is yours.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "understanding-data",
    kind: "lesson",
    title: "Understanding your data",
    short: "Your data",
    blurb: "What a row is, what the columns measure, and which picture matches which kind of variable.",
    minutes: 25,
    xp: 0,
    figures: [{ after: 2, id: "plot-gallery" }],
    datasetNote:
      "The Stroop file used in the assignments is simulated. It follows the idea of Stroop (1935) and does not copy anyone’s raw data.",
    levels: {
      overview: [
        "Imagine a study of ink-color naming. If each person does many trials, one row might be one trial, not one person. Those are different datasets even when the spreadsheet looks similar. The first question is what one row represents.",
        "Then the columns. condition is a name (congruent or incongruent). rt_ms is a duration. errors is a count. age is a number you did not assign. You may average a duration. You may not average a label. The gallery under this paragraph is the same rule as a picture: a distribution for one continuous column, a comparison for groups, a scatter for two numbers, counts for categories.",
        "ggplot builds a plot in layers. The data is the table. aes() maps columns onto x, y, and color. geom_point(), geom_boxplot(), or geom_col() is the mark. Best practice is dull and worth it: label the units, let the reader see the pattern of the raw data, and do not use a bar of means when a box or the points would show the shape. In RStudio the call looks like ggplot(stroop, aes(condition, rt_ms)) + geom_boxplot(). The browser on this site runs base R, so the assignment draws with plot() and boxplot() and shows the ggplot version beside it.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "analyzing-data",
    kind: "lesson",
    title: "Analyzing your data",
    short: "Analyses",
    blurb: "Significance, t-tests, correlation, and ANOVA, in the order a psychologist meets them.",
    minutes: 35,
    xp: 0,
    showFlow: true,
    figures: [
      { after: 1, id: "mean-gap" },
      { after: 2, id: "hug" },
    ],
    levels: {
      overview: [
        "A p-value is the probability of a result at least this extreme if nothing were going on — if the true difference or the true correlation were zero and the study were repeated the way you designed it. It is not the probability that your hypothesis is true, and it is not the size of the effect. Read the estimate first. The picture shows why: the gap between means can stay the same while the spread changes, and the test is that comparison.",
        "A one-sample t-test compares a mean to a fixed number (t.test(y, mu = 0)). A paired t-test is for the same people twice; on the sleep data, ten patients and two drugs, you test the differences (t.test(extra ~ group, data = sleep, paired = TRUE)). Correlation describes a straight-line association between two numbers. Move the slider: the hug of the points changes r, even when the tilt of the line does not. cor.test() prints r. Plot first. Anscombe’s four datasets share a correlation and do not share a shape.",
        "ANOVA is the t-test’s relative for more than two means: did the groups differ, somewhere? It does not say which pair. ANCOVA is that comparison while holding another measured variable steady, such as age. The walker below is the same choice as a conversation: outcome, then design, then the check you should actually look at.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "regression-models",
    kind: "lesson",
    title: "Regression models",
    short: "Regression",
    blurb: "A line of best fit, a curve that stays inside probabilities, and a model that remembers the person.",
    minutes: 35,
    xp: 0,
    figures: [
      { after: 0, id: "fit-line" },
      { after: 0, id: "read-line" },
      { after: 1, id: "sigmoid" },
    ],
    levels: {
      overview: [
        "Linear regression draws a straight line through an outcome. The line in the first picture is not decoration. Drag it: the vertical misses change, and settling finds the line that makes the squared misses as small as they can be. The second picture is that same line. The intercept is the height where the predictor is 0. The slope is how much the line climbs when the predictor goes up by 1. On the Stroop file, incongruent is 0 or 1, so the intercept is the congruent mean time and the slope is the extra time on incongruent trials. Say it in milliseconds.",
        "A yes-or-no outcome is a proportion. A straight line walks off into predictions below 0 and above 1, which are not chances. A link function is the translator: the model stays linear in the coefficients, but those coefficients live on a scale that maps back into probabilities. For logistic regression the scale is log odds. A positive coefficient means 'more likely.' exp(coefficient) is how the odds multiply. Bend the picture to see the curve stay inside 0 and 1.",
        "Multi-level models are what you use when one row is a trial and many rows belong to one person. The person has their own baseline. The condition effect is estimated with that clustering acknowledged. Ignoring it makes the study look more precise than it was. You will not fit lme4 in the browser. You should be able to point at the formula and name which term is the trial, which is the person, and which is the experimental factor.",
      ],
      detailed: [
        "The line is a model of the mean, not a claim that people sit on it. Residuals are the point of the picture: if they fan out, curve, or clump by a variable you left out, the single slope is the wrong summary even when the p-value is small. A binary predictor coded 0/1 makes the slope a difference in means. That is the same scientific object as a t-test, with a path into larger models when you add covariates.",
        "A link is not a decoration you pick for a prettier curve. It is the claim about what is linear. Logit says the log odds are linear in the predictors. The change in probability is then larger in the middle of the curve than in the tails. Quote a probability at the conditions you ran, not only the coefficient. An enormous coefficient with an enormous standard error is usually an empty cell, not a discovery.",
        "A multi-level model is not 'ANOVA but modern.' It is a model for a specific dependence: trials nested in people, children nested in classrooms, trials nested in people nested in labs. The payoff is an honest standard error and a place to put a predictor that lives at the person level (age) next to one that lives at the trial level (condition). If you only have one observation per person, you do not have a multi-level problem. You have an ordinary regression.",
      ],
    },
  }),
  item({
    slug: "assumptions",
    kind: "lesson",
    title: "Assumptions",
    short: "Assumptions",
    blurb: "Independence, normality, and shape — and why independence is the one psychology almost never has.",
    minutes: 20,
    xp: 0,
    levels: {
      overview: [
        "Independence means one row does not carry information about another, once the predictors are in the model. In a typical study that is rarely true. The same person contributes many trials. The same person does several tasks. People sit in groups, classrooms, or dyads. Those rows share a person or a room. A test that ignores the share treats 200 trials as 200 people.",
        "Normality, in the tests you have met, is about the residuals or the differences, not a moral claim that humans are normal. A lopsided cloud (skew) pulls the mean toward the tail. A very peaked or very heavy-tailed cloud (kurtosis) changes how surprising an extreme difference is. Look at a histogram of the thing you are actually testing — the paired differences, or the residuals — and say what you see in a clause of the paper.",
        "When independence fails because of repeated trials, the honest moves are to summarize to the person or to use the multi-level model from lesson 4. When the shape is ugly and the sample is small, a rank comparison is often the sentence you can defend. A large sample makes the mean’s sampling behavior kinder than the raw scores look. That is not permission to skip the picture.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "effect-size",
    kind: "lesson",
    title: "Effect size and uncertainty",
    short: "Effect size",
    blurb: "The missing step between “it was significant” and a sentence a reader can use.",
    minutes: 20,
    xp: 0,
    levels: {
      overview: [
        "A confidence interval is the range of values your procedure does not rule out. For a paired difference, t.test() already prints it. If the interval for extra hours of sleep runs from 0.2 to 2.0, you have evidence of a positive difference and you have not pinned it to a single number. If it runs from −0.1 to 0.1 on a reaction-time effect you care about in tens of milliseconds, 'not significant' and 'we measured it fairly precisely, and it is tiny' are different claims. Say which one you have.",
        "Effect size is the magnitude in a unit a reader can compare. Cohen’s d is a mean difference divided by a spread. A correlation is already an effect size. An odds ratio is the logistic version: how the odds multiply. None of these replace the raw unit. 'Incongruent trials were about 200 ms slower, d = 1.4' is a better sentence than 'd = 1.4' alone.",
        "A 2 ms effect with a tiny p-value is still a 2 ms effect. Large samples make trivial differences 'significant.' Small samples make real differences silent. The interval tells you which problem you have.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "communicating",
    kind: "lesson",
    title: "Communicating results",
    short: "Writing",
    blurb: "The sentence is about the behavior. The statistics sit in parentheses, and the figure carries the comparison.",
    minutes: 25,
    xp: 0,
    figures: [{ after: 1, id: "write-sentence" }],
    levels: {
      overview: [
        "Your job is to report on the data, not to report on the statistics. The subject of the sentence is the behavior. Weak: 'A paired t-test was significant, t(9) = 3.1, p = .013.' Strong: 'Patients slept about 1.6 hours longer on the second drug than on the first (mean difference = 1.58 hours, 95% CI [0.70, 2.46], t(9) = 4.06, p = .003).' The test is evidence in parentheses. The hours are the result.",
        "The figure has the same job. Axes say the units, not 'value' and 'group.' Error bars say what they are: usually a confidence interval or a standard error, and the caption says which. A significance bracket is a pointer, not a substitute for the difference. The picture under this paragraph is the shape of a finished comparison: means, intervals, and a bracket that does not replace the sentence.",
        "Match the picture to the analysis. A paired or two-group t-test wants the two distributions or the differences, not only two bars. A correlation wants the scatter, with the line only if you also mean the line. ANOVA wants the group distributions and, if you compared pairs, those pairs marked. A logistic result wants predicted probabilities at the conditions you care about, not a bar of log odds.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "frontiers",
    kind: "lesson",
    title: "New frontiers in statistics",
    short: "Frontiers",
    blurb: "A tour of Bayesian work, computational models, encoders, and machine learning. Mastery is not the assignment.",
    minutes: 20,
    xp: 0,
    levels: {
      overview: [
        "Bayesian statistics treats probability as a degree of belief that you update. That is the same move as Bayesian learning theory in cognitive science: a learner has a prior, sees data, and has a posterior. The coin exercise in the Bayesian assignment is a toy of that update. A real model puts a prior on a psychological parameter (a sensitivity, a learning rate) and checks whether the posterior predicts new judgments.",
        "Computational modeling writes the theory as something that can generate behavior. Equation-based models write a few formulas for how a decision or a memory trace changes. Agent-based models put many simple individuals in a shared setting and watch a group pattern appear. Both are judged by whether they produce the behavior, not by whether a coefficient was significant.",
        "Vision and text encoders turn images or language into numbers a model can use, so a study can ask about the scene a child saw or the words a parent used without hand-coding every frame. Machine learning, in the sense of lesson 1, is a predictive question: can we forecast a future behavior? It is the wrong tool when the question was 'what did this manipulation do to a mean we care about for its own sake.'",
      ],
      detailed: [],
    },
  }),

  item({
    slug: "r-1",
    kind: "assignment",
    parent: "why-r",
    title: "Introduction to R, part 1",
    short: "R, part 1",
    blurb: "Make an object, put numbers in it, and look at the mean.",
    minutes: 20,
    xp: 20,
    badge: "r-1",
    levels: {
      overview: [
        "Leave with one object that holds a handful of numbers, and the mean of those numbers printed.",
        "Four friends are 19, 20, 23, and 23. An object is a name for that list. c() gathers the numbers. <- stores them. mean() averages them. You should see 21.25.",
      ],
      detailed: [],
    },
    starter: `ages <- c(19, 20, 23, 23)
mean(ages)`,
    check: "21\\.25",
    checkHint: "Store the four ages with c() and <-, then print mean(ages). You should see 21.25.",
  }),
  item({
    slug: "describe",
    kind: "assignment",
    parent: "understanding-data",
    title: "Descriptive statistics",
    short: "Descriptives",
    blurb: "Mean, median, and spread for reaction time, by condition.",
    minutes: 20,
    xp: 20,
    badge: "describe",
    datasetNote: "stroop.csv is simulated teaching data, inspired by the Stroop design, not copied from a study.",
    levels: {
      overview: [
        "Summarize reaction time without pretending the summary is a test.",
        "mean(), median(), and sd() describe a column. tapply() does it inside each condition. Run the starter. You should see two means, and the incongruent mean should be the larger one.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
cat("Loaded stroop.csv\\n")`,
    starter: `tapply(stroop$rt_ms, stroop$condition, mean)
tapply(stroop$rt_ms, stroop$condition, median)
tapply(stroop$rt_ms, stroop$condition, sd)`,
    check: "incongruent",
    checkHint: "Summarize rt_ms by condition so the output contains the word incongruent.",
  }),
  item({
    slug: "r-2",
    kind: "assignment",
    parent: "understanding-data",
    title: "Introduction to R, part 2",
    short: "R, part 2",
    blurb: "Load a file, name the columns, and look at the first rows.",
    minutes: 15,
    xp: 20,
    badge: "r-2",
    levels: {
      overview: [
        "Get a CSV into an object and say what the columns are.",
        "The file is already loaded for you as stroop. names(), str(), and head() are the three looks. You should see condition and rt_ms in the output.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
cat("Loaded stroop.csv\\n")`,
    starter: `names(stroop)
str(stroop)
head(stroop)`,
    check: "condition[\\s\\S]*rt_ms",
    checkHint: "Print names, str, and head so both condition and rt_ms appear.",
  }),
  item({
    slug: "visualize",
    kind: "assignment",
    parent: "understanding-data",
    title: "Data visualizations",
    short: "Plots",
    blurb: "Draw the comparison in base R, and read the ggplot version you will use in RStudio.",
    minutes: 25,
    xp: 25,
    badge: "visualize",
    levels: {
      overview: [
        "Produce a boxplot of reaction time by condition, with the axis labeled in milliseconds.",
        "boxplot() is the browser-friendly version. In RStudio the same picture is ggplot(stroop, aes(x = condition, y = rt_ms)) + geom_boxplot() + labs(y = 'Reaction time (ms)', x = 'Condition'). Layers: data, then aes, then geom, then labels. This page checks the base R call.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
cat("Loaded stroop.csv\\n")`,
    starter: `cat("Reaction time (ms) by condition")
boxplot(rt_ms ~ condition, data = stroop,
        ylab = "Reaction time (ms)", xlab = "Condition")`,
    check: "Reaction time",
    checkHint: "Keep the cat() line and the boxplot. The check looks for Reaction time.",
  }),
  item({
    slug: "r-3",
    kind: "assignment",
    parent: "understanding-data",
    title: "Introduction to R, part 3",
    short: "R, part 3",
    blurb: "Treat condition as a category, keep one group, and summarize it.",
    minutes: 20,
    xp: 20,
    badge: "r-3",
    levels: {
      overview: [
        "Take a subset and a grouped summary without leaving base R.",
        "factor() makes the labels a category. The subset keeps incongruent trials. mean() on that subset should land well above the congruent times, around the high 700s.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
stroop$condition <- factor(stroop$condition)
cat("Loaded stroop.csv\\n")`,
    starter: `incon <- subset(stroop, condition == "incongruent")
mean(incon$rt_ms)
table(stroop$condition)`,
    check: "incongruent",
    checkHint: "Subset to incongruent trials and print the mean, along with table(stroop$condition).",
  }),
  item({
    slug: "t-tests-lab",
    kind: "assignment",
    parent: "analyzing-data",
    title: "T-tests",
    short: "T-tests",
    blurb: "A paired test on Student’s sleep data.",
    minutes: 20,
    xp: 30,
    badge: "t-test",
    datasetNote: "sleep ships with base R. Extra hours of sleep for 10 patients on two drugs, Student (1908). The same person appears twice.",
    levels: {
      overview: [
        "Run the paired test and read the mean difference before the p-value.",
        "t.test(extra ~ group, data = sleep, paired = TRUE) is the whole assignment. The mean of the differences is the result, in hours. The p-value asks whether that difference would be surprising if it were really zero.",
      ],
      detailed: [],
    },
    setup: `cat("Using sleep from base R.\\n")`,
    starter: `t.test(extra ~ group, data = sleep, paired = TRUE)`,
    check: "Paired t-test",
    checkHint: "Run the paired t-test. The output should include the words Paired t-test.",
  }),
  item({
    slug: "correlations-lab",
    kind: "assignment",
    parent: "analyzing-data",
    title: "Correlations",
    short: "Correlations",
    blurb: "A correlation on Anscombe’s first pair, which is not a reason to skip the plot.",
    minutes: 15,
    xp: 25,
    badge: "correlation",
    datasetNote: "anscombe ships with base R (Anscombe, 1973). Four pairs share a correlation. The shapes do not.",
    levels: {
      overview: [
        "Print a Pearson correlation and remember that r is not the picture.",
        "cor.test(anscombe$x1, anscombe$y1) reports r. Then plot(anscombe$x1, anscombe$y1) so you see the cloud this r belongs to. The check looks for the correlation output.",
      ],
      detailed: [],
    },
    setup: `cat("Using anscombe from base R.\\n")`,
    starter: `cor.test(anscombe$x1, anscombe$y1)
plot(anscombe$x1, anscombe$y1)`,
    check: "cor",
    checkHint: "Run cor.test so the output includes the correlation.",
  }),
  item({
    slug: "regression-lab",
    kind: "assignment",
    parent: "regression-models",
    title: "Linear regression",
    short: "Regression lab",
    blurb: "Reaction time on the incongruent indicator. Read the slope in milliseconds.",
    minutes: 20,
    xp: 30,
    badge: "regression",
    levels: {
      overview: [
        "Fit lm(rt_ms ~ incongruent) and find the slope in the coefficients table.",
        "incongruent is 1 or 0. The intercept is the congruent mean. The slope is the extra milliseconds on incongruent trials. summary(fit) is what the check looks for.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
stroop$incongruent <- as.integer(stroop$condition == "incongruent")
cat("Loaded stroop.csv\\n")`,
    starter: `fit <- lm(rt_ms ~ incongruent, data = stroop)
summary(fit)`,
    check: "Coefficients",
    checkHint: "Print summary(fit) so you see the coefficients table.",
  }),
  item({
    slug: "glm-lab",
    kind: "assignment",
    parent: "regression-models",
    title: "GLMs: logistic regression",
    short: "Logistic",
    blurb: "A yes-or-no mistake, modeled with a binomial GLM.",
    minutes: 20,
    xp: 30,
    badge: "glm",
    levels: {
      overview: [
        "Fit a logistic regression and see a coefficient on the log-odds scale.",
        "mistakes is 1 when the trial had any error. family = binomial is the logistic model. The incongruent coefficient’s sign is the direction. summary(fit) prints deviance.",
      ],
      detailed: [
        "Do not read the coefficient as a change in probability. It is a change in log odds. A positive sign means incongruent trials make a mistake more likely in this simulated file.",
      ],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
stroop$incongruent <- as.integer(stroop$condition == "incongruent")
stroop$mistakes <- as.integer(stroop$errors > 0)
cat("Loaded stroop.csv\\n")`,
    starter: `fit <- glm(mistakes ~ incongruent, data = stroop, family = binomial)
summary(fit)`,
    check: "Deviance",
    checkHint: "Print summary(fit) for the binomial model.",
  }),
  item({
    slug: "anova-lab",
    kind: "assignment",
    parent: "analyzing-data",
    title: "ANOVA and ANCOVA",
    short: "ANOVA",
    blurb: "Tooth growth by dose, then dose holding supplement steady.",
    minutes: 25,
    xp: 30,
    badge: "anova",
    datasetNote: "ToothGrowth ships with base R. Length of odontoblasts in guinea pigs by vitamin C dose and delivery method.",
    levels: {
      overview: [
        "See an ANOVA table, then the same comparison with supplement included.",
        "aov(len ~ dose) asks whether mean length differs by dose, treating dose as a number. aov(len ~ dose + supp) holds the delivery method steady. summary() of either object prints Df. That is the check.",
      ],
      detailed: [],
    },
    setup: `cat("Using ToothGrowth from base R.\\n")`,
    starter: `summary(aov(len ~ dose, data = ToothGrowth))
summary(aov(len ~ dose + supp, data = ToothGrowth))`,
    check: "Df",
    checkHint: "Print summary(aov(...)) so the ANOVA table, including Df, appears.",
  }),
  item({
    slug: "multilevel-lab",
    kind: "assignment",
    parent: "regression-models",
    title: "Multi-level modeling",
    short: "Multi-level",
    blurb: "Name the trial, the person, and the condition, then average to the person.",
    minutes: 25,
    xp: 30,
    badge: "multilevel",
    datasetNote: "looking.csv is simulated. It is not data from a published infant study.",
    levels: {
      overview: [
        "Respect the person as the cluster. The browser cannot fit lme4. You can still do the honest summary.",
        "Each row of looking.csv is one trial. infant is the person. condition is familiar or novel. A multi-level formula you would fit in RStudio is looking_ms ~ condition + (1 | infant). Here, average to one number per infant and condition, then print the first rows of that person-level table. The check looks for infant.",
      ],
      detailed: [],
    },
    setup: `looking <- read.csv("/data/looking.csv", stringsAsFactors = TRUE)
cat("Loaded looking.csv\\n")`,
    starter: `person <- aggregate(looking_ms ~ infant + condition, data = looking, mean)
head(person)`,
    check: "infant",
    checkHint: "Aggregate looking time by infant and condition, then print head(person).",
  }),
  item({
    slug: "bayes-lab",
    kind: "assignment",
    parent: "frontiers",
    title: "Bayesian statistics",
    short: "Bayesian lab",
    blurb: "Update a prior after 8 heads in 10 flips. This is a toy, and it is supposed to be.",
    minutes: 20,
    xp: 25,
    badge: "two-schools",
    levels: {
      overview: [
        "See a prior become a posterior, in numbers you can change.",
        "Two coins are possible. One is fair. One lands heads 80% of the time. You start even. You see 8 heads in 10 flips. The snippet prints the posterior probability the coin is fair. Then edit prior_fair and run it again. The data did not change. The belief did.",
      ],
      detailed: [],
    },
    setup: `cat("Toy coin. Two hypotheses.\\n")`,
    starter: `prior_fair <- 0.5
like_fair <- dbinom(8, 10, 0.5)
like_biased <- dbinom(8, 10, 0.8)
odds <- (prior_fair / (1 - prior_fair)) * (like_fair / like_biased)
posterior_fair <- odds / (1 + odds)
cat("Posterior probability the coin is fair:", round(posterior_fair, 3), "\\n")`,
    check: "Posterior probability",
    checkHint: "Run the snippet so it prints the posterior probability.",
  }),

  item({
    slug: "first-dataset",
    kind: "project",
    title: "What to do when you get your first dataset",
    short: "First dataset",
    blurb: "Name the row, the columns, and the types, then show you can see them in R.",
    minutes: 30,
    xp: 40,
    badge: "first-dataset",
    datasetNote: "stroop.csv is simulated teaching data.",
    levels: {
      overview: [
        "Do the lesson 2 questions on a real file, in order, before you test anything.",
        "Write the answers in comments at the top of the script: what one row is, what each column means, and which columns are categories, counts, or measurements. Then prove the file matches your answers with names(), str(), and head(). The check looks for condition and rt_ms.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
cat("Loaded stroop.csv\\n")`,
    starter: `# One row is:
# Columns:
# Types:
names(stroop)
str(stroop)
head(stroop)`,
    check: "condition[\\s\\S]*rt_ms",
    checkHint: "After your comments, print names, str, and head.",
  }),
  item({
    slug: "existing-datasets",
    kind: "project",
    title: "Analyzing existing datasets",
    short: "Five datasets",
    blurb: "Five short briefs. One script. The question is chosen before the test.",
    minutes: 45,
    xp: 50,
    badge: "five-datasets",
    levels: {
      overview: [
        "For each dataset, name the question in a comment, run one appropriate summary or test, and print it.",
        "1. Stroop (simulated): are incongruent trials slower? A regression or a t-test on rt_ms. 2. sleep: do the two drugs differ within person? Paired t-test. 3. ToothGrowth: does dose relate to tooth length? ANOVA or regression. 4. anscombe, pair 1 and pair 4: compute both correlations and plot pair 4. 5. looking.csv (simulated infant looking): average to the infant first, then compare familiar and novel. The check looks for Paired t-test, so the sleep test must be in the script.",
      ],
      detailed: [],
    },
    datasetNote:
      "sleep, ToothGrowth, and anscombe ship with R. stroop.csv and looking.csv are simulated for teaching.",
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)
looking <- read.csv("/data/looking.csv", stringsAsFactors = TRUE)
cat("Loaded teaching files. sleep, ToothGrowth, and anscombe are built in.\\n")`,
    starter: `# 1 Stroop
# 2 sleep
t.test(extra ~ group, data = sleep, paired = TRUE)
# 3 ToothGrowth
# 4 anscombe
# 5 looking: average to the infant first`,
    check: "Paired t-test",
    checkHint: "Include the paired t-test on sleep. Add the other four briefs above and below it.",
  }),
  item({
    slug: "viz-project",
    kind: "project",
    title: "Creating good data visualizations",
    short: "One figure",
    blurb: "One comparison, labeled in real units, that could survive a paper.",
    minutes: 30,
    xp: 40,
    badge: "paper-figure",
    levels: {
      overview: [
        "A boxplot of Stroop reaction time by condition with both axes named in words a reader understands.",
        "Title it as a claim or a description, not 'Figure 1.' The y-axis is reaction time in milliseconds. In RStudio you would add a confidence interval or the raw points with ggplot. Here, boxplot is the mark, and the axis labels are the check.",
      ],
      detailed: [],
    },
    setup: `stroop <- read.csv("/data/stroop.csv", stringsAsFactors = TRUE)`,
    starter: `cat("Reaction time (ms) by condition")
boxplot(rt_ms ~ condition, data = stroop,
        main = "Incongruent trials take longer",
        ylab = "Reaction time (ms)",
        xlab = "Condition")`,
    check: "Reaction time",
    checkHint: "Keep the cat() line so the check can see the axis label you intend.",
  }),
  item({
    slug: "writeup",
    kind: "project",
    title: "Writing up results for publication",
    short: "Write-up",
    blurb: "Four sentences. The behavior is the subject. The statistics are in parentheses.",
    minutes: 30,
    xp: 40,
    badge: "writeup",
    selfCheck: true,
    levels: {
      overview: [
        "Write four sentences you would let a reviewer see, one each for a t-test, a correlation, a regression, and a logistic result.",
        "Weak: 'The t-test was significant (p < .05).' Strong: 'Patients slept 1.6 hours longer on the second drug than on the first (mean difference = 1.58 hours, 95% CI [0.70, 2.46]).' Use numbers from the assignments you already ran, in the units of those datasets. When the four sentences exist in your notes, mark the project complete. This page cannot read your prose.",
      ],
      detailed: [],
    },
  }),
];

export const MODULES: PsychModule[] = RAW.flatMap((module) => {
  if (module.kind !== "lesson") return [module];
  const pages = LESSON_PAGES.filter((page) => page.parent === module.slug).map((page) =>
    item({
      slug: page.slug,
      kind: "page",
      parent: page.parent,
      title: page.title,
      short: page.short,
      blurb: page.blurb,
      minutes: 8,
      xp: 0,
      levels: { overview: page.overview, detailed: page.detailed },
      figures: page.slug === "ggplot-in-r" ? [{ after: 0, id: "ggplot-gallery" }] : undefined,
    })
  );
  return [module, ...pages];
});

export const REDIRECTS: { slug: string; to: string }[] = [
  { slug: "which-test", to: "/psychstats/analyzing-data/" },
  { slug: "t-tests", to: "/psychstats/analyzing-data/" },
  { slug: "correlation", to: "/psychstats/analyzing-data/" },
  { slug: "regression", to: "/psychstats/regression-models/" },
  { slug: "glm", to: "/psychstats/regression-models/" },
  { slug: "why-a-script", to: "/psychstats/r-is-free/" },
  { slug: "objects-and-functions", to: "/psychstats/r-packages/" },
  { slug: "console-and-script", to: "/psychstats/reproducibility/" },
  { slug: "working-directory", to: "/psychstats/r-setup/" },
  { slug: "packages", to: "/psychstats/r-packages/" },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
