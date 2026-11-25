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
      detailed: [
        "The three questions license different products. A description owes the reader a faithful summary and a picture. An inference owes a design: what was manipulated, what was held constant, and what would count against the claim. A prediction owes a check against data that were not used to build the story. Mixing them up is how a lab writes 'we showed that children are Bayesian' after plotting a mean.",
        "Difficulty is not a reason to outsource the sentence to the software. The software will happily give you a number for a question you did not ask. Your job, from the first dataset on, is to know which question you are in.",
        "Nothing in this lesson is a test. The rest of the course is the practice: data, then tests psychologists actually report, then the assumptions those tests quietly require, then the sentence and the figure a paper needs.",
      ],
    },
  }),
  item({
    slug: "why-r",
    kind: "lesson",
    title: "Why psychologists use R",
    short: "Why R",
    blurb: "The program the field writes papers in, and the handful of ideas every script is built from.",
    minutes: 20,
    xp: 0,
    levels: {
      overview: [
        "Psychologists use R because the analysis can be written down and rerun. A script is a record of what you did to the data, which a point-and-click history is not. It is free, which matters for students and for labs that share code with a paper. The packages are where the field's methods live: a new model often arrives as a package before it arrives in a menu.",
        "You will meet the same pieces over and over. An object is a name for a value, a column, or a whole dataset. A function does one job to the thing you hand it, and you hand it that thing inside parentheses. A package is a bundle of functions you install once and load when you need it. The console is where a single line runs. A script is the file you save.",
        "Two habits save more time than any trick. The working directory is the folder R is looking at; your CSV has to be somewhere R can see. When a function is unfamiliar, put a question mark in front of its name and read the help. This site runs base R in the browser so you can practice without installing anything. ggplot, extra packages, and your own files live in RStudio on your computer, which is the assignment under this lesson.",
      ],
      detailed: [
        "R is not the only serious choice. SPSS is still in many departments. Python is common when the work is closer to machine learning. R stays the default in psychology because the papers you will read, the packages for mixed models and psychometrics, and the tidyverse style of plotting were built by people answering psychological questions. Learning it is learning the dialect the field argues in.",
        "The concepts are small and they stack. c() gathers numbers. <- stores them under a name. A data frame is a table: rows are observations, columns are variables, and dataset$column picks one column out. A factor is a column of categories. Comments, the lines that start with #, are how you record what a row means. None of this is statistics yet. It is the grammar the statistics will be written in.",
        "The browser exercises later in the course are the same grammar with the installation taken out. If something works here and fails on your computer, the usual cause is the working directory or a package you have not loaded, not a different language. The setup assignment is there so that gap is a checklist rather than a surprise later.",
      ],
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
      detailed: [
        "Install R before RStudio. RStudio will open without it and then fail in a way that looks like a mysterious console error. On a lab computer you may already have both; still set the working directory, because that is the piece that breaks other people's scripts.",
        "Do not install packages inside a script you rerun every time. Install once, in the console. Load with library() at the top of any script that uses the package. If install.packages asks you to choose a mirror, pick one geographically close to you. A failed download is almost always a network pause. Run the line again.",
        "The browser assignments on this site will keep working if your install is unfinished. They are not a substitute for it. The plots and models you will eventually want, ggplot2 and mixed models included, run in the RStudio you just set up.",
      ],
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
      detailed: [
        "The row is also a claim about dependence. Trial-level rows from the same person are not independent samples. Describing them is fine. Testing them as if each trial were a new person is not. When the question is about people, either summarize to one number per person first or use a model that keeps the person (lesson 4).",
        "Ordinal scales (a 1–7 rating) are the awkward middle. The median and a picture are honest. A mean is a convenience the field uses constantly; if you use it, say you treated the ratings as roughly evenly spaced. Bounded scores (accuracy from 0 to 1, reaction times that cannot be negative) pull means and fool a symmetric summary. Look before you average.",
        "A bar chart of means hides the thing psychologists most need to see: spread, skew, and a second clump. Use it when the variable is a count of people in a category. For a measurement, prefer the distribution or the points.",
      ],
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
      detailed: [
        "Significance is a statement about a sampling plan under a stated null, not a property of a single dataset you can see by eye. Optional stopping and unreported analyses change the long-run rate, so the printed p-value is no longer the probability you are claiming. Report the estimate and the interval next to it (lesson 6) so a small, precise effect cannot masquerade as an important one.",
        "Pairing is a design fact. Two scores from the same person share whatever is stable about that person. An independent test pretends they do not, and usually throws away power. An independent test is the right one when the groups are different people. Welch’s version, the default of t.test(), does not assume the groups are equally spread out. Use that default.",
        "ANOVA’s null is 'all means equal,' so a significant result is an invitation to the comparisons you said you would make, not a license to describe every pair as if you had planned it. ANCOVA’s 'holding age steady' is only as good as the linear relationship you assumed and the overlap of the groups on age. If one condition is all first-years and the other is all graduates, you do not have an age-adjusted condition effect. You have a confound.",
      ],
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
      detailed: [
        "A non-significant Shapiro–Wilk test is not proof of normality. In a small sample the check is weak. In a large sample it flags trivial bumps. Use it as a prompt to look, which is what the which-test walker is doing when it shows you the check and tells you how to read it.",
        "Unequal spread is a different failure from non-normal shape. Two groups can both look bell-shaped and one can be twice as wide. Welch’s t-test and a picture of the boxes belong together. Bartlett’s test is aggressive about that difference and is itself bothered by non-normal data. Prefer the picture plus Welch over a ritual of assumption p-values.",
        "Dependence from groups is not fixed by 'including group as a covariate' if the group is the cluster you sampled. Classrooms assigned to a curriculum are not 30 independent children times 10 rooms. The unit you randomized is the unit whose variance you must respect. Writing that down in the participants section is part of the statistics.",
      ],
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
      detailed: [
        "Intervals inherit the model. A paired interval assumes the differences are the right unit and are independent across people. If you built it on trials instead of people, the interval is too narrow for the same reason the p-value was too small. Match the interval to the unit of the claim.",
        "Standardized effects are comparable and slippery. d depends on which spread you divide by. A within-person spread and a between-person spread answer different questions. Report the one that matches the design, and keep the raw difference in the same sentence. Benchmarks like '0.2 is small' are a field convention, not a fact about minds. A small d on a cheap, repeated measure can matter. A large d on a noisy one-item scale can be a measurement accident.",
        "Odds ratios need a base rate. Doubling a 1% chance and doubling a 40% chance are not the same practical change. Convert back to probabilities at the conditions you ran when you write the paper. That conversion is the point of lesson 7.",
      ],
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
      detailed: [
        "Parentheses are not a place to hide ambiguity. If the interval is wide, the sentence should sound unsure. If you ran several tests, the sentence should say which comparison was planned. 'The effect was significant' with no estimate is not a result. It is a claim that a threshold was crossed.",
        "Error bars on within-person designs are a known trap. A confidence interval meant for a between-person comparison looks huge on a within-person effect and invites the reader to think the conditions overlap when the differences do not. If the claim is about the difference, plot the differences or say in the caption that the bars are not the test.",
        "Polishing is not decoration. A truncated axis that starts at 490 ms can make a 10 ms effect look like a cliff. Start at a defensible zero or mark the break. Color should encode a variable, not the lab’s brand. The caption should let someone who did not read the paragraph know what was measured and what the marks mean.",
      ],
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
      detailed: [
        "You should not claim to have 'done Bayesian inference' because you can define a posterior in a sentence. A careful Bayesian analysis picks a prior you can defend, looks at what that prior predicts before seeing the data, and shows how the conclusion moves if the prior moves. The link to learning theory is real and it is not automatic. A Bayesian stats model of a sample is not a claim that the participants were Bayesian learners.",
        "A computational model that fits noise is not a theory. Equation-based models need a parameter you could imagine measuring. Agent-based models need a rule for a single agent that is simpler than the group pattern you are trying to explain. If the model can produce anything, it has not explained the thing you found.",
        "Encoders and classifiers inherit the data they were trained on. A representation of faces or of parenting language can smuggle in the biases of that training set. Using one as a predictor is ordinary regression with a fancy column. It still needs the design, the unit of analysis, and the sentence. Prediction accuracy on the same people you trained on is not prediction. Held-out people, held-out time, or a preregistered split is the frontier version of an honest test.",
      ],
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
      detailed: [
        "If R says 'object not found,' the name on the second line does not match the name you stored. R cares about capital letters. If you see a syntax error near ')', a parenthesis is missing. The hint is the whole task: store, then call mean on that name.",
      ],
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
      detailed: [
        "If the incongruent mean is not larger, you are not looking at rt_ms, or the file did not load. sd() is the spread of the trials, which is not the spread of people. Say that if you write about it.",
      ],
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
      detailed: [
        "str() tells you whether a column arrived as a number or as text. A reaction time that arrives as text will not average. If that happens in your own files, a stray letter in the column is the usual cause.",
      ],
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
      detailed: [
        "A boxplot shows the median, the middle half, and points that sit far away. It is the right default for a numeric outcome and a categorical condition. A bar of means would hide the skew reaction times often have.",
      ],
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
      detailed: [
        "Subsetting with == is exact. A trailing space in a label will silently give you no rows, and mean() of no rows is NaN. table(stroop$condition) is how you see the labels you actually have.",
      ],
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
      detailed: [
        "Dropping paired = TRUE runs the wrong test. The output will still contain a p-value, and it will not be the within-person comparison. Check that the heading says 'Paired t-test.'",
      ],
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
      detailed: [
        "Try x4 and y4 afterward, on your own. The correlation is almost the same. The plot is one point high above a line. That is the lesson.",
      ],
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
      detailed: [
        "If Coefficients does not appear, you printed fit without summary(). The slope should be large and positive. A negative slope means the coding is backwards.",
      ],
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
      detailed: [
        "Dose in this file is 0.5, 1, or 2. Treating it as numeric assumes equal steps. Treating it as a factor asks a more general question. Try factor(dose) after the check and see the degrees of freedom change.",
      ],
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
      detailed: [
        "The person-level mean is the analysis you can defend if you only know base R. It gives every infant equal weight. A trial-level t-test does not. When you later fit the mixed model, the fixed effect of condition should tell a similar story. If it does not, the infants contributed very different numbers of trials and you should say so.",
      ],
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
      detailed: [
        "This is two hypotheses, not a prior spread over every possible bias. A cognitive model in the Tenenbaum tradition usually has a continuous prior. The lesson is the update, not the particular coins. The frequentist p-value for 'is this coin fair?' would be a different object: a probability about data, not a probability about the coin.",
      ],
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
      detailed: [
        "A good comment sounds like this: 'One row is one trial from an unnamed participant. condition is congruent or incongruent. rt_ms is reaction time in milliseconds. errors is a count. age is in years.' A weak comment says 'the data' and lists the column names with no units.",
      ],
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
      detailed: [
        "Looking-time files tempt a trial-level test. Do not. infant is the person. The familiar/novel difference is a within-infant question only after you have one number per infant and condition, or a mixed model you cannot fit here. Anscombe pair 4 is in the project so you practice refusing a correlation that the plot embarrasses.",
      ],
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
      detailed: [
        "If you later add error bars, say in a comment whether they are standard errors or confidence intervals, and whether they are about trials or about people. A caption that does not say this makes the reader guess what the test was.",
      ],
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
      detailed: [
        "A correlation sentence names both measures and refuses causation. A regression sentence gives the slope in the outcome’s units ('about 250 ms slower when the trial was incongruent'). A logistic sentence gives a direction and, if you can, a probability or an odds ratio, not a naked log-odds coefficient. If the interval includes effects you would call trivial and effects you would call large, say that the estimate is uncertain.",
      ],
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
  { slug: "frequentist-bayesian", to: "/psychstats/frontiers/" },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
