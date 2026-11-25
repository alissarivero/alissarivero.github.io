export type LessonPage = {
  slug: string;
  parent: string;
  title: string;
  short: string;
  blurb: string;
  overview: string[];
  detailed: string[];
};

const page = (
  slug: string,
  parent: string,
  title: string,
  short: string,
  blurb: string,
  overview: string[],
  detailed: string[]
): LessonPage => ({ slug, parent, title, short, blurb, overview, detailed });

export const LESSON_PAGES: LessonPage[] = [
  page(
    "what-psychologists-ask",
    "introduction",
    "What psychologists are actually asking",
    "The question",
    "Description, explanation, and prediction are different jobs.",
    [
      "Goal: notice which question a study is asking before you look for a number.",
      "A paper can be doing one of three things. It can describe what people did. It can explain why, usually by changing one thing and watching what else changes. Or it can predict what someone will do next. The statistics are different because the questions are different. A mean answers a descriptive question. A test answers whether a difference is about the thing you changed. A model that forecasts a new person answers a prediction question.",
    ],
    [
      "Mixing the three up is how a lab writes a causal sentence under a plot of averages. If the study only watched, the honest sentence is about the pattern, not about the cause. If the study changed one thing and held the rest still, the sentence can be about that change. If the study claims it can forecast behavior, the check is a new person or a new trial, not the same data the story was fit to.",
      "Before any later page, practice naming the question in one clause: we wanted to describe, we wanted to explain, or we wanted to predict.",
    ]
  ),
  page(
    "description",
    "introduction",
    "Description is already statistics",
    "Description",
    "Summarizing what people did is a statistical job.",
    [
      "Goal: treat a careful summary as part of the science, not as a warm-up.",
      "Piaget sat with children and wrote what they actually did. A modern study does the same thing with hundreds of trials. Nobody can hold that list in their head. A mean, a spread, and a picture are how you show the pattern without pretending every child was the average child. Description owes the reader a faithful summary.",
    ],
    [
      "A description fails when it hides the shape. Two groups can share a mean and live in completely different piles. That is why later pages insist on a picture of the raw pattern before a test. The number is a caption for the picture, not a replacement for it.",
      "If you can say what one row is and what a reader should see in the column, you are already doing the descriptive half of the course.",
    ]
  ),
  page(
    "experiments",
    "introduction",
    "What an experiment is for",
    "Experiments",
    "You change one thing so the difference has somewhere to come from.",
    [
      "Goal: see an experiment as a way of giving a difference a cause, not as a fancier description.",
      "You change one thing, hold the rest as still as you can, and look at what the person does. The statistical question is whether that difference is about the change, or about who happened to walk in. The design is the argument. The test is how you keep yourself from being fooled by a noisy sample.",
    ],
    [
      "Holding the rest still is the hard part in psychology. People come with moods, prior trials, and classmates. A within-person comparison, where the same person does both versions, answers a different question than a between-person comparison. Later lessons name those designs. Here, the point is that the design has to exist before the test means anything.",
      "If nothing was changed on purpose, do not borrow the language of an experiment. Say what was observed.",
    ]
  ),
  page(
    "prediction",
    "introduction",
    "Prediction is a third question",
    "Prediction",
    "A model earns its keep on behavior it has not seen yet.",
    [
      "Goal: separate 'this fits the people we already have' from 'this tells us about the next person.'",
      "Josh Tenenbaum’s work asks whether a learner’s next judgment can be forecast from a model of how they update beliefs. The success criterion is the future behavior. A line that passes through yesterday’s points has not yet predicted anything. Prediction is the question you are in when the sentence is about a new child, a new trial, or a new patient.",
    ],
    [
      "Psychology often stops at explanation and calls it prediction. The fix is practical: set aside some of the rows, or collect a new sample, and see whether the story still lands. You will not do that in every assignment. You should know when a paper owed it to you and skipped it.",
    ]
  ),
  page(
    "no-math",
    "introduction",
    "Yes, it is hard, and there is no math track",
    "No math",
    "The hard part is the words, and this course stays with the words.",
    [
      "Goal: know what this course will not ask you to do.",
      "Statistics feels hard because the same word means something casual and something precise. Significant, normal, and effect are the usual traps. This course teaches the precise meaning from a psychologist’s chair. There is no mathematical track. If you can say what a row is and what you would tell a reader, you are doing the thing.",
    ],
    [
      "The software will happily give you a number for a question you did not ask. Your job, from the first dataset on, is to know which question you are in. The rest of the course is that practice: data, then the tests psychologists actually report, then the assumptions those tests quietly require, then the sentence and the figure a paper needs.",
    ]
  ),
  page(
    "why-a-script",
    "why-r",
    "Why a script, not a menu",
    "A script",
    "The analysis should be something you can rerun and hand to someone else.",
    [
      "Goal: see R as a record of what you did to the data.",
      "A script is the analysis written down. A point-and-click history is not. When a reviewer, a classmate, or you in six months asks what happened to the outliers, the script is the answer. Psychologists use R because that record is free, and because new methods often arrive as a package before they arrive in a menu.",
    ],
    [
      "SPSS is still in many departments. Python is common when the work is closer to machine learning. R stays the dialect a lot of psychology papers argue in. Learning it is learning to read those papers, not only to produce a p-value.",
    ]
  ),
  page(
    "objects-and-functions",
    "why-r",
    "Objects and functions",
    "Objects",
    "A name holds a value. A function does one job to what you hand it.",
    [
      "Goal: recognize the two pieces every later line is made of.",
      "An object is a name for a number, a column, or a whole table. You store it with <- . A function does one job, and you hand it the thing inside parentheses: mean(rt). c() gathers numbers. A data frame is the table. dataset$column picks one column out. A factor is a column of categories.",
    ],
    [
      "Comments start with #. They are how you tell your future self what a row means. None of this is statistics yet. It is the grammar the statistics will be written in. If a later page looks dense, it is almost always these same two pieces stacked.",
    ]
  ),
  page(
    "packages",
    "why-r",
    "Packages",
    "Packages",
    "A package is a bundle of functions you install once and load when you need it.",
    [
      "Goal: know the difference between installing a package and loading it.",
      "install.packages() downloads the bundle. You do that once, in the console, not at the top of every script. library() loads it for the session. ggplot2 is the one you will want for figures on your own computer. This site’s browser runs base R, so those exercises do not need a package.",
    ],
    [
      "If library() says there is no package called that, you have not installed it, or you are in a different R than the one you installed it into. A failed download is usually a network pause. Run the install line again. Do not paste install.packages() into a script you rerun every morning.",
    ]
  ),
  page(
    "console-and-script",
    "why-r",
    "The console and the script",
    "Console",
    "The console runs one line. The script is the file you save.",
    [
      "Goal: know which pane you are typing in.",
      "The console is the conversation: you type a line, R answers, the line is gone. A script is the document. In RStudio the script sits above the console. You run a line from the script and the answer still appears below. Save the script. The console’s history is not the analysis.",
    ],
    [
      "A common first mistake is to do the real work in the console and then be unable to reproduce it. If it mattered, it belongs in the script, with a comment that says why. The browser exercises on this site are a script box for the same reason.",
    ]
  ),
  page(
    "working-directory",
    "why-r",
    "The working directory",
    "Your files",
    "R looks in one folder. Your CSV has to be in that folder.",
    [
      "Goal: make read.csv find the file on purpose.",
      "The working directory is the folder R is looking at. In RStudio, once the script is saved, use Session, then Set Working Directory, then To Source File Location. Put the data file in that same folder. getwd() tells you where R thinks it is. setwd() moves it, and is the line most likely to break on someone else’s computer, so prefer the menu once per project.",
    ],
    [
      "When a script works in the browser and fails on your machine, the usual cause is this folder, or a package you have not loaded. It is not a different language. The setup assignment under this lesson is the checklist for that gap.",
    ]
  ),
  page(
    "one-row",
    "understanding-data",
    "One row is one what?",
    "One row",
    "A trial and a person can live in the same spreadsheet and be different datasets.",
    [
      "Goal: say, out loud, what a single row represents before you summarize anything.",
      "In a Stroop study, one row might be one trial: this person, this condition, this reaction time. Or one row might be one person, already averaged. Those are different datasets even when the columns look similar. Averaging trials into people changes what a later test is about. Ask it before you call mean().",
    ],
    [
      "If each person contributes many trials, the trials are not independent observations of different people. That fact comes back in the assumptions lesson and in multilevel models. For now, write the sentence at the top of the script: one row is one trial, or one row is one person.",
    ]
  ),
  page(
    "variable-types",
    "understanding-data",
    "What kind of column is this?",
    "Column types",
    "You may average a duration. You may not average a label.",
    [
      "Goal: match each column to the kind of thing it measures.",
      "condition is a name: congruent or incongruent. rt_ms is a duration. errors is a count. age is a number you did not assign. Names and unordered groups are categorical. Durations, ratings, and counts are numeric, and they are not interchangeable just because they are stored as numbers. A 1 and a 2 that mean 'group A' and 'group B' are still labels.",
    ],
    [
      "In R, a factor is how you mark a column as categories so a model does not treat the codes as amounts. stringsAsFactors will not save you if you never looked. Read the codebook, or the first few rows, and decide. The decision is about the study, not about the file format.",
    ]
  ),
  page(
    "describing-a-column",
    "understanding-data",
    "Describing one column",
    "Descriptives",
    "Center, spread, and the awkward rows.",
    [
      "Goal: report a center and a spread that match the shape of the column.",
      "mean() and sd() describe a pile that is roughly balanced. median() and the interquartile range describe a pile with a long tail, which reaction times usually have. min(), max(), and a quick histogram tell you whether someone typed 99999. Describe the column you have, not the column a textbook drew.",
    ],
    [
      "A single number with no spread is an advertisement. 'The mean reaction time was 640 ms' does not say whether people agreed. Pair it with a spread, and look at the picture. The assignment under this lesson asks you to do that in R.",
    ]
  ),
  page(
    "which-plot",
    "understanding-data",
    "Which plot is legal",
    "Which plot",
    "The picture has to match the kind of column.",
    [
      "Goal: pick the picture from the variables, not from what looks impressive.",
      "One continuous column wants a distribution: a histogram or a box. Groups compared on a number want a boxplot or the points themselves, not only a bar of means. Two numbers want a scatter. Categories want counts. A bar of means hides the very spread a psychologist should be looking at.",
    ],
    [
      "The gallery in the parent lesson is this rule as a picture. Label the units. Let the reader see the pattern of the raw data. If a point is a person, do not draw a bar that implies the person was the mean.",
    ]
  ),
  page(
    "ggplot-layers",
    "understanding-data",
    "How a ggplot is built",
    "ggplot",
    "Data, then the mapping, then the mark.",
    [
      "Goal: read a ggplot call as three layers, even though the browser exercises use base R.",
      "The data is the table. aes() maps columns onto x, y, and color. geom_point(), geom_boxplot(), or geom_col() is the mark. In RStudio it looks like ggplot(stroop, aes(condition, rt_ms)) + geom_boxplot(). The browser on this site runs base R, so the practice draws with plot() and boxplot() and shows the ggplot version beside it.",
    ],
    [
      "Best practice is dull and worth it: name the units in the labels, do not add a theme that fights the data, and do not use a bar of means when the points would show the shape. If the ggplot fails on this website, that is the browser, not you. The same call belongs in the RStudio from the setup assignment.",
    ]
  ),
  page(
    "significance",
    "analyzing-data",
    "What 'significant' is allowed to mean",
    "Significance",
    "A small p-value is a comment about the sample, not a stamp that the effect matters.",
    [
      "Goal: say what a test is deciding, in a sentence without the word significant.",
      "A test asks how surprising the result would be if there were truly no difference, or no relationship, of the kind you specified. A small p-value means the data are awkward for that dull story. It does not mean the effect is large, and it does not mean you have found the cause. Psychologists report it because it is a shared threshold, and then they still owe the reader the size of the difference.",
    ],
    [
      "You will see p < .05 treated as a verdict. In this course it is a flag that you should look harder at the estimate and the design, not a place to stop the sentence. The effect-size lesson is that next step. Do not skip to it by writing 'significant' and going home.",
    ]
  ),
  page(
    "reading-a-t-test",
    "analyzing-data",
    "Reading a t-test",
    "A t-test",
    "Two means, and whether the gap is large beside the spread.",
    [
      "Goal: read a t-test as a comparison of averages, not as a ritual.",
      "A t-test compares two means. Paired, or one-sample against a known value, uses the same people twice. Two-sample uses different people. The output gives the means, the t statistic, the degrees of freedom, and a p-value. The thing you wanted was the difference in the original units: hours of sleep, milliseconds, points on a scale. The t is how that gap compares with the noise.",
    ],
    [
      "In the sleep data that ships with R, the same patients take two drugs. That is paired. t.test(extra ~ group, paired = TRUE) is the call. The sentence names the drugs and the hours, then puts the statistic in parentheses. The lab under this lesson makes you produce that sentence from the output, not from memory of the word significant.",
    ]
  ),
  page(
    "reading-a-correlation",
    "analyzing-data",
    "Reading a correlation",
    "Correlation",
    "Two numbers that move together, and how tightly.",
    [
      "Goal: describe a relationship without turning it into a cause.",
      "A correlation, r, is how tightly two numeric columns move together, from -1 to 1. Zero is no straight-line relationship. The sign is the direction. The size is the tightness, and a tight relationship can still be small in the units that matter. cor.test() adds a p-value for the dull story that the true correlation is zero.",
    ],
    [
      "A scatter is required. A correlation will happily summarize a curve, a fan shape, or one weird point as if it were a line. Look first. And do not write that one variable produced the other. The study has to have changed something for that sentence. A correlation is the hug of the cloud, which the figure in the parent lesson lets you drag.",
    ]
  ),
  page(
    "anova-ancova",
    "analyzing-data",
    "ANOVA and ANCOVA",
    "ANOVA",
    "More than two groups, and a numeric nuisance you want to hold still.",
    [
      "Goal: know when a t-test is the wrong comparison because there are three or more means.",
      "ANOVA asks whether the group means differ more than the spread inside the groups would suggest. It does not tell you which group differs from which. That is a follow-up comparison, decided before you go fishing. ANCOVA is the same idea with an extra numeric column held constant, such as age, so the group difference is not just 'the older people were in one condition.'",
    ],
    [
      "aov(rt_ms ~ condition, data = stroop) is the shape of the call. The summary is an F, degrees of freedom, and a p-value. The means themselves are still what you report. If you only have two groups, the t-test and the ANOVA are the same comparison. Use the one you can explain.",
    ]
  ),
  page(
    "picking-a-test",
    "analyzing-data",
    "Picking a test",
    "Which test",
    "The outcome and the design choose, not the menu you opened first.",
    [
      "Goal: walk from the variables to a test without memorizing a poster.",
      "Start with the outcome. A number leads toward t, ANOVA, correlation, or regression. Two categories lead toward a proportion or a logistic model. Then the design: one group or two, the same people or different people, one predictor or several. The walker in the parent lesson does this in order. Use it until the order is boring.",
    ],
    [
      "A test you cannot explain is the wrong test, even if the software ran it. The name in the paper should be a name you can unpack: we compared two means from the same people, we asked whether three group means differed, we asked whether two numbers moved together.",
    ]
  ),
  page(
    "best-fit",
    "regression-models",
    "The line that shrinks the gaps",
    "Best fit",
    "The line is the one that makes the vertical misses as small as they can be.",
    [
      "Goal: see a regression line as a summary of misses, not as a decoration.",
      "Each point is a person. The vertical gap between the person and the line is the residual, the part the line did not catch. Ordinary least squares picks the line whose squared gaps add up to the smallest total. That is the whole criterion. It is not trying to pass through the most points. It is trying to be least wrong, in a specific way, across all of them.",
    ],
    [
      "The hero on the home page is this picture in motion. The figure in the parent lesson lets you drag the line and watch the sum of squares. If a point sits far above the line, the model missed that person. The miss is information, not a nuisance to delete on sight.",
    ]
  ),
  page(
    "reading-the-line",
    "regression-models",
    "Intercept and slope, in the units",
    "The line",
    "The intercept is a height. The slope is how the outcome changes when the predictor steps by one.",
    [
      "Goal: translate the two coefficients back onto the line you just fit.",
      "The intercept is the line’s height when the predictor is zero. If zero is not a real value in your study, say so, or center the predictor so zero means 'an average person.' The slope is the change in the outcome for a one-unit step in the predictor: milliseconds per year of age, hours per dose. lm(y ~ x) prints both.",
    ],
    [
      "A slope with no units is a slogan. 'The coefficient was 0.4' does not tell a reader whether that is a lot of reaction time. Multiply it back into the thing you measured. The same figure that showed the fit can show the intercept as a dot on the axis and the slope as the tilt.",
    ]
  ),
  page(
    "what-a-glm-is",
    "regression-models",
    "What a GLM changes",
    "A GLM",
    "The same linear idea, with a rule that keeps the prediction inside the legal range.",
    [
      "Goal: see a generalized linear model as a regression that refuses to predict impossible values.",
      "A straight line through probabilities will eventually leave 0 and 1. A count cannot be negative. A GLM keeps a straight-line piece, the linear predictor, and then bends it through a link so the prediction stays legal. The link is the new piece. The coefficients are still a height and a tilt, but they are on the link’s scale until you translate them.",
    ],
    [
      "You do not need a new philosophy. You need to notice when the outcome is not a free number. Binary answers, counts, and proportions are the usual reasons a psychologist reaches for glm() instead of lm(). The next page is the binary case.",
    ]
  ),
  page(
    "logistic",
    "regression-models",
    "Logistic regression",
    "Logistic",
    "A curve for a yes-or-no outcome that stays between 0 and 1.",
    [
      "Goal: read a logistic model as a probability, not as a mysterious coefficient.",
      "When the outcome is yes or no, the logistic curve is the link that stays inside 0 and 1. glm(correct ~ age, family = binomial) is the call. The coefficient is on the log-odds scale. A positive coefficient means the probability of 'yes' rises as the predictor rises. Report a direction, and if you can, a probability or an odds ratio a reader can picture.",
    ],
    [
      "Do not describe the coefficient as 'the change in the probability.' It is not, until you translate it. The figure in the parent lesson toggles the straight line and the curve so you can see why the line was never going to stay inside the legal range.",
    ]
  ),
  page(
    "multilevel",
    "regression-models",
    "When the rows are nested in people",
    "Multi-level",
    "A model that remembers which trials belong to the same person.",
    [
      "Goal: stop pretending that thirty trials from one person are thirty people.",
      "If one row is one trial, the trials from the same person are more alike than trials from different people. A multilevel model, or mixed model, gives each person their own starting point and then estimates the overall pattern. lme4 is how you fit that in RStudio. It does not load in the browser, so the lab under this lesson aggregates to the person first and says so.",
    ],
    [
      "Ignoring the nesting makes the sample look larger than it is and the p-value look more certain than it is. Aggregating to one number per person is the honest simple version. A mixed model is the version that keeps the trials and still remembers the person. Either is better than a t-test on raw trials that pretends every row was a new participant.",
    ]
  ),
  page(
    "independence",
    "assumptions",
    "Independence",
    "Independence",
    "The assumption psychology almost never has, and the one that matters most.",
    [
      "Goal: notice when the rows are not separate stories.",
      "Most tests assume the rows are independent: one person’s score does not tell you about the next person’s. Repeated trials, classmates, couples, and clinics all break that. The test will still print a p-value. The p-value is about a sample of unrelated rows you do not have. This is the assumption to lose sleep over. Normality is the one people worry about instead.",
    ],
    [
      "The fix is design and model, not a transformation. Aggregate to the independent unit, use a paired test when the same person did both conditions, or use a multilevel model. Say which you did. 'We assumed independence' is not a sentence if the spreadsheet shows twenty rows per person.",
    ]
  ),
  page(
    "normality",
    "assumptions",
    "Normality",
    "Normality",
    "A bell curve is a convenience, and reaction times rarely are one.",
    [
      "Goal: check the shape of the thing the test actually assumes, which is often the residuals, not the raw column.",
      "A t-test and a linear model are calmer when the noise is roughly bell-shaped, especially in small samples. Reaction times are skewed. A histogram of the residuals, or a QQ plot, is the look. A significant Shapiro test in a huge sample is a fuss about a wiggle that does not matter. In a sample of twelve, the picture matters more than the test of the test.",
    ],
    [
      "A log of reaction time is a common, honest rescale because it matches how those times stretch. Do not log a column to chase a p-value. If the picture is stubborn, say so, and prefer a method that does not need the bell curve, or show the picture beside the test so the reader can judge.",
    ]
  ),
  page(
    "skew-kurtosis",
    "assumptions",
    "Skew and heavy tails",
    "Shape",
    "A long tail and a too-peaked pile are different problems.",
    [
      "Goal: name the shape you see, instead of saying the data are 'not normal.'",
      "Skew is a lean: a long right tail of slow reaction times. Heavy tails, the kurtosis people mention, means more extreme scores than a bell curve would have. Both change how much you should trust a mean. A median and a picture are often the better description. A mean of a badly skewed column is a number that is not anyone.",
    ],
    [
      "You do not need the formula. You need the habit of looking. hist() and boxplot() are enough to see a lean and a point sitting alone. One extreme person can tilt a correlation or a slope. Decide, in the open, whether that person is a typo or a real participant, and write the decision down.",
    ]
  ),
  page(
    "when-assumptions-fail",
    "assumptions",
    "When an assumption fails",
    "What to do",
    "Change the summary or the model. Do not hide the picture.",
    [
      "Goal: have a next step that is not 'run it anyway and hope.'",
      "If independence fails, change the unit or the model. If the shape fails, show the picture, consider a transform that matches the measure, or use a method that compares ranks or resamples the data. If a single point is a typo, fix the typo. If it is a real person, the result should survive without them, or you should say it does not.",
    ],
    [
      "Report what you checked. A sentence like 'residuals were right-skewed, so we also report the median difference' is more useful than a silent extra analysis. The reader is a psychologist. They have seen messy reaction times before.",
    ]
  ),
  page(
    "beyond-significant",
    "effect-size",
    "The sentence after 'significant'",
    "After p",
    "The missing step between a flag and a sentence a reader can use.",
    [
      "Goal: refuse to stop at the p-value.",
      "A reader needs the size of the thing in the units of the study, and a sense of how unsure that size is. 'People were 80 ms slower' is a size. 'p = .03' is not. Effect size is the family name for that size: a difference, a correlation, a share of variance. Uncertainty is the interval around it.",
    ],
    [
      "A large study can make a trivial difference 'significant.' A small study can miss a difference you would care about. Both are reasons the p-value cannot be the whole result. The next pages are the two translations psychologists use most: a standardized difference, and an interval.",
    ]
  ),
  page(
    "cohens-d",
    "effect-size",
    "A difference beside the spread",
    "Cohen's d",
    "How the gap between means compares with the scatter of people.",
    [
      "Goal: read d as 'the mean gap, in units of the spread,' not as a grade.",
      "Cohen's d divides the difference between two means by a spread. d of 0.2 is a small shift beside the scatter of people. d of 0.8 is a shift that is large relative to that scatter. Those benchmarks are a rough dialect, not a law. A small d can matter if the outcome is clinical. A large d can be trivial if the task was stacked.",
    ],
    [
      "Always keep the raw difference too. '1.6 hours, d = 0.7' tells a sleep researcher more than d alone. For a correlation, r is already an effect size. For regression, the slope in the outcome’s units is the effect a psychologist should lead with. Standardized versions are the translation, not the result.",
    ]
  ),
  page(
    "intervals",
    "effect-size",
    "Intervals",
    "Intervals",
    "The range of effects still compatible with the data.",
    [
      "Goal: read a confidence interval as a set of plausible sizes, not as a test in disguise.",
      "A 95% interval is a range produced by a procedure that, across repeated samples, would catch the true value most of the time. In the paper in front of you, it is the range of effect sizes the data have not ruled out. If it runs from a trivial slowdown to a large one, you do not yet know which you have. That is the honest reading.",
    ],
    [
      "An interval that excludes zero is the same news as a p-value under .05, roughly. The extra news is the width. Report the interval in the units of the outcome. The figure in the communicating lesson draws it as ticks around the means so a reader can see the uncertainty without decoding brackets.",
    ]
  ),
  page(
    "the-sentence",
    "communicating",
    "The sentence is about the behavior",
    "The sentence",
    "Lead with what people did. The statistic waits.",
    [
      "Goal: write the result as a claim about the measure, in words a psychologist outside your lab can picture.",
      "Weak: 'The t-test was significant (p < .05).' Strong: 'Patients slept 1.6 hours longer on the second drug than on the first.' The first sentence is about the software. The second is about the study. Every result in this course should be able to survive that swap.",
    ],
    [
      "Name both sides of the comparison and the direction. 'There was an effect of condition' does not say who was faster. If the interval is wide, the sentence should admit the uncertainty instead of picking the exciting end of it.",
    ]
  ),
  page(
    "parentheses",
    "communicating",
    "What goes in the parentheses",
    "Parentheses",
    "The statistic supports the sentence. It does not replace it.",
    [
      "Goal: put the test, the estimate, and the interval where a reader expects them.",
      "The APA habit is the behavior first, then the statistic in parentheses. A t-test looks like t(11) = 4.06, p = .002, and beside it the mean difference and the interval. A correlation looks like r(18) = .42, p = .06. A regression slope is reported in the outcome’s units, with its interval or its standard error. Match the symbol to the test you actually ran.",
    ],
    [
      "Do not stack every number the software printed. The reader needs the estimate, the test that goes with it, and enough to see the uncertainty. Extra sums of squares belong in a table if a reviewer wants them, not in the sentence that carries the result.",
    ]
  ),
  page(
    "the-figure",
    "communicating",
    "The figure carries the comparison",
    "The figure",
    "A reader should see the result before they read the parentheses.",
    [
      "Goal: make one figure that shows the comparison the sentence just made.",
      "If the sentence is about two means, the figure shows the two distributions or the two means with the interval, not a 3D bar. If the sentence is about a relationship, the figure is the scatter with the line. Label the units. The caption can repeat the sentence in shorter form. A figure that only shows stars has not shown the result.",
    ],
    [
      "The gallery and the publication-sentence figure in this lesson are the standard. Means as points, intervals as ticks, raw pattern visible when the sample is small enough to draw. Polish is not decoration. Polish is removing everything that is not the comparison.",
    ]
  ),
  page(
    "bayesian-in-practice",
    "frontiers",
    "Bayesian work, in practice",
    "Bayesian",
    "A prior, then the data, then a range of plausible values.",
    [
      "Goal: recognize a Bayesian result as an updated belief, not as a p-value with different letters.",
      "A Bayesian analysis starts with a prior, what was reasonable before these data, and updates it. The result is a distribution of plausible values, often summarized by an interval. There is no sharp fail/pass at .05. Psychologists use it when they want to say how much the data moved a belief, or when they want a direct probability statement about a parameter.",
    ],
    [
      "You are not asked to master the sampling algorithms. You are asked to read the sentence: the prior was skeptical, the data pulled the estimate to 80 ms, and the interval still includes small effects. The lab under this lesson is a guided reading of that kind of output, in base R, without a Bayesian package.",
    ]
  ),
  page(
    "computational-models",
    "frontiers",
    "Computational models",
    "Models",
    "A model that generates the behavior, not only a test of a mean.",
    [
      "Goal: see the difference between testing a mean and specifying how a person produced the trial.",
      "A computational model writes a small theory as a process: how evidence accumulates, how a belief updates, how a choice is made. The statistics then ask whether that process, with a few parameters per person, produces the data. Tenenbaum-style models and drift-diffusion models are in this family. The mean difference is a summary. The model is a claim about the steps.",
    ],
    [
      "This course will not fit those models. It will keep you from being impressed by the vocabulary alone. Ask what the parameters mean in the task, what a wrong model would have predicted, and whether the fit was checked on data it did not see. Those are the same questions as the rest of the course.",
    ]
  ),
  page(
    "encoders",
    "frontiers",
    "Vision and text encoders",
    "Encoders",
    "Turning a picture or a sentence into numbers a model can use.",
    [
      "Goal: know what people mean when a psychology paper says it used an encoder.",
      "An encoder is a large model that turns an image, a word, or a sentence into a list of numbers. Researchers then relate those numbers to a brain measure or a judgment. The statistical step after that is often a correlation or a regression of the kind you already know. The new piece is where the predictor came from, not a new definition of a p-value.",
    ],
    [
      "The risk is treating the encoder as a neutral ruler. It was trained on someone else’s data, with someone else’s labels. If the paper claims the encoder 'sees' like a person, ask what behavior was actually compared. The numbers are a tool. The claim is still about people.",
    ]
  ),
  page(
    "machine-learning",
    "frontiers",
    "Machine learning in a psychology paper",
    "Learning",
    "Prediction on held-out people, with the same duty to explain the result.",
    [
      "Goal: read a machine-learning result as a prediction question with a stricter check.",
      "When a paper classifies depression from speech, or predicts grades from a survey, it is in the prediction business. The honest check is accuracy on people the model did not train on. A high accuracy on the training rows is the line passing through yesterday’s points. Cross-validation and a held-out sample are the usual repairs.",
    ],
    [
      "Accuracy is not an explanation. A model can predict a behavior from a proxy for something unfair or irrelevant. Ask what was predicted, in what units, on whom, and what a simple baseline, such as the mean or the majority class, already achieved. If the fancy model barely beats the mean, the sentence should say that.",
    ]
  ),
];
