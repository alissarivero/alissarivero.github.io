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
  /** On the path, place this assignment after the page or assignment with this slug. */
  after?: string;
  datasetNote?: string;
  /** Short recording that belongs above the text. Empty until the file exists. */
  videoSlot?: string;
  video?: string;
  levels: { overview: string[]; detailed: string[]; points?: string[]; credit?: string };
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
      detailed: [],
    },
  }),
  item({
    slug: "why-r",
    kind: "lesson",
    title: "Introduction to R",
    short: "R",
    blurb: "What R is, and why most psychology researchers use it.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "r-setup",
    kind: "assignment",
    parent: "why-r",
    after: "why-researchers-use-r",
    title: "Getting R set up on your computer",
    short: "Install R",
    blurb: "Download R, then RStudio, then show a Quarto document that says you downloaded R.",
    minutes: 40,
    xp: 20,
    badge: "r-setup",
    selfCheck: true,
    levels: {
      overview: [
        "This assignment happens on your own computer. The browser on this site cannot install software for you. You will download two programs, open a Quarto document, type one sentence, and upload a screenshot of it here.",
        "R is the program that does the statistics. You download it from CRAN, the official site: https://cran.r-project.org/. On that page, pick your system. On a Mac, choose Download R for macOS, then the installer for your chip (Apple silicon if the Mac is from the last few years, otherwise the Intel build). On Windows, choose Download R for Windows, then base, then the download link at the top. Run the installer and accept the defaults. When it finishes, R is on the machine. You will not usually open the R app by itself.",
        "RStudio is the window you work in. Download the free RStudio Desktop from https://posit.co/download/rstudio-desktop/. Install it after R, so RStudio can find R. Open RStudio. You should see a few panes: a script or source area, a console where results print, and a files pane. If the console shows a version of R and a prompt, both installs worked.",
        "Make a folder called psych-stats somewhere you can find, such as Documents. In RStudio choose File, then New File, then Quarto Document. A Quarto document is a file that ends in .qmd. It can hold sentences and R code in the same place. Give it the title Setup and leave the defaults. Save it inside psych-stats as setup.qmd. RStudio may ask to install a few tiny packages the first time you use Quarto. Let it.",
        "Under the gray header at the top of setup.qmd, type this sentence on its own line: I downloaded R! That sentence is the whole assignment. Click Render. RStudio builds a preview. Take a screenshot that shows the sentence I downloaded R! in the preview or in the .qmd. Upload that screenshot at the bottom of this page.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "understanding-data",
    kind: "lesson",
    title: "Understanding your dataset",
    short: "Your data",
    blurb: "What is in the file, what one row is, and what kind of variable each column is.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "cleaning",
    kind: "lesson",
    title: "Cleaning your data",
    short: "Cleaning",
    blurb: "What goes wrong in human data, and the rules you write down before you analyze.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "visualizing",
    kind: "lesson",
    title: "Visualizing your data",
    short: "Figures",
    blurb: "Which picture matches the question, and how ggplot builds it.",
    minutes: 25,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "describing",
    kind: "lesson",
    title: "Describing your data",
    short: "Description",
    blurb: "Summaries that stay with the people you measured.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "analyzing-data",
    kind: "lesson",
    title: "Analyzing your data",
    short: "Analyses",
    blurb: "Inference, significance, and how you pick a test.",
    minutes: 25,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "t-tests",
    kind: "lesson",
    title: "T-tests",
    short: "T-tests",
    blurb: "Whether two samples differ, and how to read the test.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "correlations",
    kind: "lesson",
    title: "Correlations",
    short: "Correlations",
    blurb: "How tightly two numeric columns move together.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "regression-models",
    kind: "lesson",
    title: "Regression models",
    short: "Regression",
    blurb: "A straight line for the mean, and what the numbers on that line mean.",
    minutes: 25,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "multilevel-unit",
    kind: "lesson",
    title: "Multi-level models",
    short: "Multi-level",
    blurb: "A model for rows that share a person.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "glms",
    kind: "lesson",
    title: "GLMs",
    short: "GLMs",
    blurb: "When the outcome is not a plain measurement, and when it is yes or no.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "variance",
    kind: "lesson",
    title: "Analyses of variance",
    short: "ANOVA",
    blurb: "Comparing more than two means, with and without a covariate.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "assumptions",
    kind: "lesson",
    title: "Assumptions",
    short: "Assumptions",
    blurb: "The conditions a test used, and what to do when they fail.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "effect-size",
    kind: "lesson",
    title: "Effect size and uncertainty",
    short: "Effect size",
    blurb: "How big the result is, and the range the data have not ruled out.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "communicating",
    kind: "lesson",
    title: "Communicating results",
    short: "Writing",
    blurb: "A sentence about the behavior, and a figure that shows it.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "great-figures",
    kind: "lesson",
    title: "How to make great figures",
    short: "Great figures",
    blurb: "The same pictures, held to the standard of a paper or a poster.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "outputs",
    kind: "lesson",
    title: "Outputs",
    short: "Outputs",
    blurb: "Papers, posters, talks, and a script someone else can run.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "frontiers",
    kind: "lesson",
    title: "New frontiers in statistics",
    short: "Frontiers",
    blurb: "Bayesian work, computational models, encoders, language, and machine learning.",
    minutes: 20,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),
  item({
    slug: "reads",
    kind: "lesson",
    title: "Interesting reads",
    short: "Reads",
    blurb: "Where these tools came from, why results fail to repeat, and why you rerun the script.",
    minutes: 15,
    xp: 0,
    levels: { overview: [], detailed: [] },
  }),

  item({
    slug: "r-walkthrough",
    kind: "assignment",
    parent: "why-r",
    after: "r-setup",
    title: "Starting a project in R",
    short: "A project",
    blurb: "Make an object, put numbers in it, and look at the mean.",
    minutes: 20,
    xp: 20,
    badge: "r-walkthrough",
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
    parent: "describing",
    after: "descriptives",
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
    slug: "visualize-assignment",
    kind: "assignment",
    parent: "visualizing",
    after: "graph-basics",
    title: "Data visualizations",
    short: "Plots",
    blurb: "Draw the comparison in base R, and read the ggplot version you will use in RStudio.",
    minutes: 25,
    xp: 25,
    badge: "visualize-assignment",
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
    slug: "t-tests-lab",
    kind: "assignment",
    parent: "t-tests",
    after: "reading-a-t-test",
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
    parent: "correlations",
    after: "correlation-interpretation",
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
    after: "reading-the-line",
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
    parent: "glms",
    after: "logistic-regression",
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
    parent: "variance",
    after: "ancova",
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
    parent: "multilevel-unit",
    after: "multilevel-models",
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
    slug: "ggplot-assignment",
    kind: "assignment",
    parent: "visualizing",
    after: "ggplot-layers",
    title: "Build a ggplot",
    short: "ggplot",
    blurb: "In RStudio, make one ggplot of reaction time by condition and mark it here.",
    minutes: 25,
    xp: 20,
    badge: "ggplot-assignment",
    selfCheck: true,
    levels: {
      overview: [
        "This one happens in RStudio, where ggplot2 is installed. The browser playground on this site runs base R only.",
        "Load the Stroop file, or any file with a group and a measurement. Install ggplot2 if R asks. Run ggplot(stroop, aes(x = condition, y = rt_ms)) + geom_boxplot() + labs(y = 'Reaction time (ms)', x = 'Condition'). When the figure shows both groups with the units labeled, mark this assignment complete.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "great-visualize-assignment",
    kind: "assignment",
    parent: "great-figures",
    after: "great-visualization-variable-type",
    title: "A figure you would show someone",
    short: "One figure",
    blurb: "Draw one comparison in base R, labeled in the units of the study.",
    minutes: 25,
    xp: 20,
    badge: "great-visualize",
    selfCheck: true,
    levels: {
      overview: [
        "Pick one comparison from a dataset in this course: Stroop reaction time by condition, or sleep extra by drug. Draw it with boxplot() or plot(), and name both axes in real units.",
        "The title should say what the picture shows, not 'Figure 1.' When that figure exists in your script, mark this assignment complete.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "great-ggplot-assignment",
    kind: "assignment",
    parent: "great-figures",
    after: "great-ggplot-layers",
    title: "A ggplot you would publish",
    short: "ggplot",
    blurb: "Rebuild that comparison in ggplot2, with labels a reader can use.",
    minutes: 25,
    xp: 20,
    badge: "great-ggplot",
    selfCheck: true,
    levels: {
      overview: [
        "In RStudio, rebuild the comparison from the previous assignment with ggplot2. Map the columns in aes(), add one geom, and set the axis labels with labs().",
        "A reader should see the units without opening the script. When the figure does that, mark this assignment complete.",
      ],
      detailed: [],
    },
  }),
  item({
    slug: "first-dataset",
    kind: "project",
    title: "What to do when you first get a dataset",
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
];

const FIGURES: Record<string, { after: number; id: string }[]> = {
  "why-researchers-use-r": [{ after: 2, id: "ggplot-gallery" }],
  "stats-answer-questions": [{ after: 0, id: "describe-infer" }],
  "inferential-stats": [{ after: 0, id: "describe-infer" }],
  significance: [{ after: 0, id: "chance-grid" }],
  "variable-types": [{ after: 0, id: "column-types" }],
  "visualization-examples": [{ after: 0, id: "plot-gallery" }],
  "difference-between-two-samples": [{ after: 0, id: "mean-gap" }],
  "1v2-sample-t-test": [{ after: 0, id: "t-kind" }],
  "correlation-interpretation": [{ after: 0, id: "hug" }],
  "linear-regression": [{ after: 1, id: "mbti-line" }],
  "line-of-best-fit": [{ after: 0, id: "fit-line" }],
  "reading-the-line": [{ after: 0, id: "read-line" }],
  "nested-data": [{ after: 0, id: "nested" }],
  "multilevel-models": [{ after: 0, id: "nested" }],
  glm: [{ after: 0, id: "sigmoid" }],
  "logistic-regression": [{ after: 0, id: "sigmoid" }],
  anova: [{ after: 0, id: "anova-groups" }],
  ancova: [{ after: 0, id: "ancova-lines" }],
  independence: [{ after: 0, id: "cluster" }],
  normality: [{ after: 0, id: "shape" }],
  "skew-kurtosis": [{ after: 0, id: "shape" }],
  "cohens-d": [{ after: 0, id: "mean-gap" }],
  "confidence-intervals": [{ after: 0, id: "interval" }],
  figures: [{ after: 0, id: "write-sentence" }],
};

const VIDEO_SLOTS: Record<string, string> = {
  "r-setup": "Installing R, RStudio, and a Quarto document",
  "r-walkthrough": "Starting a project and a first mean",
  "inspect-variables": "Looking at names, str, and head",
  "cleaning-data": "Cleaning one messy file in a script",
  ggplot: "Building a ggplot in RStudio",
  "reading-a-t-test": "Reading a t-test out loud",
};

const toPage = (page: (typeof LESSON_PAGES)[number]): PsychModule =>
  item({
    slug: page.slug,
    kind: "page",
    parent: page.parent,
    title: page.title,
    short: page.short,
    blurb: page.blurb,
    minutes: 8,
    xp: 0,
    levels: { overview: page.overview, detailed: page.detailed, points: page.points, credit: page.credit },
    figures: FIGURES[page.slug],
    videoSlot: VIDEO_SLOTS[page.slug],
  });

const withAssignments = (lessonSlug: string): PsychModule[] => {
  const kids = LESSON_PAGES.filter((page) => page.parent === lessonSlug).map(toPage);
  for (const assignment of RAW.filter((module) => module.parent === lessonSlug)) {
    const index = assignment.after ? kids.findIndex((kid) => kid.slug === assignment.after) : -1;
    if (index >= 0) kids.splice(index + 1, 0, assignment);
    else kids.push(assignment);
  }
  return kids;
};

export const MODULES: PsychModule[] = [
  ...LESSON_PAGES.filter((page) => page.parent === "course").map(toPage),
  ...RAW.flatMap((module) => {
    if (module.kind === "assignment") return [];
    if (module.kind !== "lesson") return [module];
    return [module, ...withAssignments(module.slug)];
  }),
].map((module) => (VIDEO_SLOTS[module.slug] ? { ...module, videoSlot: VIDEO_SLOTS[module.slug] } : module));

export const REDIRECTS: { slug: string; to: string }[] = [
  { slug: "which-test", to: "/psychstats/picking-a-test/" },
  { slug: "correlation", to: "/psychstats/correlation-interpretation/" },
  { slug: "regression", to: "/psychstats/linear-regression/" },
  { slug: "why-a-script", to: "/psychstats/why-researchers-use-r/" },
  { slug: "one-row", to: "/psychstats/observations/" },
  { slug: "describing-a-column", to: "/psychstats/descriptives/" },
  { slug: "which-plot", to: "/psychstats/visualization-variable-type/" },
  { slug: "anova-ancova", to: "/psychstats/anova/" },
  { slug: "best-fit", to: "/psychstats/line-of-best-fit/" },
  { slug: "what-a-glm-is", to: "/psychstats/glm/" },
  { slug: "logistic", to: "/psychstats/logistic-regression/" },
  { slug: "multilevel", to: "/psychstats/nested-data/" },
  { slug: "intervals", to: "/psychstats/confidence-intervals/" },
  { slug: "the-sentence", to: "/psychstats/writeup/" },
  { slug: "parentheses", to: "/psychstats/writeup/" },
  { slug: "the-figure", to: "/psychstats/figures/" },
  { slug: "bayesian-in-practice", to: "/psychstats/bayesian/" },
  { slug: "reading-a-correlation", to: "/psychstats/correlation-interpretation/" },
  { slug: "r-1", to: "/psychstats/r-walkthrough/" },
  { slug: "r-2", to: "/psychstats/r-walkthrough/" },
  { slug: "r-3", to: "/psychstats/describe/" },
  { slug: "visualize", to: "/psychstats/visualize-assignment/" },
  { slug: "bayes-lab", to: "/psychstats/bayesian/" },
  { slug: "viz-project", to: "/psychstats/great-visualize-assignment/" },
  { slug: "objects-and-functions", to: "/psychstats/why-researchers-use-r/" },
  { slug: "console-and-script", to: "/psychstats/why-researchers-use-r/" },
  { slug: "working-directory", to: "/psychstats/r-setup/" },
  { slug: "packages", to: "/psychstats/why-researchers-use-r/" },
  { slug: "what-psychologists-ask", to: "/psychstats/methodology-discovery/" },
  { slug: "description", to: "/psychstats/methodology-discovery/" },
  { slug: "experiments", to: "/psychstats/stats-answer-questions/" },
  { slug: "prediction", to: "/psychstats/stats-answer-questions/" },
  { slug: "no-math", to: "/psychstats/stats-answer-questions/" },
  { slug: "r-is-free", to: "/psychstats/why-researchers-use-r/" },
  { slug: "complex-analyses", to: "/psychstats/why-researchers-use-r/" },
  { slug: "r-packages", to: "/psychstats/why-researchers-use-r/" },
  { slug: "ggplot-in-r", to: "/psychstats/why-researchers-use-r/" },
  { slug: "reproducibility", to: "/psychstats/why-researchers-use-r/" },
  { slug: "cohort-effects", to: "/psychstats/why-researchers-use-r/" },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}
