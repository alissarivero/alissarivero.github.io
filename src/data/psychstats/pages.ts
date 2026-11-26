export type LessonPage = {
  slug: string;
  parent: string;
  title: string;
  short: string;
  blurb: string;
  overview: string[];
  detailed: string[];
  points?: string[];
  credit?: string;
};

const page = (
  slug: string,
  parent: string,
  title: string,
  short: string,
  blurb: string,
  overview: string[],
  detailed: string[],
  points?: string[],
  credit?: string
): LessonPage => ({ slug, parent, title, short, blurb, overview, detailed, points, credit });

export const LESSON_PAGES: LessonPage[] = [
  page(
    "introduction-to-course",
    "course",
    "Introduction to this course",
    "This course",
    "Statistics can be challenging. We think you can learn it.",
    [
      "Statistics can be challenging. We think you can learn it.",
      "We created this course to make the quantitative tools psychologists use every day accessible, approachable, and practical.",
      "Learn the foundations of psychological statistics at your own pace, with hands-on experience using R along the way. No prior statistics or programming experience required.",
    ],
    [],
    [
      "Completely free",
      "Fully online and self-paced",
      "Optional sign-in to save your progress and pick up where you left off",
    ],
    "Created by the Anti-Racism Community in the Department of Psychology & Neuroscience at Duke University."
  ),
  page(
    "methodology-discovery",
    "introduction",
    "Methodology as a tool for discovery",
    "Methodology",
    "A method is how a question becomes something you can see.",
    [
      "Methodology is the set of choices that lets a psychological question be answered with observations. Who is in the study, what you change, what you hold still, and what you write down are the method. Those choices decide which discovery is even possible.",
      "Piaget sat with children and wrote what they did. An experiment changes one thing and watches the rest. A model asks whether the next judgment could have been forecast. In each case the method is the tool: it turns a hunch into a pattern someone else can look at. Statistics is the part of that tool that summarizes the pattern and asks whether it would show up again.",
    ],
    []
  ),
  page(
    "stats-answer-questions",
    "introduction",
    "Statistics allow you to answer your questions",
    "Your questions",
    "The test, the mean, and the model are answers to different questions.",
    [
      "A question about what people did needs a summary: a mean, a spread, a picture. That is description, and it stops at the people you measured. The picture below puts that sample on the left. Inference is the question on the right: if there were no real difference in the population, how often would a new sample look like yours? A question about why, after you changed one thing, needs that second picture. A question about what someone will do next needs a model checked on behavior it has not seen yet.",
      "Statistics is how those answers get made. The same spreadsheet can support all three, and the wrong summary answers a question you did not ask. This course stays with that match: name the question, then use the statistic that answers it.",
    ],
    []
  ),
  page(
    "what-is-r",
    "why-r",
    "What is R?",
    "What is R?",
    "R is a language for working with data.",
    [
      "R is a programming language for statistics and data. You give it instructions, usually in a script, and it works on tables of observations: means, tests, models, and figures. Psychologists use it for the analyses in papers and for the graphs that show those analyses.",
      "It is not a spreadsheet, and it is not a single test. A spreadsheet stores the rows. R is where you describe what to do with those rows, in a form you can save and run again. You do not need to have programmed before. The later pages introduce the pieces as they come up.",
    ],
    []
  ),
  page(
    "why-researchers-use-r",
    "why-r",
    "Why do most psychology researchers use R?",
    "Why R",
    "It is free, it handles the analyses and the figures, and the field already shares the code.",
    [
      "Most psychology researchers use R first because it is free. A student, a lab, and a collaborator at another university can install the same program without a license. CRAN is where you download R. RStudio Desktop, the window most people work in, is also free.",
      "R is also where the complex work lives. Comparisons, regression, models that remember which trials belong to one person, and figures built in layers all sit in the same language. A package is a bundle of functions for one of those jobs. lme4, psych, lavaan, and ggplot2 are packages the field already shares. You install one with install.packages() and load it with library(). A new method often arrives as a package before it arrives in a point-and-click menu.",
      "ggplot2 is the package people use when the figure has to carry the result. You name the table, map columns onto x, y, and color, and add a mark: points, a smooth line, a ribbon, a box. The pictures below were drawn for this course in that style. In RStudio the call looks like ggplot(data, aes(x, y, color = group)) + geom_point() + geom_smooth().",
      "A script can be saved and run again, so the analysis can travel with the paper. That is the practical side of reproducibility. There is also a cohort effect: so many psychologists already use R that sending a script to a classmate or a coauthor is ordinary. You are choosing the language the people around you already share.",
    ],
    []
  ),
  page(
    "inspect-variables",
    "understanding-data",
    "What variables are in my dataset?",
    "Inspect",
    "Look at the columns before you compute anything.",
    [
      "Open the file and name every column before you call mean() or plot(). In R, names(data) lists the columns, str(data) shows the type R stored, and head(data) shows the first rows. A column you cannot explain in a sentence is not ready to analyze.",
      "Write down, for each column, what one number or label means and what unit it is in. Reaction time in milliseconds is not the same object as a count of errors. This page is that inventory.",
      "The file used for this look is stroop.csv. It is simulated teaching data, built to resemble an ink-naming experiment. It is not anyone's raw data, and it is not Stroop's 1935 study."
    ],
    []
  ),
  page(
    "observations",
    "understanding-data",
    "One row is one what?",
    "One row",
    "A trial and a person can live in the same spreadsheet and be different datasets.",
    [
      "In a Stroop study, one row might be one trial: this person, this condition, this reaction time. Or one row might be one person, already averaged. Those are different datasets even when the columns look similar. Averaging trials into people changes what a later test is about. Decide that before calling mean().",
    ],
    []
  ),
  page(
    "variable-types",
    "understanding-data",
    "Variable Types",
    "Column types",
    "You may average a duration. You may not average a label.",
    [
      "condition is a name: congruent or incongruent. rt_ms is a duration. errors is a count. age is a number you did not assign. Names and unordered groups are categorical. Durations, ratings, and counts are numeric, and they are not interchangeable just because they are stored as numbers. A 1 and a 2 that mean 'group A' and 'group B' are still labels.",
    ],
    []
  ),
  page(
    "raw-data-issues",
    "cleaning",
    "What could possibly go wrong collecting data from humans?",
    "Raw data",
    "Human data arrives with mistakes.",
    [
      "People skip items, tap the wrong key, take a break in the middle of a trial, or type an age of 213. A spreadsheet from a survey can contain duplicate rows, a dropped participant, or a free-text answer where you expected a number.",
      "None of that is a reason to throw the file away. It is a reason to look before you summarize. The next page is the cleaning you do after you have seen those problems.",
      "On the teaching Stroop file, a reaction time of 12 ms is not a trial a person could have finished. That row is one to set aside, and the script should say so. stroop.csv is simulated for this course. It is not a published study."
    ],
    []
  ),
  page(
    "cleaning-data",
    "cleaning",
    "Cleaning data",
    "Cleaning",
    "Decide what a bad row is, and write the decision down.",
    [
      "Cleaning is a set of rules you can rerun: drop duplicate IDs, turn blank cells into missing values, and set aside trials that finished faster than a person can respond. The rule belongs in the script, not only in your memory.",
      "Say how many rows you removed and why. A reader should be able to start from the raw file and reach the same analysis file by running your code.",
      "A rule you can rerun: drop any trial faster than 200 ms, then print how many rows remain. The simulated Stroop file in this course has no such row. You would notice if one showed up, because the count would change."
    ],
    []
  ),
  page(
    "visualization-examples",
    "visualizing",
    "What types of visualizations are possible?",
    "Examples",
    "A figure is a choice about which pattern to show.",
    [
      "A histogram or density shows one numeric column. A box or a set of points shows a number split by a group. A scatter shows two numbers. A bar of counts shows categories. Those are the pictures this course uses.",
      "The same table can support all of them. The question decides the picture. A mean difference wants a comparison of groups. A relationship wants a scatter."
    ],
    []
  ),
  page(
    "visualization-variable-type",
    "visualizing",
    "Different types of variables get visualized differently",
    "By type",
    "The column type decides which picture is legal.",
    [
      "A label such as condition cannot be a histogram of the word 'incongruent.' It can be a count, or the group on the x-axis of a plot of reaction time. A duration can be a histogram, a box, or the y-axis of a scatter.",
      "If you are unsure, name the column type first, then pick the mark. The assignment after the basics page is where you draw one."
    ],
    []
  ),
  page(
    "graph-basics",
    "visualizing",
    "Graph basics",
    "Basics",
    "Units, a readable scale, and the raw pattern.",
    [
      "Label the axes in the units of the study: milliseconds, hours, counts. Start a count axis at zero. Do not start a reaction-time axis at zero if the whole study lives between 400 and 800 ms and the zero makes the difference disappear.",
      "Prefer a picture that still shows the spread. A bar of means with no spread hides the thing a later test is about."
    ],
    []
  ),
  page(
    "ggplot",
    "visualizing",
    "What is ggplot?",
    "ggplot",
    "ggplot2 builds a figure in layers from a table.",
    [
      "ggplot2 is the R package most psychologists use when the figure has to carry the result. You name the table, map columns onto x, y, and color, then add a mark: points, a box, a smooth line.",
      "It is not a menu of chart types. It is a sentence about the data: which columns, which marks, which labels. The next page is how that sentence is assembled."
    ],
    []
  ),
  page(
    "ggplot-layers",
    "visualizing",
    "How a ggplot is built",
    "ggplot",
    "Data, then the mapping, then the mark.",
    [
      "The data is the table. aes() maps columns onto x, y, and color. geom_point(), geom_boxplot(), or geom_col() is the mark. In RStudio it looks like ggplot(stroop, aes(condition, rt_ms)) + geom_boxplot(). The browser on this site runs base R, so the practice draws with plot() and boxplot() and shows the ggplot version beside it.",
    ],
    []
  ),
  page(
    "descriptives",
    "describing",
    "What is descriptive statistics?",
    "Descriptives",
    "Description stays with the people you measured.",
    [
      "A mean, a median, a spread, and a picture answer what this sample did. They do not yet answer whether a new sample would do it. That second question is inference, and it comes later.",
      "Description still has a job. If you skip it, a test can look decisive while the raw scores are a handful of typos and one extreme person."
    ],
    []
  ),
  page(
    "inferential-stats",
    "analyzing-data",
    "What is inferential statistics?",
    "Inference",
    "Inference asks whether the pattern would show up again.",
    [
      "Description reports the sample in front of you. Inference asks what this sample implies about a larger population, or about what would happen if you ran the study again.",
      "A test is one inferential tool. It compares the pattern you found with the patterns you would expect if nothing were really going on. The significance page is that comparison, drawn as 100 repeated studies."
    ],
    []
  ),
  page(
    "significance",
    "analyzing-data",
    "What 'significant' is allowed to mean",
    "Significance",
    "A small p-value is a comment about the sample, not a stamp that the effect matters.",
    [
      "A test asks how surprising the result would be if there were truly no difference, or no relationship, of the kind you specified. The picture is 100 repeated studies under that dull story. The orange circles are the few, fewer than 5 in 100, that would look as extreme as the pattern you found just by chance. A small p-value means your study landed in that orange group. It does not mean the effect is large, and it does not mean you have found the cause. Psychologists report the threshold, and then they still owe the reader the size of the difference.",
    ],
    []
  ),
  page(
    "analyses",
    "analyzing-data",
    "What are the different types of analyses?",
    "Analyses",
    "The analysis follows the question and the columns.",
    [
      "Two groups and a numeric outcome is a comparison of means, often a t-test. More than two groups is an ANOVA. Two numeric columns that move together is a correlation or a regression. A yes-or-no outcome is a logistic model. Rows that share a person need a model that remembers the person.",
      "You do not collect analyses. You name the outcome, the predictors, and whether the rows are independent, and the analysis is the one that matches."
    ],
    []
  ),
  page(
    "picking-a-test",
    "analyzing-data",
    "Picking a test",
    "Which test",
    "The outcome and the design choose, not the menu you opened first.",
    [
      "Start with the outcome. A number leads toward t, ANOVA, correlation, or regression. Two categories lead toward a proportion or a logistic model. Then the design: one group or two, the same people or different people, one predictor or several. The walker in the parent lesson follows that order.",
    ],
    []
  ),
  page(
    "difference-between-two-samples",
    "t-tests",
    "Are my two samples meaningfully different?",
    "Two samples",
    "A difference is a gap in the original units, not a p-value.",
    [
      "Two samples are meaningfully different when the gap between them is large beside the spread, in a unit a reader cares about: hours of sleep, milliseconds, points on a scale.",
      "A tiny gap can be 'significant' in a huge sample, and a large gap can be quiet in a small one. Look at the two distributions, then the difference, before you read the test."
    ],
    []
  ),
  page(
    "1v2-sample-t-test",
    "t-tests",
    "Should I do a one or two-sample t-test?",
    "One or two",
    "One sample compares a mean to a known number. Two samples compare two means.",
    [
      "A one-sample t-test asks whether a mean differs from a fixed value, such as zero or a published norm. A paired test is the one-sample test applied to differences from the same people measured twice.",
      "A two-sample t-test compares two separate groups. If the same person is in both columns, it is not a two-sample test. Use the paired form."
    ],
    []
  ),
  page(
    "reading-a-t-test",
    "t-tests",
    "Interpreting a t-test",
    "A t-test",
    "Two means, and whether the gap is large beside the spread.",
    [
      "A t-test compares two means. Paired, or one-sample against a known value, uses the same people twice. Two-sample uses different people. The output gives the means, the t statistic, the degrees of freedom, and a p-value. The thing you wanted was the difference in the original units: hours of sleep, milliseconds, points on a scale. The t is how that gap compares with the noise.",
      "The numbers in a classroom t-test usually come from sleep, which ships with R: the same patients measured on two drugs. That is a built-in dataset, not data from your lab."
    ],
    []
  ),
  page(
    "correlation-interpretation",
    "correlations",
    "Interpreting a correlation",
    "Correlation",
    "r is direction and tightness, not importance by itself.",
    [
      "A correlation, r, runs from -1 to 1. The sign is the direction. The size is how tightly two numeric columns move together in a straight line. Zero is no straight-line relationship.",
      "A large r can still be a small change in the units that matter, and a plot can show a curve or a clump that r misses. Read the scatter, then r, then the test of whether the true correlation could be zero."
    ],
    []
  ),
  page(
    "linear-regression",
    "regression-models",
    "What is a linear regression?",
    "Linear regression",
    "A straight line for the mean of an outcome.",
    [
      "Linear regression describes the mean of an outcome as a straight line in one or more predictors. With one predictor, the line has an intercept and a slope.",
      "A claim students already know: a Myers–Briggs letter, E or I, is often treated as a prediction of real behavior, such as how often someone speaks up in a meeting. The picture puts that behavior on the vertical axis. The letter piles people into two columns, and the line stays nearly flat. A measured extraversion score spreads the same people out, and the slope is how much speaking-up changes for one step up the score. The letter is a weak predictor. A regression needs a number.",
      "The line is a summary of the mean, not a claim that every person sits on it. The next pages are what 'best' means and how to read the numbers.",
      "The personality picture on this page is a teaching drawing, not a sample from a published study. Do not cite it as evidence about Myers–Briggs. The claim it illustrates is that a letter is a weak predictor and a score is a number a line can use."
    ],
    []
  ),
  page(
    "line-of-best-fit",
    "regression-models",
    "What does 'line of best fit' mean?",
    "Best fit",
    "The line is the one that makes the vertical misses as small as they can be.",
    [
      "Each point is a person. The vertical gap between the person and the line is the residual, the part the line did not catch. Ordinary least squares picks the line whose squared gaps add up to the smallest total. That is the whole criterion. It is not trying to pass through the most points. It is trying to be least wrong, in a specific way, across all of them.",
    ],
    []
  ),
  page(
    "reading-the-line",
    "regression-models",
    "Interpreting a linear regression",
    "The line",
    "The intercept is a height. The slope is how the outcome changes when the predictor steps by one.",
    [
        "The intercept is the line’s height when the predictor is zero. If zero is not a real value in your study, say so, or center the predictor so zero means 'an average person.' The slope is the change in the outcome for a one-unit step in the predictor: milliseconds per year of age, hours per dose. A slope with no units is hard to interpret. lm(y ~ x) prints both.",
    ],
    []
  ),
  page(
    "nested-data",
    "regression-models",
    "When the rows are nested in people",
    "Multi-level",
    "A model that remembers which trials belong to the same person.",
    [
      "If one row is one trial, the trials from the same person are more alike than trials from different people. A multilevel model, or mixed model, gives each person their own starting point and then estimates the overall pattern. lme4 is how you fit that in RStudio. It does not load in the browser, so the lab under this lesson aggregates to the person first and says so.",
    ],
    [
      "Ignoring the nesting makes the sample look larger than it is and the p-value look more certain than it is. Aggregating to one number per person is the honest simple version. A mixed model is the version that keeps the trials and still remembers the person. Either is better than a t-test on raw trials that pretends every row was a new participant.",
    ]
  ),
  page(
    "multilevel-models",
    "multilevel-unit",
    "What is a multi-level model?",
    "Multi-level",
    "A model that remembers which rows share a person.",
    [
      "When many rows belong to one person, those rows are not independent. A multi-level model gives each person a baseline and estimates the experimental effect with that clustering acknowledged.",
      "If you only have one row per person, you do not have this problem. You have an ordinary regression. The assignment asks you to point at which term is the trial, which is the person, and which is the condition."
    ],
    []
  ),
  page(
    "glm",
    "glms",
    "What is a GLM?",
    "A GLM",
    "The same linear idea, with a rule that keeps the prediction inside the legal range.",
    [
      "A straight line through probabilities will eventually leave 0 and 1. A count cannot be negative. A GLM keeps a straight-line piece, the linear predictor, and then bends it through a link so the prediction stays legal. The link is the new piece. The coefficients are still a height and a tilt, but they are on the link’s scale until you translate them.",
    ],
    [
      "You do not need a new philosophy. You need to notice when the outcome is not a free number. Binary answers, counts, and proportions are the usual reasons a psychologist reaches for glm() instead of lm(). The next page is the binary case.",
    ]
  ),
  page(
    "logistic-regression",
    "glms",
    "What is logistic regression?",
    "Logistic",
    "A curve for a yes-or-no outcome that stays between 0 and 1.",
    [
      "When the outcome is yes or no, the logistic curve is the link that stays inside 0 and 1. glm(correct ~ age, family = binomial) is the call. The coefficient is on the log-odds scale. A positive coefficient means the probability of 'yes' rises as the predictor rises. Report a direction, and if you can, a probability or an odds ratio a reader can picture.",
    ],
    [
      "Do not describe the coefficient as 'the change in the probability.' It is not, until you translate it. The figure in the parent lesson toggles the straight line and the curve so you can see why the line was never going to stay inside the legal range.",
    ]
  ),
  page(
    "anova",
    "variance",
    "What is ANOVA?",
    "ANOVA",
    "A comparison of more than two means.",
    [
      "ANOVA asks whether a set of means differs somewhere. It does not say which pair differs. After a significant ANOVA, the pair comparisons are a separate step.",
      "Two groups is the t-test. Three or more groups, or a design with more than one factor, is where ANOVA is the first test."
    ],
    []
  ),
  page(
    "ancova",
    "variance",
    "What is ANCOVA and how is it different from ANOVA?",
    "ANCOVA",
    "ANOVA plus a measured variable you want to hold steady.",
    [
      "ANCOVA is the group comparison while a numeric covariate, such as age or a pretest, is held in the model. The group effect is then the difference that remains after that covariate.",
      "It is not a cure for a bad design. The covariate has to be something you did not create with the manipulation, or the adjustment answers a question you did not run."
    ],
    []
  ),
  page(
    "what-is-an-assumption",
    "assumptions",
    "What is an assumption?",
    "Assumptions",
    "A condition the test used when it produced the p-value.",
    [
      "Every test computes its p-value under conditions: independent rows, a shape for the residuals, a straight line if you fit a line. Those conditions are the assumptions.",
      "An assumption is not a moral rule about your participants. It is a claim about the noise. The pages after this one are the assumptions psychologists actually have to look at."
    ],
    []
  ),
  page(
    "independence",
    "assumptions",
    "Independence",
    "Independence",
    "The assumption psychology almost never has, and the one that matters most.",
    [
      "Most tests assume the rows are independent: one person’s score does not tell you about the next person’s. Repeated trials, classmates, couples, and clinics all break that. The test will still print a p-value. The p-value is about a sample of unrelated rows you do not have. Independence is the assumption that usually matters more than normality.",
    ],
    []
  ),
  page(
    "normality",
    "assumptions",
    "Normality",
    "Normality",
    "A bell curve is a convenience, and reaction times rarely are one.",
    [
      "A t-test and a linear model are calmer when the noise is roughly bell-shaped, especially in small samples. Reaction times are skewed. A histogram of the residuals, or a QQ plot, is the look. A significant Shapiro test in a huge sample can flag a small departure that does not change the result. In a sample of twelve, the picture matters more than the test of the test.",
    ],
    []
  ),
  page(
    "skew-kurtosis",
    "assumptions",
    "Skew and heavy tails",
    "Shape",
    "A long tail and a too-peaked pile are different problems.",
    [
      "Skew is a lean: a long right tail of slow reaction times. Heavy tails, the kurtosis people mention, means more extreme scores than a bell curve would have. Both change how much you should trust a mean. A median and a picture are often the better description. A mean of a badly skewed column is a number that is not anyone.",
    ],
    []
  ),
  page(
    "when-assumptions-fail",
    "assumptions",
    "When an assumption fails",
    "What to do",
    "Change the summary or the model. Do not hide the picture.",
    [
      "If independence fails, change the unit or the model. If the shape fails, show the picture, consider a transform that matches the measure, or use a method that compares ranks or resamples the data. If a single point is a typo, fix the typo. If it is a real person, the result should survive without them, or you should say it does not.",
    ],
    []
  ),
  page(
    "beyond-significant",
    "effect-size",
    "The sentence after 'significant'",
    "After p",
    "The missing step between a flag and a sentence a reader can use.",
    [
      "A reader needs the size of the thing in the units of the study, and a sense of how unsure that size is. 'People were 80 ms slower' is a size. 'p = .03' is not. Effect size is the family name for that size: a difference, a correlation, a share of variance. Uncertainty is the interval around it.",
    ],
    []
  ),
  page(
    "cohens-d",
    "effect-size",
    "A difference beside the spread",
    "Cohen's d",
    "How the gap between means compares with the scatter of people.",
    [
      "Cohen's d divides the difference between two means by a spread. d of 0.2 is a small shift beside the scatter of people. d of 0.8 is a shift that is large relative to that scatter. Those benchmarks are a rough dialect, not a law. A small d can matter if the outcome is clinical. A large d can be trivial if the task was stacked.",
    ],
    []
  ),
  page(
    "confidence-intervals",
    "effect-size",
    "Confidence intervals",
    "Intervals",
    "The range of effects still compatible with the data.",
    [
      "A 95% interval is a range produced by a procedure that, across repeated samples, would catch the true value most of the time. In the paper in front of you, it is the range of effect sizes the data have not ruled out. If it runs from a trivial slowdown to a large one, you do not yet know which you have. That is the honest reading.",
    ],
    []
  ),
  page(
    "writeup",
    "communicating",
    "Writing up results",
    "Write-up",
    "The sentence is about the behavior. The statistic sits in parentheses.",
    [
      "Weak: 'The t-test was significant (p < .05).' Strong: 'Patients slept 1.6 hours longer on the second drug than on the first (mean difference = 1.58 hours, 95% CI [0.70, 2.46]).'",
      "Lead with what people did, in the units of the study. Put the test, the interval, and the effect size in parentheses. A reader who skips the parentheses should still know the result.",
      "The usual numbers for this sentence come from sleep, a small dataset that ships with R: ten patients and two drugs. The result is a difference in hours of sleep. Quote the hours. The file is not something you collected."
    ],
    []
  ),
  page(
    "figures",
    "communicating",
    "The importance of a good figure",
    "Figures",
    "The figure should show the comparison the sentence claims.",
    [
      "If the sentence is about two means, the figure shows the two distributions or the two means with an interval, not a 3D bar. If the sentence is about a relationship, the figure is the scatter with the line.",
      "Label the units. A figure that only shows stars has not shown the result. The caption can repeat the sentence in shorter form.",
      "For a Stroop comparison, the figure is reaction time in milliseconds by condition. The teaching file is simulated. A reader should be able to tell that from the caption, so they do not cite it as the original experiment."
    ],
    []
  ),
  page(
    "great-visualization-examples",
    "great-figures",
    "What types of visualizations are possible?",
    "Great examples",
    "A strong figure is still one of a few kinds.",
    [
      "The legal pictures have not changed: a distribution, a comparison of groups, a scatter, a count of categories. What changes at this point in the course is the standard. The figure has to be able to carry a result in a paper or a poster.",
      "Choose the kind that matches the sentence you would write, then spend the time on labels, scale, and the raw pattern.",
      "A figure of the sleep result shows the extra hours, not a star. sleep is built into R. The axis is hours, and the comparison is the two drugs on the same people."
    ],
    []
  ),
  page(
    "great-visualization-variable-type",
    "great-figures",
    "Different types of variables get visualized differently",
    "Great types",
    "The column type still decides the mark.",
    [
      "A category is a group or a count. A measurement is a position on an axis that has units. Mixing those up is still the fastest way to make a figure that cannot be read.",
      "Before you open ggplot, write the type of each column you plan to show. If a column is a label stored as 1 and 2, it is still a label.",
      "On the simulated Stroop file, condition is a label even if it was stored as 1 and 2. rt_ms is the measurement, in milliseconds. The picture uses the label as groups and the measurement as the axis."
    ],
    []
  ),
  page(
    "great-ggplot",
    "great-figures",
    "What is ggplot?",
    "ggplot again",
    "The same layered grammar, held to a higher standard.",
    [
      "ggplot2 is still the package: a table, a mapping, and a mark. For a figure you would show someone else, add labels with labs(), keep the scale honest, and do not hide the points behind a bar of means.",
      "The next page is the call. The assignment is one figure you would let a reader see.",
      "In RStudio the simulated Stroop file is ggplot(stroop, aes(condition, rt_ms)) + geom_boxplot() + labs(y = 'Reaction time (ms)'). Say in the caption that the file was made for teaching."
    ],
    []
  ),
  page(
    "great-ggplot-layers",
    "great-figures",
    "How a ggplot is built",
    "ggplot",
    "Data, then the mapping, then the mark.",
    [
      "The data is the table. aes() maps columns onto x, y, and color. geom_point(), geom_boxplot(), or geom_col() is the mark. In RStudio it looks like ggplot(stroop, aes(condition, rt_ms)) + geom_boxplot(). The browser on this site runs base R, so the practice draws with plot() and boxplot() and shows the ggplot version beside it.",
    ],
    []
  ),
  page(
    "publications",
    "outputs",
    "Publications",
    "Papers",
    "A paper is the sentence, the figure, and the parentheses.",
    [
      "A psychology paper reports what people did, in the units of the study, with the estimate and the interval a reader can check. The test is evidence, not the subject of the sentence.",
      "The methods say what a row is, what you excluded, and which model you fit. A reader who was not in the room should be able to tell what you did.",
      "A results paragraph for the sleep data, which ships with R, says how many extra hours patients slept on the second drug, then puts the test in parentheses. It does not begin with the name of the test."
    ],
    []
  ),
  page(
    "posters",
    "outputs",
    "Scientific posters",
    "Posters",
    "A poster is a few sentences and one figure, readable from a step away.",
    [
      "A poster is not a paper pasted onto a board. Lead with the question and the result. One figure should carry the comparison. The statistic can be a small line under the figure.",
      "If someone stops for a minute, they should leave knowing what you found.",
      "A poster of that same sleep result can be the question, one sentence about the extra hours, and one figure. The statistic is a line under the figure."
    ],
    []
  ),
  page(
    "conferences",
    "outputs",
    "Conferences",
    "Talks",
    "A talk is the same result, spoken in order.",
    [
      "Start with the question, then what people did, then the figure, then the sentence you want remembered. A slide of a p-value without the effect is the weak sentence, spoken.",
      "Leave time for the question you cannot answer yet. That is part of the result, not a failure of the talk.",
      "A talk can use the same sleep example: what the two drugs were, the figure of extra hours, and the one sentence you want remembered. sleep is a built-in dataset, which you can say in one clause."
    ],
    []
  ),
  page(
    "open-science-practices",
    "outputs",
    "Open science: Best practices",
    "Open science",
    "The script and the data should be able to travel.",
    [
      "Open science here is a folder: the data, or a clear note about why it cannot be shared, the script, and the packages to load. Someone else should be able to rerun the figure.",
      "A Quarto document or a script with comments is enough. The point is that the analysis is written down, not only clicked.",
      "For the simulated Stroop file, the folder is the csv, the script that reads it, and a note that the rows were generated for teaching. Someone else should be able to rerun the figure from that folder."
    ],
    []
  ),
  page(
    "bayesian",
    "frontiers",
    "Bayesian statistics",
    "Bayesian",
    "A prior, then the data, then a range of plausible values.",
    [
      "A Bayesian analysis starts with a prior, what was reasonable before these data, and updates it. The result is a distribution of plausible values, often summarized by an interval. There is no sharp fail/pass at .05. Psychologists use it when they want to say how much the data moved a belief, or when they want a direct probability statement about a parameter.",
    ],
    []
  ),
  page(
    "computational-models",
    "frontiers",
    "Computational models",
    "Models",
    "A model that generates the behavior, not only a test of a mean.",
    [
      "A computational model writes a small theory as a process: how evidence accumulates, how a belief updates, how a choice is made. The statistics then ask whether that process, with a few parameters per person, produces the data. Tenenbaum-style models and drift-diffusion models are in this family. The mean difference is a summary. The model is a claim about the steps.",
    ],
    []
  ),
  page(
    "encoders",
    "frontiers",
    "Vision and text encoders",
    "Encoders",
    "Turning a picture or a sentence into numbers a model can use.",
    [
      "An encoder is a large model that turns an image, a word, or a sentence into a list of numbers. Researchers then relate those numbers to a brain measure or a judgment. The statistical step after that is often a correlation or a regression of the kind you already know. The new piece is where the predictor came from, not a new definition of a p-value.",
    ],
    []
  ),
  page(
    "nlp",
    "frontiers",
    "Natural language processing",
    "Language",
    "Text becomes numbers, then the statistics you already know.",
    [
      "Natural language processing turns words into counts, categories, or the numeric codes from an encoder. A study might count the emotion words in a diary, or relate a sentence embedding to a rating.",
      "After that conversion, the analysis is often a correlation, a regression, or a comparison of groups. The new step is how the text became a column. The test is not new.",
      "A diary study might count anxiety words and relate that count to a rating. After the words become a column, the analysis is a correlation or a regression you already know. Say how the text became the column."
    ],
    []
  ),
  page(
    "machine-learning",
    "frontiers",
    "Machine learning",
    "Learning",
    "Prediction on held-out people, with the same duty to explain the result.",
    [
      "When a paper classifies depression from speech, or predicts grades from a survey, it is in the prediction business. The honest check is accuracy on people the model did not train on. A high accuracy on the training rows is the line passing through yesterday’s points. Cross-validation and a held-out sample are the usual repairs.",
    ],
    []
  ),
  page(
    "history-of-statistics",
    "reads",
    "Statistics has a complicated history",
    "History",
    "The tools were built by people, in institutions, for particular decisions.",
    [
      "The tests in this course were developed in particular places: agriculture, industry, medicine, and psychology, often tied to decisions about groups of people. Knowing that does not make the mean invalid. It does mean the default procedure is not neutral just because it is old.",
      "When you choose a test, you are also choosing a tradition. You can still ask whether it answers the question you actually have.",
      "The t-test students meet through the sleep data was built for small agricultural and industrial experiments, then carried into psychology. Knowing that history does not change the hours. It does mean the default test is a choice."
    ],
    []
  ),
  page(
    "replication-crisis",
    "reads",
    "Replication crisis",
    "Replication",
    "A surprising result that never appears again was not a finding.",
    [
      "Psychology spent a decade learning that many published 'significant' results did not show up in a new sample. Small samples, flexible analyses, and a file drawer of nulls were part of the reason.",
      "The repair in this course is ordinary: say what you planned to test, report the size of the effect and the interval, and keep the script. A p-value alone was never the result.",
      "A result that appears in one simulated Stroop file and never again was a property of that file. The repair is the same as with a published study: say what you planned to test, report the size in milliseconds, and keep the script."
    ],
    []
  ),
  page(
    "costly-mistakes",
    "reads",
    "Why you should triple-check your code",
    "Mistakes",
    "A wrong column or a flipped sign can become a published sentence.",
    [
      "Famous corrections in psychology and economics started as a spreadsheet error, a miscoded condition, or a script that dropped the wrong rows. The paper was confident because nobody reran the file.",
      "Before you write the sentence, rerun the script from a clean session, check that the number of rows is what you think, and look at the figure. If the result only appears after a step you cannot explain, it is not ready.",
      "A script that averages the word condition, or that swaps congruent and incongruent in the simulated Stroop file, will still print a number. The number is not the result until you have checked which column it came from."
    ],
    []
  ),
];
