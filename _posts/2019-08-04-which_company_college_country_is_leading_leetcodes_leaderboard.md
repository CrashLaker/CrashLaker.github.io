---
layout: post
title: "Which Company/College/Country is leading LeetCode’s leaderboard?"
categories: [Medium]
tags: [datavis, exploratory-analysis, leetcode, seaborn, selenium, python, matplotlib]
comments: true
description: "An exploratory analysis.."
date: "2019-08-04"
---


An exploratory analysis..

![](/assets/img/2Qw5luwv5_1781363bc84ab49eb1a7ca0e33e01961.png)
*Source: https://www.codeclubworld.org/*

For the past two weeks I just got really into this [coding challenge website](https://leetcode.com/) introduced to me by [Joma Tech’s youtube video](https://www.youtube.com/watch?v=uxRf7KS3abo).

In there one can find many coding problems divided into different categories (Algorithms, databases, bash, parallel) that’s also been used by interviewers from the big tech companies which you can see on the image below:

![](/assets/img/2Qw5luwv5_c07eb984e9f206dd08c4d552a593c7c4.png)
*Leetcode’s problemset front page* 

They also have a weekly contest in which the participants have 1:30h to solve 4 really challenging questions. Well not so challenging questions as the top players finish all four of them in about 30minutes of competition. Which let me thinking.. **Who are they? Where are they at? Which Companies? Colleges? Countries?**

So this post is to let you through my journey to get the answers to those questions.

Let’s begin!

So I used **Selenium** to gather the information needed (Location, School and Company) from all the users from the [Global Ranking](https://leetcode.com/contest/globalranking) right after the Weekly Contest #147 finished and used **Python**, **Matplotlib** and **Seaborn** to plot my data.

My findings are as follows. Also all the code as well as the dataset can be found in my [github repo here](https://github.com/CrashLaker/leetcode-etl).

So I’ve gathered data from 49975 users.
```python
users.info()
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 49975 entries, 0 to 49974
Data columns (total 4 columns):
Company     49975 non-null object
Location    49975 non-null object
School      49975 non-null object
name        49975 non-null object
dtypes: object(4)
memory usage: 1.5+ MB
```

The majority of players are from the US followed by China.

![](/assets/img/2Qw5luwv5_3b9b9fe1023c8dd57b4425bcce50f43d.png)


Amazon employees are leading the rank by a few players:

![](/assets/img/2Qw5luwv5_967bdbc2de7c10f82dd15c64ea30cd1e.png)

Also most players from US universities appear on the rank and only one from china (Peking University) amongst them.

![](/assets/img/2Qw5luwv5_1f5af4769d129f5e702528664f863525.png)

Some caveats:
There’s also a need to enhance the data cleansing as some users inputs different names for the same Company like “Thomson Reuters”, “Samsung R&D” and “Cisco Systems” shown below:
```python
users.loc[users["Company"].str.contains('ms', flags=re.IGNORECASE, regex=True)].Company.unique()
array(['Epic Systems', 'Nit Jamshepur', 'Caplin Systems Ltd',
       'Samsung R&D', 'Samsung', 'Samsung R&D Bangalore', 'MSFT',
       'Epic Systems Corp', 'Samsung R&D Institute India - Bangalore',
       'Clemson University', 'Ms', 'samsung', 'C Squared Systems LLC',
       'CURRENTLY INTERN AT SAMSUNG RESEARCH INSTITUTE,NOIDA',
       'Thomsonreuters', 'Adobe Systems India Pvt Ltd.',
       'Thomson Reuters', 'Hughes Network Systems', 'SAMSUNG',
       'Samsung Research Institute', 'Vail Systems', 'Pocket Gems',
       'Gridco Systems', 'Radiant Vision Systems', 'cisco systems',
       'Cisco systems', 'Adobe systems', 'Factset Research Systems',
       'PegaSystems', 'EPAM Systems', 'Institute of the Software Systems',
       'cisco systesms', 'Bristol Farms', 'Adobe Systems',
       'Epam systems inc', 'Epic Systems Corporation',
       'Scalable Systems Research Labs', 'pegasystems', 'Cisco Systems',
       'Epam Systems', 'Cadence Design Systems',
       'Harris Communication Systems', 'Persistent Systems Limited',
       'Samsung;EPAM', 'Cisco Systems Inc.'], dtype=object)
```

That’s all thank you.

## Some references:
* https://www.drawingfromdata.com/how-to-rotate-axis-labels-in-seaborn-and-matplotlib
* https://stackoverflow.com/questions/45946970/displaying-of-values-on-barchart
* https://stackoverflow.com/questions/26540035/rotate-label-text-in-seaborn-factorplot
* https://seaborn.pydata.org/tutorial/color_palettes.html