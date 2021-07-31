# A Hierarchical Genetic Algorithm for the Travelling Salesman Problem
 by
 
 J. Paul Abrams
 
 Student No. 214937
 
 95.495 Honours Project
 
 Winter 2003
 
 Carleton University
 
 School of Computer Science
 
 Supervisor: Dr. Franz Oppacher
 

* * *

## ACKNOWLEDGEMENTS

My Mother, Father and Sister. From Carleton University administration: Lisa Ralph, Judith Srna, Michele Morrison. Carleton University professors: Tony White, Franz Oppacher, Douglas Howe.

## ABSTRACT

This work uses a hierarchical approach in an attempt to optimize a set of parameters for a genetic algorithm for the traveling salesman problem using path representation. It defines a ‘meta-chromosome’ made up of seven genes encoding the following parameters, in order of occurrence on the chromosome: 
- Replacement scheme (single-offspring replacement, double-offspring replacement or simple heuristic single-offspring replacement); 
- elitism rate (varying from 0-100 percent in one percent increments); 
- mutation type (exchange, insertion, simple inversion, displacement or inversion); 
- probability of mutation (varying in the same manner as with elitism rate); 
- crossover method (partially-mapped, cycle, order, edge-recombination or maximal preservative); 
- probability of crossover (varying as with mutation rate); 
- selection method (tournament-5, roulette-wheel, uniform random or rank). 

Results show definite preferences for rank selection and heuristic replacement over their respective alternatives, but other results are largely inconclusive, probably due to similarity in operator efficiency among the mutation and crossover operators used. The work at least provides some evidence that meta-GAs can be an effective strategy to provide insight towards optimal parameter sets for other GAs.

## CONTENTS

  * [ACKNOWLEDGEMENTS](#acknowledgements)
  * [ABSTRACT](#abstract)
  * [CONTENTS](#contents)
  * [LIST OF FIGURES](#list-of-figures)
  * [LIST OF TABLES](#list-of-tables)
  * [PREFACE](#preface)
  * [CHAPTER 1: INTRODUCTION](#chapter-1--introduction)
    + [1.1 Motivation](#11-motivation)
    + [1.2 Goal](#12-goal)
    + [1.3 Organization](#13-organization)
  * [CHAPTER 2: BACKGROUND](#chapter-2--background)
    + [2.1 The Travelling Salesman Problem](#21-the-travelling-salesman-problem)
    + [2.2 Genetic algorithms](#22-genetic-algorithms)
      - [2.2.1 Population](#221-population)
      - [2.2.2 Fitness](#222-fitness)
      - [2.2.3 Selection](#223-selection)
      - [2.2.4 Crossover and mutation](#224-crossover-and-mutation)
      - [2.2.5 Generating the new population](#225-generating-the-new-population)
      - [2.2.6 The Fitness Landscape](#226-the-fitness-landscape)
    + [2.3 Methods of optimizing parameters for genetic algorithms](#23-methods-of-optimizing-parameters-for-genetic-algorithms)
      - [2.3.1 Hierarchical genetic algorithms](#231-hierarchical-genetic-algorithms)
      - [2.3.2 Coevolution](#232-coevolution)
  * [CHAPTER 3: IMPLEMENTATION](#chapter-3--implementation)
    + [3.1 Description of implemented TSP operators](#31-description-of-implemented-tsp-operators)
      - [3.1.1 Mutation operators on path representation](#311-mutation-operators-on-path-representation)
        * [3.1.1.1 Exchange mutation (EM)](#3111-exchange-mutation--em-)
        * [3.1.1.2 Insertion mutation (ISM)](#3112-insertion-mutation--ism-)
        * [3.1.1.3 Simple inversion mutation (SIM)](#3113-simple-inversion-mutation--sim-)
        * [3.1.1.4 Displacement mutation (DM)](#3114-displacement-mutation--dm-)
        * [3.1.1.5 Inversion mutation (IVM)](#3115-inversion-mutation--ivm-)
      - [3.1.2 Crossover operators on path representation](#312-crossover-operators-on-path-representation)
        * [3.1.2.1 Partially mapped crossover (PMX)](#3121-partially-mapped-crossover--pmx-)
        * [3.1.2.2 Cycle crossover (CX)](#3122-cycle-crossover--cx-)
        * [3.1.2.3 Order crossover (OX)](#3123-order-crossover--ox-)
        * [3.1.2.4 Edge recombination crossover (ERX)](#3124-edge-recombination-crossover--erx-)
        * [3.1.2.5 Maximal preservative crossover (MPX)](#3125-maximal-preservative-crossover--mpx-)
      - [3.1.4 Methods of selection and replacement](#314-methods-of-selection-and-replacement)
        * [3.1.4.1 Roulette wheel selection (RWS)](#3141-roulette-wheel-selection--rws-)
        * [3.1.4.2 Rank selection (RS)](#3142-rank-selection--rs-)
        * [3.1.4.3 Tournament-5 selection (T5S)](#3143-tournament-5-selection--t5s-)
        * [3.1.4.4 Replacement schemes (S1R, S2R, H1R)](#3144-replacement-schemes--s1r--s2r--h1r-)
    + [3.2 The MetaGA4TSP system](#32-the-metaga4tsp-system)
      - [3.2.1 Meta-evolution](#321-meta-evolution)
      - [3.2.2 The meta-GA chromosome](#322-the-meta-ga-chromosome)
        * [3.2.2.1 Meta-GA chromosome fitness](#3221-meta-ga-chromosome-fitness)
        * [3.2.2.2 Meta-GA crossover](#3222-meta-ga-crossover)
        * [3.2.2.2 Meta-GA mutation](#3222-meta-ga-mutation)
    + [3.3 The TSP GA](#33-the-tsp-ga)
  * [CHAPTER4: TESTING AND RESULTS](#chapter4--testing-and-results)
    + [4.1 Test plan](#41-test-plan)
      - [4.1.1 TSP test instances](#411-tsp-test-instances)
      - [4.1.2 Test parameters](#412-test-parameters)
      - [4.1.3 Test runs](#413-test-runs)
    + [4.2 Results](#42-results)
      - [4.2.1 Average and best fitnesses of meta-GA chromosomes by generation](#421-average-and-best-fitnesses-of-meta-ga-chromosomes-by-generation)
      - [4.2.2 Best meta-GA chromosomes found in each iteration of each test.](#422-best-meta-ga-chromosomes-found-in-each-iteration-of-each-test)
        * [Test 1](#test-1)
        * [Test 2](#test-2)
        * [Test 3](#test-3)
        * [Test 4](#test-4)
        * [Test 5](#test-5)
        * [Test 6](#test-6)
        * [Test 7](#test-7)
        * [Test 8](#test-8)
  * [CHAPTER 5: CONCLUSION](#chapter-5--conclusion)
    + [5.1 Problems encountered and potential solutions](#51-problems-encountered-and-potential-solutions)
    + [5.2 Opportunity for future work](#52-opportunity-for-future-work)
  * [REFERENCES](#references)
  * [APPENDIX A: ADDITIONAL TEST DATA](#appendix-a--additional-test-data)
  * [APPENDIX B: JAVA IMPLEMENTATION](#appendix-b--java-implementation)
    + [Java classes](#java-classes)
  * [APPENDIX C: THE SOFTWARE](#appendix-c--the-software)
    + [Installation](#installation)
    + [Execution](#execution)
  * [GLOSSARY](#glossary)
  * [End Notes (Formerly footnotes)](#end-notes--formerly-footnotes-)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>



## LIST OF FIGURES

**Figure 1:** All twelve unique tours on a TSP of size n=5 in graphical and path representations. 17

**Figure 2:** A basic genetic algorithm in high-level pseudocode. 19

**Figure 3:** Demonstration of a simple single-point crossover on arbitrary chromosomes of length 6 with crossover point 2. 21

**Figure 4:** Classic mutation at locus 1 on an arbitrary 8-bit chromosome. 22

**Figure 5:** Output from two random demonstrations of exchange mutation on tours of size 6 from the MetaGA4TSP implementation. 28

**Figure 6:** Output from two random demonstrations of insertion mutation from the MetaGA4TSP implementation on tours of size 6. 28

**Figure 7:** Output from two random demonstrations of simple inversion mutation from the MetaGA4TSP implementation on tours of size 6. 29

**Figure 8:** Output from two random demonstrations of displacement mutation from the MetaGA4TSP implementation on tours of size 6. 29

**Figure 9:** Output from two random demonstrations of inversion mutation from the MetaGA4TSP implementation on tours of size 6. 30

**Figure 10:** Partially-Mapped crossover as performed by the MetaGA4TSP demonstration on randomly generated parents on a) tours of size 6 and b) tours of size 12. 31

**Figure 11:** Cycle crossover as performed by the MetaGA4TSP demonstration program on randomly generated parent tours of size 6. 32

**Figure 12:** Output from the MetaGA4TSP Order crossover demonstration routine on randomly generated parents of a) size 6 and b) size 12. 33

**Figure 13:** Output from the MetaGA4TSP Order crossover demonstration routine on randomly generated parents of size 12. 34

**Figure 14:** Output from the MetaGA4TSP maximal-preservative crossover demonstration routine on randomly generated parents of size 12. 35

**Figure 15:** High-level pseudocode for the genetic algorithm implemented in java package abramsJPaul.metaGA4tsp. 40

**Figure 16:** The MetaGA4TSP chromosome. 40

**Figure 17:** Simplified java code for the method `abramsJPaul.metaGA4tsp.Chromosome.setFitness(double distance, int gens)` 42

**Figure 18:** Graphical output from `abramsJPaul.metaGA4tsp.Demo.tsp()` for (a) a local optimum for berlin52 and (b) one of eight (graphically unique) optimal tours for `dbl\_circ\_52`. 44

**Figure 19:** Graphical output for the best tour found in the 2nd generation of meta-evolution during a MetaGA4TSP session using the TSP instance `ch150.tsp`. 45

**Figure 20:** (a) Average and (b) best fitnesses for each generation of each of five iterations of test 1. 49

**Figure 21:** (a) Average and (b) best fitnesses for each generation of each of five iterations of test 2. 49

**Figure 22:** (a) Average and (b) best fitnesses for each generation of each of three iterations of test 3. 50

**Figure 23:** (a) Average and (b) best fitnesses for each generation of each of three iterations of test 4. The fitness scale for (a) ranges from 0 to 100 percent while the fitness scale for (b) ranges from 84 to 102 percent. 50

**Figure 24:** Average and best fitnesses for the single iteration of test 5. 51

**Figure 25:** Command line parameters for `abramsJPaul.metaGA4tsp.Main`. 79

## LIST OF TABLES

**Table 1:** Best chromosome found in the final generation of each iteration of test 1. 52

**Table 2:** Best chromosome found in the final generation of each iteration of test 2. 52

**Table 3:** Best chromosome found in the final generation of each iteration of test 3. 53

**Table 4:** Best chromosome found in the final generation of each iteration of test 4. 53

**Table 5:** Best chromosome found in the final generation of each iteration of test 6. 54

**Table 6:** Best chromosome found in the final generation of each iteration of test 7. 55

**Table 7:** Best chromosome found in the final generation of each iteration of test 8. 56

**Table 8:** Best chromosome found in each generation of test 1, iteration 1 of 5. 64

**Table 9:** Best chromosome found in each generation of test 1, iteration 2 of 5. 64

**Table 10:** Best chromosome found in each generation of test 1, iteration 3 of 5. 65

**Table 11:** Best chromosome found in each generation of test 1, iteration 4 of 5. 65

**Table 12:** Best chromosome found in each generation of test 1, iteration 5 of 5. 66

**Table 13:** Best chromosome found in each generation of test 2, iteration 1 of 5. 66

**Table 14:** Best chromosome found in each generation of test 2, iteration 2 of 5. 67

**Table 15:** Best chromosome found in each generation of test 2, iteration 3 of 5. 67

**Table 16:** Best chromosome found in each generation of test 2, iteration 4 of 5. 68

**Table 17:** Best chromosome found in each generation of test 2, iteration 5 of 5. 68

**Table 18:** Best chromosome found in each generation of test 3, iteration 1 of 3. 69

**Table 19:** Best chromosome found in each generation of test 3, iteration 2 of 3. 70

**Table 20:** Best chromosome found in each generation of test 3, iteration 3 of 3. 71

**Table 21:** Best chromosome found in each generation of test 4, iteration 1 of 3. 72

**Table 22:** Best chromosome found in each generation of test 4, iteration 2 of 3. 73

**Table 23:** Best chromosome found in each generation of test 4, iteration 3 of 3. 74

**Table 24:** Best chromosome found in each generation of test 5. 74

## PREFACE

This work does not attempt in any way to provide a formal mathematical description of the concepts presented. Equations are rarely or never used. However, a reader who has absolutely no mathematical or computer science knowledge will probably not understand many of the concepts herein.
The software system implemented on disk accompanying this submitted document will be referred to by its title, MetaGA4TSP.

The following software packages were used for the completion of this project:
- code editing: Sun One Studio 4 update 1, Community Edition, freely available from java.sun.com.
- compiling and testing: Windows XP command prompt, java SDK v1.4.1
- this document: MS Word from Office XP 2002. (Now converted to markdown)
- bitmaps: Hypersnap-DX v4.31 by Hyperionics; MS Paint
- graphs: Microsoft Excel from MS Office XP 2002

For those who wish, it may be beneficial to run the included software for demonstration purposes while reading this document. Installation and execution instructions are given in Appendix C.

* * *

## CHAPTER 1: INTRODUCTION

A famous and widely accepted theory attempting to explain how life may have reached its current state without divine influence was introduced in Charles Darwin's "Origin of Species" (1859). Darwin points out that since members of a species are unique but produce unique offspring with some traits of each parent, survival of the fittest leads to ‘better’ members of a species over time. Since 1859 research has supported Darwin’s theory.

Since most people are aware of Darwin’s theory of evolution, it will not be discussed in any detail, but the entire text is available online at many sources, one of which is listed at the end of this document.

The evolutionary process can be thought of as a solution to an optimization problem, where the problem being optimized is the fitness of the individuals in an evolving population. In nature, the problem being optimized can be thought of as the development of qualities which will increase one’s chances of reproducing (thereby passing on some of one’s genetic material to future generations). What exactly these qualities are can be very difficult to ascertain, and furthermore varies from species to species and can even depend on the current state of evolution within a species. However, if one could define virtual populations of individuals representing potential solutions in a problem space, with their fitnesses corresponding to how well the problem is solved, one could potentially ‘evolve’ that population as is done in nature to obtain individuals more capable of solving the problem. A computer program implementing this process is generally said to use a genetic algorithm (GA).

The GA, first proposed by J. Holland (1975), is a fascinating way of solving difficult problems since no specific knowledge concerning the solution is needed, except for a way to measure how good, or fit, or desirable, a potential solution is. Solutions are found by creating a virtual species whose individuals possess traits, the best combination of which, one would like to find.

The GA model and its terminology is borrowed from biology, since the biological model is the one being emulated. Individuals in the population each possess a unique genome made up of one or more chromosomes which are in turn made up of genes, each of which can take on different values called alleles which specify a particular trait appropriate to that gene. For example, humans might possess a gene specifying eye colour, and the possible alleles for that gene might be blue, brown, green, grey etc. During sexual reproduction, the chromosomes of the two parents are recombined to form one or more new chromosomes which will specify the genetic material of the offspring. This process is generally called crossover because parent chromosomes are often ‘cut’ at the same locus (position) on the chromosome, and the sub-chromosomes formed are exchanged to form the child chromosome(s). Another concept borrowed from biology and implemented in genetic algorithms is mutation which is the random effect of a new chromosome acquiring some random trait (gene value) from neither parent. Together, crossover and mutation are applied on a population of individuals to produce a new population probabilistically based on the fitnesses of the parent population. Parents are selected according to some selection method and the next generation is formed from the current population using some replacement scheme.

During the study of genetic algorithms, many different types of crossover and mutation operators have been implemented, and many different selection methods and replacement schemes been examined, with varying degrees of success, usually on specific problems. It has been found that the implementation of the genetic algorithm depends very much on the problem being solved. In addition, even within a single problem domain different results have been achieved depending on the instance of the problem being solved as well as its size. One of the biggest problems encountered when using genetic algorithms is the problem of deciding which parameters and operators to use for a given problem.

### 1.1 Motivation

The idea of simulating and automating the process of evolution in order to solve optimization problems is a fascinating one and has attracted a great deal of attention. This has resulted in extensive debate on how exactly evolution should proceed. How often should genetic mutation occur? How should reproduction be implemented? Unfortunately the answers to these questions vary with the problem being solved, but in order to enable implementation it was necessary to choose a specific problem, due to time constraints. For this reason, the Travelling Salesman Problem (TSP, described in Chapter 2) has been chosen as a test-bed for this work. The TSP is chosen because it has been extensively studied using evolutionary methods. Many genetic operators have been developed specifically for the TSP, but there is debate over which combinations of operators perform the best. The TSP was previously studied in the context of GAs during work in a course on evolutionary programming at Carleton University with Professor Franz Oppacher. A genetic algorithm was implemented to solve TSP (a generic genetic algorithm for TSP is heretofore referred to as TSP GA) as a course assignment. Students were to choose on their own which crossover, mutation and selection methods to use. Several operators were at that time implemented, and during implementation it was observed that the choice of operators, operator parameters and genetic parameters gave different qualities of results depending on the TSP instance being solved. It was wondered whether another GA could solve the problem of which combinations of parameters and operators were best, so that continual changing of parameters and running the genetic algorithm repeatedly could be avoided. It is this question that motivates this work.

### 1.2 Goal

The goal is to discover whether the problem of which parameters to use in a genetic algorithm for the Traveling Salesman Problem can be alleviated by using another genetic algorithm to evolve the parameter set in question. In order to accomplish this, a system that will be referred to throughout this document as MetaGA4TSP has been implemented in the java programming language. It should be stressed that no attempt is made to solve any particular TSP instance using fewer evaluations than have been conducted in other work. There are many heuristic operators and methods which exist for genetic TSP which have not been implemented but would be conducive to faster convergence of the TSP GA to good solutions. If MetaGA4TSP succeeds in finding good sets of parameters and operators among the ones chosen, it would be possible to implement other operators in the future which may perform better than any of the basic ones implemented here. Since no other similar work with which to compare the MetaGA4TSP system was found in time, an intermediate goal will be to show that the system evolves better parameter sets through evolution than are obtained by random selection.

### 1.3 Organization

This report is organized as follows.

- Chapter 2 gives the necessary background starting with a description of the Travelling Salesman problem (TSP) and continues with a basic description of genetic algorithms (GAs) and then methods of optimizing GA parameters.
- Chapter 3 describes significant details concerning the implementation including detailed description of all operators used, the workings of the MetaGA4TSP system and its subsystem, the TSP GA.
- Chapter 4 outlines the test plan and some of the results obtained.
- Chapter 5 draws some conclusions from the results obtained and outlines some possibilities for future work.

* * *

## CHAPTER 2: BACKGROUND

Enormous time and energy has been consumed by the scientific community studying intractable problems, or problems whose only known algorithmic solutions require an amount of time (or number of execution steps) which increases exponentially with respect to the size of the problem. In fact, much of the time spent is on a class of problems known as "NP-complete", whose tractability is unknown.{1} A problem is NP-complete if no polynomial-time solution has been found but it has not been proven that there does not exist such a solution. An interesting property of this huge class of problems is that if any one of them can be proven tractable, then immediately all other NP-complete problems are proven tractable as well. Conversely, if any NP-complete problem is proven intractable, then all NP-complete problems must also be intractable. For this reason, most computer scientists classify NP-complete problems as intractable, since it is exceedingly unlikely that many of the world's greatest minds have failed to find a polynomial-time solution to any of the huge number of NP-complete problems discovered if a solution actually exists. One member of the NP-complete class of problems, and possibly the most well-known, is the Travelling Salesman Problem (TSP).

### 2.1 The Travelling Salesman Problem

Simply stated, the TSP is the problem of finding the shortest way to visit a group of points (cities) under the restriction that each point must be visited exactly once. It was first documented by Euler in 1759 (Larranaga et al, 1999), but it is almost certain that the problem was considered by many people before that time. Potential solutions to the TSP are called tours, and are Hamiltonian cycles on the complete graph formed by the n cities in the TSP instance (Mathias & Whitley, 1992, pp. 1). In the two-dimensional Euclidian TSP, which is the only version considered here and is also probably the most simple and common, a particular solution’s quality is determined by summing the distances between each of the adjacent cities in the tour, or equivalently summing all the edge weights in the tour.

A potential solution to a particular TSP instance may be given in path representation, which is simply a list of the cities visited, in the order visited. There are other ways to represent potential solutions to TSP2, but only the path representation is considered here because it is the most intuitive and generally the most successful \[Mernik et al, (2000, pp. 2)\]. In this work, an assumption will also be made (as is usually done when working with the TSP) that the salesman must return to his starting point after visiting the final city.

For simplicity, each city is generally assigned a number (or sometimes a letter) to identify it. Throughout this work, each city in a tour will be assigned numbers between 1 and n inclusive. Thus one tour on a TSP of size n=4 would be represented by say 1234. A different tour would be 2431. One could generate all tours by generating all permutations of 1234. In fact, as we shall see in a moment, this creates too many tours: many of the permutations will be duplicate tours of other permutations.

A person freshly introduced to the TSP and asked to build an algorithm that gives a solution to any TSP instance will, after some thought, usually give the most obvious solution, which is often called a "brute force" solution. This involves listing all possible routes one could take, calculating each of their total distances, and picking the shortest path. While this sounds simple, and usually is with small problem sizes, larger problems take astronomical amounts of time to execute. This is because for a TSP of size n, there are on the order of n factorial3 (n!) legal tours, or the number of permutations of a set of n objects. A TSP with n=5 is almost trivial to solve. A computer can do it in fractions of a second by brute force. However, with n=50, even today’s fastest computers would disintegrate before they could solve the problem by listing each possible tour.

The path representation simply lists the cities in the order they are visited, starting with the first city. Each city must appear exactly once in the list for it to form a legal tour. Once a legal tour is found (one can create one by simply listing the cities from 1 to n), all other legal tours can be generated by taking permutations of that tour. One of the problems with the path representation is that it represents too many tours. In this variation of the TSP, as the reader might already have noticed, only the order the cities are visited is important, since we are only interested in the total distance. One can see that for any tour of the cities, it will have the same length no matter which city one starts at. In addition, it doesn't matter in which direction one travels, the tour will have the same distance.

This means that if the starting city is not fixed at a certain spot, there will be a large number of path representations generated whose tours are duplicates of other tours. For example, in a TSP of n=5, the permutations 12345, 23451, 34512, 45123 and 51234 all represent the same tour. It also represents twice more tours than required by traversing the path in a different direction, eg the tours 12345 and 15432 give the same distance and graphical representation and start at the same city, but have different path representations. Despite these problems, it was decided the path representation would be used in every TSP GA involved in the meta-GA. Making the representation used adaptable was briefly considered, but it was rejected in light of probable implementation difficulties as well as the fact that most of the other operators are designed for one particular representation.

![418e5c2e5fc49766e8fa495f7e5bcb1d.png](/b4c7759973a74c4fa09be15604c05bc1?raw=true)
**Figure 1**: All twelve unique tours on a TSP of size n=5 in graphical and path representations.

These considerations give us a value (n-1)!/2 for the number of unique tours on a TSP of size n. As an example, Figure 1 gives all unique tours for a TSP of size 5 in graphical form with one of the corresponding path representations. Although the pairs of mirror image tours (eg 12534 and 13425) appear to have the same distance, this is only a consequence of the chosen city pattern (pentagon-shaped) being symmetrical around the y-axis.

Since NP-complete problems like the TSP are so time consuming to solve by brute force, alternative methods have been developed which can vastly reduce the time taken to find the optimal, or a near-optimal, TSP solution. Basu Vaidyanathan (1998) compares various heuristic and artificial intelligence methods of solving TSP including the Lin-Kernighan heuristic, simulated annealing, branch-and-bound and elastic net. Most of these methods are not discussed here, but one interesting method that has seen some success in finding good solutions for hard TSP problems is the genetic algorithm (GA).

* * *

### 2.2 Genetic algorithms

In 1975, J. Holland introduced genetic algorithms (GAs), which are a computational method of simulating nature's evolutionary methods in an attempt to solve some of our own optimization problems. Holland, along with various researchers following his work, showed that life is not required for evolution to occur. All that is required is competition for resources among individuals in a population, a mechanism for copying or reproduction with inheritance, and some form of variability (Oppacher, 1999).
According to Larrañaga et al (1999), the first person to attempt to solve TSP with genetic algorithms was Brady (1985).
In order to introduce the concept of genetic algorithms, Figure 2 provides an informal example of a simple GA. We will examine each step of this algorithm in some detail in the next sections.

* * *
1.  Randomly generate an initial population.
2.  Calculate fitness for each individual in the population.
3.  Probabilistically select surviving members of the current population based on their relative fitnesses.
4.  Generate the next generation by applying genetic operators (mutation and crossover) to the surviving individuals.
5.  Repeat steps 2 through 4 indefinitely, or until a halting condition is met (for example the desired maximum number of generations is exceeded).
* * *
**Figure 2:** A basic genetic algorithm in high-level pseudocode.

#### 2.2.1 Population

A population is generally represented as a group of individuals whose properties are specified by their genomes which are made up of one or more chromosomes. In this work, only single-chromosome individuals are used and so the terms individual and chromosome will be virtually synonymous. The number of genes in a chromosome and the number of alleles per gene (the number of different states each gene can have) vary depending on the problem being addressed by the GA. A simple chromosome might be made up of a set of bits, each bit specifying yes or no for some attribute. Often however, 2-state attributes aren't sufficient. In the meta-GA developed here to optimize TSP parameters, for example, each chromosome will be made up of seven genes, three of which have 100 possible states. The chromosome for a TSP solution in path representation, on the other hand, is made up of n genes, where n is the number of cities in the TSP. Each gene may take on a value between 0 and n-1 (inclusive)4. Some GAs may also change the order in which each gene occurs in the chromosome5, however both GAs used in this work maintain fixed-order (as well as fixed-length) chromosomes. For example, the first gene in a TSP chromosome will always indicate the start city, the second gene indicates the next city visited, etc.

The size of the population is one of the GA parameters whose best value is widely disputed. In general, the higher the population size, the more solutions will be represented and the higher the chance of finding the optimal solution. However, there is a tradeoff between population size and computation time. There are some types of GA which have varying population sizes, but they are not investigated here.

The initial state of the population is usually a randomly generated set of individuals, but there have been many attempts to improve evolutionary results by starting with a population that has been heuristically generated or optimized. It is yet another source of debate whether or not this should be done, for which problems, and how it should be accomplished. The first task after generation of the initial population is to evaluate the fitness of its individuals.

#### 2.2.2 Fitness

> Critical to any model of natural selection is the concept of an individual’s fitness.
(Morrison, 1998, p. 2).

In nature, an individual’s fitness is represented by its ability to pass on its genetic material. Any quality that contributes to this ability contributes to the organism’s overall fitness. This includes, obviously, traits which enable survival in species where there is competition for survival, since one must first survive if one wishes to reproduce. Some of the literature distinguishes between survival fitness and reproductive fitness (eg Morrison, 1998, pp. 3). In this work, only reproductive fitness is considered relevant.

In genetic algorithms, fitness is imposed by the fitness calculation specified. The reproductive process is guided by the relative fitnesses of the individuals in the population as specified by the program.

In a TSP chromosome, fitness is easy to calculate. TSP attempts to find the shortest path subject to some constraints, so the fitness is the inverse of the distance in a TSP tour.{6}

The calculation of an individual’s fitness is the driving force behind evolution and specifies the direction in which the population will converge.

#### 2.2.3 Selection

One wants to reward fit individuals when selecting the surviving members of the population, but not to the point where those individuals will dominate the population prematurely. If a certain subclass of individual (schema) is allowed to dominate the population, other better individuals may never be discovered. There are many different selection methods, but most rely on assigning probabilities of selection to each member of the population based on their fitness. Some popular selection methods are Roulette-Wheel selection, Rank selection and Tournament selection, all of which will be described in Chapter 3: Implementation.

#### 2.2.4 Crossover and mutation

Crossover is also known as recombination, or mating. It is a simulation of the sexual reproductive process which provides genetic inheritance. A great number of different crossover operators have been developed for various purposes. One of the first and simplest is the simple single-point crossover, where a crossover point is chosen at random, and the two parent chromosomes exchange information after that point (see Figure 3).

![8209e426ed5b7afdf7828b1be948cdc2.png](/99cbb5954bbd4cb6a2d4cfbb9f73a0a8?raw=true)
**Figure 3:** Demonstration of a simple single-point crossover on arbitrary chromosomes of length 6 with crossover point 2.

Crossover is applied after, or sometimes during, selection, and with a certain probability defined as the crossover rate.
Mutation is intended to simulate random genetic mutation in nature, but tends to be used more frequently in GAs than in nature in order to encourage population diversity and prevent premature convergence. If one thinks of crossover as a binary genetic operator (acting on two parents), mutation can be thought of as a unary genetic operator. As with crossover, a mutation rate is defined to control how often mutation is applied. In some GAs, probability of mutation is implemented on a per-gene basis. A mutation rate of 0.01 (1%) would mean each gene has a one percent chance of being mutated. In all GAs implemented as part of this work, however, probability of mutation applies to each chromosome. A 0.01 mutation rate would mean each chromosome has a 1% chance of being mutated. A chromosome selected for mutation would then have one of its genes selected at random and given a new random state.
![4e78ab5abb87f7f18740dfa4c0df8aa9.png](/6c695eab1f744ca2aab893cfb7b8736a)
**Figure 4:** Classic mutation at locus 1 on an arbitrary 8-bit chromosome.

Many different crossover and mutation operators have been implemented as required for different problems which use particular chromosome representations. We shall see several examples of this with the path representation for the TSP when the implementation is discussed in Chapter3.

#### 2.2.5 Generating the new population

In much of the literature, a distinction is made between what are referred to as steady-state GAs and generational GAs. These two methods represent the extremes of replacing only one or two members of the population and replacing all of them at each generation of evolution. The same literature also discusses a method commonly known as elitism, which keeps a certain number of the best individuals from each generation and copies them to the new generation. By these definitions, a high elitism rate would simulate a steady-state GA while a low elitism rate would simulate a generational GA.

As with other aspects of the GA, generation of the new population can vary depending on the implementation.

#### 2.2.6 The Fitness Landscape

We have seen that genetic algorithms maintain a working memory of potential solutions to a problem which take the form of individuals in a population. Each of these individuals occupies some point in the search space (the space containing all potential solutions to a problem). Since each point in the search space has a unique ‘fitness’ associated with it, the search space can theoretically7 be envisaged as a ‘fitness landscape’. In a genetic algorithm the population defines the method(s) by which each generation of individuals will be replaced by a new generation, i.e. how the new points in the search space will be found. The idea, of course, is to find the highest point(s) in the search space.
Some of the literature focuses on examining the fitness landscape for a given problem mathematically (see for a TSP example Mathias and Whitley, 1992), but this sort of analysis is beyond the scope of this document.

### 2.3 Methods of optimizing parameters for genetic algorithms

According to Smith and Fogarty (1997, pp. 3), the first major study which attempted to identify suitable sets of parameters for a GA was done by DeJong (1975). His study “identified a suite of test functions and proposed a set of parameters which it was hoped would work well across a variety of problem types” (Smith and Fogarty, 1997, pp.3). Apparently this method of optimizing parameter sets is unreliable since “later studies using a ‘meta-ga’ to learn suitable values \[Grefenstette (1986)\] or using exhaustive testing \[Schaffer et al. (1989)\] arrived at different conclusions” (Smith and Fogarty, 1997, pp.3).

#### 2.3.1 Hierarchical genetic algorithms

Hierarchical GAs, or meta-GAs, are genetic algorithms that act on populations of other genetic algorithms. This includes some parallel, distributed and coevolutionary genetic algorithms, however those are generally referred to using more specific designations.

In this work, one of the simplest forms of meta-GA is implemented. It is simply a GA whose fitness calculation phase involves running another GA. There is no interaction among sub-GAs, and they are run in sequence. The implementation is described in detail in Chapter 3. The reason why meta-GA was selected to tune parameters cannot be better expressed than in the following passage:

 > There are a number of reasons why the meta-GA method is attractive for GA factors tuning. First of all, the number of GA factors present and their levels of magnitude as well as the interaction between these factors together with stochastic features of genetic algorithms make the set of all possible GA factor settings extremely difficult to search through. The thrust of meta-GA utilization is that massive parallelism of ‘meta-genetic algorithm’, may be brought to bear on the problem of examining the set of all possible factor settings for an objective genetic algorithm (Freisleben and Hartfelder, 1993). A second advantage of the meta-GA approach is that it retains the ability to carry out unbiased and automated optimization. For these reasons, we regard meta-GA optimization as a credible contestant for our approach to GA factor tuning \[…\]
 >  (Petrovski and McCall, 1998, pp.3)

There are countless possible variations of the simple meta-GA. One class of variations involves running each sub-GA in parallel, with possible exchange of information between GAs. Other variations might use different representations of meta-GA chromosome. For example, instead of having a single gene which encodes the type of operator used (as in MetaGA4TSP), one could have a gene for each operator, with possible alleles representing the probability of that operator’s application. This would define a completely different meta-GA than the one implemented here.

#### 2.3.2 Coevolution

Coevolution{8} is a somewhat difficult and misunderstood concept. By one definition,
 > co-evolution is defined by the presence of Natural Selection, on a group of individuals, whose fitnesses are interdependent
 >  (Morrison, 1998, pp. 21).

As Morrison points out, this definition can include the simple GA, since individuals’ fitnesses are indeed interdependent for many if not most GAs. It also includes a large number of other variants of GA. Indeed, the main goal of Morrison’s work is to formulate formal working definitions for coevolution. Eventually, Morrison gives the following definition for coevolution:
>Co-evolution of a population with itself occurs when individuals within the population are in symbiosis with other individuals in the same population. Co-evolution of a pair of populations with each other occurs when individuals in one population are in symbiosis with individuals of the other population.” (pp. 136) “Symbiosis is defined by a relationship between two individuals where the fitness of one individual directly affects the fitness of the other individual.
(Morrison, 1998, pp. 136).

This definition seems a little broad, and even slightly inaccurate, since it allows co-evolution without evolution. The Merriam-Webster definition for coevolution is
> evolution involving successive changes in two or more ecologically interdependent species (as of a plant and its pollinators) that affect their interactions
>  (Merriam-Webster, 1965).

Using this definition, it would make sense that coevolution in computer science would involve interaction of different species. Mr. Morrison does admit elsewhere in the paper that coevolution is a relationship among species:
> Co-evolution refers to the evolution of multiple species that affect one another. As one species evolves it changes the relationship it has with surrounding species. (Morrison, 1998, pp. 24)

This passage, although not specifically flagged by Morrison as a definition, seems a more accurate, or at least more specific, description of coevolution.

Originally it was proposed that this project would attempt to use coevolutionary methods of evolving TSP GA parameters. However, due to mass disagreement on precisely what was meant by coevolution{9}, research in that direction was abandoned when the meta-GA structure was decided upon. Before abandoning research in coevolutionary methods, it was believed that coevolution must involve a predator-prey relationship between two species, which is more specific than any of the definitions given above, and it was not clear how precisely this would apply to the TSP GA situation.

Although MetaGA4TSP qualifies as a coevolutionary system, it is a very specific type. The TSP tour species does not evolve at the same time as the GA parameter (meta-GA) species, but instead an entire TSP tour species is evolved for each individual in the GA parameter species. For this reason, the GA implemented is referred to as a hierarchical, or meta-, GA and not as a coevolutionary one.

## CHAPTER 3: IMPLEMENTATION

The decision was made to implement the system in java mostly because this is the language in which the author is most proficient, but the language’s portability and its youth played some role in the decision also. There exist many GA toolkits which allow one to define the problem for which a solution is to be evolved, and also allow the user to define parameters for the GA. After working with several evolutionary toolkits in java10 including GAJIT (Faupel, 1999) and ECKit (Potter, 1999), it was decided to implement the meta-GA from the ground up, making it specific to TSP. The huge number of variants of GA was bewildering, and too much effort was being used up in familiarization with each. In retrospect that decision should have been made before the bulk of research was performed.

### 3.1 Description of implemented TSP operators

A detailed description of each operator used in the implementation of the meta-GA shall now be given. Each operator is assigned an alphanumeric short form which is used extensively in the implementation, and whenever possible is consistent with short forms used in the literature. For ease of identification, mutation operator short-forms end with an uppercase 'M', crossover operators with an 'X', selection methods with an 'S', and replacement schemes with an 'R'.

Note that when referring to a TSP individual, the terms chromosome, individual and tour are used more or less interchangeably, as are the terms allele and city. For simplicity in the implementation, cities are named from 0 to n-1, as are city indices (loci in the TSP GA chromosome). However, some examples name the cities from 1 to n. This is a common occurrence in computer science and the convention used is usually obvious.

Unless otherwise specified, the letter 'n' encountered by itself represents the number of cities in the TSP instance, or equivalently the number of genes in the TSPGA chromosome.

#### 3.1.1 Mutation operators on path representation

Due to the popularity of the TSP and path representation as test beds for evolutionary programming research, many mutation operators were developed which possess the advantage of mutating a TSP chromosome without forming an illegal tour. Only a few of the basic ones are implemented as alleles in the third gene of the meta-GA chromosome. It is considered important to understand their operation in detail in order to interpret the results of evolution of the meta-GA.

##### 3.1.1.1 Exchange mutation (EM)

Exchange mutation \[Banzhaf, 1990\] solves the problem of generation of illegal tours by simply exchanging two of the cities in a tour, which always transforms a legal tour to another legal tour. Two unequal loci are chosen at random, and the cities at those indices of the chromosome are exchanged. Two examples are shown in Figure 5.

![fab6053b9df525b412d08b669b545ee2.png](/97caad20cd4048d5bb9f92ec9e5be880)
**Figure 5:** Output from two random demonstrations of exchange mutation on tours of size 6 from the MetaGA4TSP implementation.

##### 3.1.1.2 Insertion mutation (ISM)

Insertion mutation selects a city at random and replaces it in a new random spot in the chromosome. In MetaGA4TSP, the insertion spot is taken to be the larger index for simplicity. When the city is inserted in its new spot, the cities are shifted by one position each until the vacated spot is filled.

![0c02b621e46b0657c39376f940690551.png](/82c41f88bb234265bf003b1bd63a5cf1)
**Figure 6:** Output from two random demonstrations of insertion mutation from the MetaGA4TSP implementation on tours of size 6.

##### 3.1.1.3 Simple inversion mutation (SIM)

SIM acts on a substring of the tour rather than on one or two genes. It picks two loci on the chromosome at random, and reverses the order of the cities between those points. Examples are shown in Figure 7. This implementation enforces a substring length of three or more.

![f6d972b7b4ad3191070fa632a566fdb3.png](/163da753bcc540098c590a9da51b32ea)
**Figure 7:** Output from two random demonstrations of simple inversion mutation from the MetaGA4TSP implementation on tours of size 6.

##### 3.1.1.4 Displacement mutation (DM)

This mutation operator picks a substring of the tour at random as with SIM, but instead of inverting the substring, it displaces it intact to a new locus. As with SIM, the substring length must be between 3 and n-1. Figure 8 gives two examples.

![5e64e7366d5f017b1fd7046f42ae34a0.png](/a504bed618ff484c9c4fbf803238d2a4)
**Figure 8:** Output from two random demonstrations of displacement mutation from the MetaGA4TSP implementation on tours of size 6.

##### 3.1.1.5 Inversion mutation (IVM)

IVM can be thought of as a combination of SIM and DM on the same substring of the tour. A random substring is chosen and inverted, and the inverted substring is replaced at a random locus of the chromosome. Two simple examples are given in Figure 9.
![db9c7e26a46ff76cfad745794dfa9869.png](/57f9024b653f457280ec125f65484251)
**Figure 9:** Output from two random demonstrations of inversion mutation from the MetaGA4TSP implementation on tours of size 6.

#### 3.1.2 Crossover operators on path representation

In the next sections, the crossover operators implemented in MetaGA4TSP are described. All crossover operations are binary, that is, they act on two parent individuals. The parents are referred to as parent1 and parent2. In the implementation, the crossover methods each produce a single child. However, the operators are not symmetric on the arguments, thus a different child is produced depending on whether its arguments are given in the order (parent1, parent2) or (parent2, parent1). The MetaGA4TSP demonstration program which is used to give examples of each operator outputs both offspring (except with ERX, for simplicity11). The number of offspring actually produced during evolution depends on the replacement method being used (see section 3.1.4.4).

##### 3.1.2.1 Partially mapped crossover (PMX)

According to Larrañaga et al (1999, pp.11), the PMX operator was first suggested by Goldberg and Lingle (1985). Like many of the crossover operators presented here, PMX starts by randomly choosing two points and exchanging the two parents' information between those loci. The remaining genes in the child are filled with the corresponding cities from the original tour (starting from the beginning of the tour) unless they are already present in the child. In such a case, the city to be placed at that locus is specified by the mappings formed by the selected substrings in the parent. In the 6-city example of Figure 10(a), for example, the mappings are 4&lt;-&gt;0, 0&lt;-&gt;2, and 5&lt;-&gt;3.

![dd627b5b3edc7751d2d7b9e1711513db.png](/ee96b87710e048d9acff7894f105e68f)
**Figure 10:** Partially-Mapped crossover as performed by the MetaGA4TSP demonstration on randomly generated parents on a) tours of size 6 and b) tours of size 12.

For the first child, the parent1 substring 405 is copied into the child at the same locus. Then the algorithm attempts to fill the remaining genes using alleles from corresponding (at the same locus) genes in parent 2. Since the 5 at position 3 of parent 2 is already present in the child, the mapping 5&lt;-&gt;3 is used. In the next spot there is a 4 which is also already present in the child so the mapping 4&lt;-&gt;0 is used. However, 0 is already present as well so the mapping 0&lt;-&gt;2 is used and a gene is finally found which is not already present in the new child so it is placed at position 4 of the child. The last allele in parent2, a 1, happens to also be the only remaining allele not yet present in the child, and so it is copied over.

A second child is found in exactly the same manner as in the above paragraph except that parent1 and parent2 are interchanged.

##### 3.1.2.2 Cycle crossover (CX)

Again according to Larrañaga et al (1999, pp.13), the cycle crossover operator was proposed by Oliver et al. (1987). It is distinguished mainly by its lack of crossover points, and is only suitable for single-child reproduction. Cycle crossover attempts to create an offspring, each of whose genes contain the same alleles as one of the parents' two genes at the corresponding position. An excellent description of cycle crossover is given in Larrañaga et al (1999, pp.13,14), but a basic description and example of the algorithm are also given here.

![0e599393b3623aa2ef349eaff1082c04.png](/c32651f9e7c9402db92f6611b5493436)
**Figure 11:** Cycle crossover as performed by the MetaGA4TSP demonstration program on randomly generated parent tours of size 6.

The algorithm starts at the beginning of the chromosome and picks one of the parents at random from which to copy the first allele. In this example let us only discuss the first child in Figure 11 (3 1 5 2 4 0). For the first child allele, a coin was tossed and parent1 was the winner, so the 3 was copied to the child. Now the algorithm finds the position of the 3 in parent 2, which it finds at locus 1. Since the 3 is already used in the child, the algorithm copies the 1 from the corresponding spot in parent1 over to the child. Now of course, since the 1 is used the algorithm finds the 1 at the last locus of parent2 and copies the 0 over from parent1. The algorithm continues in this manner until all the child genes are filled. If it comes to a point where there is a choice between the two parents, it proceeds as with the first gene, by flipping a coin.

##### 3.1.2.3 Order crossover (OX)

Larrañaga et al (1999, pp.15) credits the OX operator to Davis (1985). Like PMX, the algorithm starts by copying a substring of random length between 3 and n-1 inclusive from one of the parents to the child. Then the genes of the other parent are copied to the child (starting at the endpoint of the copied substring) in the same order in which they appear. If a gene is already present, it is simply skipped. For some reason, probably because the ordering property of the chromosome is somewhat preserved from both parents, this operator is very successful with the TSP. With small problem sizes (n=50 or fewer cities) it has dominated all preliminary MetaGA4TSP test evolutions. Examples are given in Figure 12.

![534bcb19d28990e6d4dccd3ffd683b6e.png](/a3bb2d430504410bb82b014e89bd44c6)
**Figure 12:** Output from the MetaGA4TSP Order crossover demonstration routine on randomly generated parents of a) size 6 and b) size 12.

##### 3.1.2.4 Edge recombination crossover (ERX)

Edge Recombination is attributed to Whitley et al. (1989) according to Larrañaga et al (1999, pp.18). It differs from most other recombination operators included with MetaGA4TSP because it focuses on conserving the edge information from the two parents. This is done by constructing an edge list for each city. An edge list for a graph lists all adjacent nodes for each node. With two parents, the edge lists for each parent are combined. In path representation, this is fairly easy since all incident edges to a city can be found by recording each city that is adjacent to that city in the path representation. With two parents, a city may have a minimum of two and a maximum of four edges in its edge list. Let us look at the edge list for city 0 in the example provided in Figure 13. In the first parent, it is easy to see that cities 2 and 5 are connected via edges to city 0, thus 2 and 5 are added to city 0's edge list. In the second parent, cities 2 and 10 are connected directly to city 0, but the edge 0-2 already exists in the edge list, so only the edge 0-10 is added. This simple process is repeated for each city. Of course, cities at the beginning or end of the path representation are adjacent to the city at the other extreme of the list, so in the example edge (3, 9) exists in parent 1 and edge (4, 2) exists in parent2. ****strong text****

![504bf1b5c3bc80b0f65e3b8a31746572.png](/2bc934c34f4248bc9f3fcbae667accba)
**Figure 13:** Output from the MetaGA4TSP Order crossover demonstration routine on randomly generated parents of size 12.
Once the edge list has been built, the ERX algorithm builds a child tour by proceeding as follows. The first gene to be copied over is chosen by taking the shortest edge list. Ties are either broken randomly, or in the case of the ERX implemented in MetaGA4TSP the first such city encountered is chosen. In Figure 13 cities 0 and 2 both tie for the shortest edge list so 0 is chosen as the first city in the offspring. Whenever a city is chosen, all of its occurrences are removed from the right hand side of the edge list. For the next city, we want to choose the edge incident to the previous city whose other end itself has the shortest edge list. Since the previous city is 0, we see that our candidates for the next city are 2, 5 and 10. City 2 has the shortest edge list, so it is chosen to occupy locus #1 in the child. Computation proceeds in this manner until all the cities have been used. City 2 is connected to cities 1, 0 and 4 but 0 has already been used (and removed from city 2's edge list). The only remaining cities incident to city 2 are cities 1 and 4 which have equivalent edge list sizes so city 1 is chosen to break the tie.
If this method of choosing the shortest edge list at each iteration was not used, there would be foreign edges introduced in the offspring. With this method, the only foreign edge which can be introduced is between the last and first cities. Larrañaga et al (1999, pp.18) offers a more thorough description and analysis of ERX.

##### 3.1.2.5 Maximal preservative crossover (MPX)

The MPX operator used here is a slight variation of the one introduced by Muhlenbein et al. (1988). It works the same as OX, except that the chosen substring is always copied to the beginning of the child chromosome. Our version differs from the version of Muhlenbein et al. (1988) in that instead of using a range of \[10..(n/2)\] for the randomized substring length we have used the range \[3..(n-1)\]. This may cause poorer results at large problem sizes, but should have little effect with n at fifty or less.

![4df999297647bb6c0f5613683adc3afe.png](/8e9b33227a7646168923aaa1aab4c333)
**Figure 14:** Output from the MetaGA4TSP maximal-preservative crossover demonstration routine on randomly generated parents of size 12.

It is easy to see from the example that the chosen substring from the first parent is copied to the front of the child chromosome, and the remaining genes are filled with alleles in the same order in which they occur in the second parent.

#### 3.1.4 Methods of selection and replacement

In MetaGA4TSP, a distinction is made between methods of selection of the parents for reproduction and methods of replacing the old population to generate the new one. This distinction is clarified eloquently by Jens Gottlieb and Torben Kruse:
>The parent selection phase uses the fitness information to select parents for reproduction, while the replacement scheme determines how the next population is formed by the produced children and the old population. Algorithms like \[…\] GENITOR are usually considered as selection algorithms, but in fact they represent combined selection strategies consisting of a specific parent selection method and a specific replacement scheme.
> (2000, pp. 415)

A decision was made to separate these two processes in order to allow the possibility of determining the best combination of techniques for the two phases of selection. This section and its corresponding gene in the meta-GA chromosome deals with methods of selecting the parents from the old population to combine via crossover and/or copying to produce the children which will replace the old population in the manner specified by the replacement scheme. The next few sections describe the selection methods used, followed by the replacement schemes implemented.

##### 3.1.4.1 Roulette wheel selection (RWS)

In this method, parents are selected from the population probabilistically according to fitness-proportional selection. Each member of the population is assigned a selection probability proportional to its fitness. The easiest way to think of it is as a pie chart, with each member of the population possessing a piece of pie whose size is directly related to how fit that individual is. When a parent is selected from the population, the wheel (pie) is spun, and wherever it lands is the individual chosen. In MetaGA4TSP, when choosing two parents, the first parent is removed from the population before selecting the second parent to avoid selecting two identical individuals. However, selection is performed with replacement in the sense that the two parents are replaced in the population before selecting the next two parents, so that a single individual (especially if it’s very fit) may sire several offspring with different mates.

##### 3.1.4.2 Rank selection (RS)

Rank selection involves ranking the individuals in a population from best to worst, and selecting parents based on that ranking. Thus it isn’t the individual’s absolute fitness that matters, but only whether or not it performed better than another member of the population. During selection, an individual at rank i is selected with probability pi where p is some number between 0 and 1.

The algorithm works by iterating through the population (sorted by fitness). The first individual in the ranking is selected with probability p. If it is not selected, the iteration continues to the next individual which is also selected with probability p. This continues until an individual is selected. If the iteration completes without selecting an individual, it begins again from the beginning.

In MetaGA4TSP, p is predefined to be 0.2. This number was chosen based on past experience with Rank Selection and TSP. If this work is ever extended it may be beneficial to include the possibility of adapting the value for p by either adding a gene to the meta-GA chromosome or adding alleles to the selection gene which represent rank selections using various values for p.

##### 3.1.4.3 Tournament-5 selection (T5S)

In tournament selection, a group of individuals is chosen from the population at random, and the fittest individual from that group is chosen as the parent. The size of the group may vary of course, especially with population size. In the current implementation of MetaGA4TSP the only tournament selection implemented uses a group size of five. Members of the old population are repeatedly selected with replacement and recombined until the new population has been completely generated.
As with rank selection probability, one could conceivably extend the MetaGA4TSP implementation to test the performance of tournament selection methods with varying group sizes.

##### 3.1.4.4 Replacement schemes (S1R, S2R, H1R)

Currently, three replacement schemes are implemented. They have been named ‘Simple Single-Offspring Replacement’ (S1R), ‘Simple Double-Offspring Replacement’ (S2R), and ‘Heuristic Single-Offspring Replacement’ (H1R).

All replacement schemes used start by copying the elite individuals directly to the new generation without possibility of mutation. Next the algorithm flips a coin biased according to the crossover rate. If the coin toss ends favorable to recombination, two parents are selected from the population via one of the selection methods above.

What happens next depends on the replacement scheme. If S1R is being used, a single offspring is produced by recombining the two parents according to the crossover method. Since the crossover function produces different children depending on which order the parents occur in the function call, a coin is flipped to decide which one to use in S1R and H1R. In S2R, of course, two offspring are produced for each two individuals of the population instead of one for each individual. However, it should be emphasized that the choice of parents is not affected by the member(s) of the population that is currently being replaced.

If the crossover rate is not met, the child is copied over directly from the old population instead of selecting parents. In either case, yet another random number is generated and the individual is mutated if this number exceeds the mutation rate.

Once all members of the next generation have been produced, they replace the old population, and the process begins once again with fitness calculation of the population.

### 3.2 The MetaGA4TSP system

At the top level of evolution is the meta-GA, which can be conceptualized as a simple GA whose individual's genomes consist of sets of parameters for another GA. In order to calculate the fitness for the meta-GA's individuals, that other GA must be evolved to a certain point (preferably to convergence). Some would say that this system is technically not really a meta-GA, since the population of MetaGA4TSP does not actually consist of other GAs but parameters for other GAs. But since a complete GA is run for each meta-GA individual, this can at least be considered a form of meta-GA.

Note: In MetaGA4TSP, generation gap (% of population replaced each generation) is specified by the crossover rate (after elitism rate), since if xover rate is not met for an individual in the old population, that individual is copied to the new population instead of selecting parents and generating offspring by crossover. This system is somewhat different from that found in other literature, and in retrospect the replacement scheme should not have been implemented in such a manner.

#### 3.2.1 Meta-evolution

Meta-evolution was kept fairly simple. Figure 15 gives some high-level pseudo-code for the genetic algorithm implemented in the java classes Main, Population, and Chromosome in package abramsJPaul.metaGA4tsp.

* * *

User-specified parameters: popsize, tspfile, eliterate, mutrate, xrate, numgenerations.
1\. Generate population by creating popsize random chromosomes.
2\. For each member of the population, calculate its fitness by running TSP GA on TSP instance tspfile using the parameters specified by that member’s chromosome.
3\. Sort the population by fitness, and copy the top eliterate percent individuals to the new population.
4\. For each remaining member of the population, generate a random number between 0 and 1. If the generated number is higher than xrate, produce a child by selecting 2 parents using rank selection and recombining them using a method of single-point crossover. If xrate is not met, the child is copied from the corresponding member of the old population.
5\. Each non-elite member of the new population, whether or not it was produced by recombination of selected parents or by copying directly the old individual, has probability mutrate of having one of its genes randomly chosen and mutated to a new random allele.
6\. Repeat steps 2 through 5 numgenerations times.

* * *

**Figure 15:** High-level pseudocode for the genetic algorithm implemented in java package abramsJPaul.metaGA4tsp.

#### 3.2.2 The meta-GA chromosome

The meta-GA chromosome is used to specify which set of parameters is used for a TSP GA. Each of its genes encodes the value for a specific parameter in integer form. The chromosome chosen is fairly small; it consists of only seven genes which take on integer values, and is shown in Figure 16.

| Locus | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gene Function | Replacement Scheme | Elitism Rate | Mutation Type | Mutation Rate | Crossover Type | Crossover Rate | Selection Scheme |
| Possible Alleles | 0,1,2 | 0-100 | 0,1,2,3,4 | 0-100 | 0,1,2,3,4 | 0-100 | 0,1,2,3 |

**Figure 16:** The MetaGA4TSP chromosome.

The first gene specifies which type of replacement will be used. The three possible values (alleles) for the first gene are simple single-offspring replacement (S1R), simple double-offspring replacement (S2R), and heuristic single-offspring replacement (H1R), all of which are described above. The second gene specifies the elitism rate to be used, and may take on any value between 0 and 100 representing the percentage of the population’s best individuals that will be carried over to the next generation. It is considered that a high elitism rate simulates the steady-state property of generational evolution. The third gene specifies the mutation type. The chosen values for the gene are those described in section 3.1.1: exchange mutation (EM); insertion mutation (ISM); simple inversion mutation (SIM); displacement mutation (DM); inversion mutation (IVM). The fourth gene specifies mutation rate and may take any integer value between 0 and 100. It specifies the probability of an individual having (a random) one of its genes mutated to a new allele, and is applied once to each individual in each generation of TSP GA evolution. The fifth gene specifies the type of crossover to be used: partially-mapped crossover (PMX), cycle crossover (CX), order crossover (OX), edge recombination crossover (ERX) or maximal preservative crossover (MPX). The sixth gene specifies the crossover rate in the same way as genes two and four specify elitism and mutation rates. The crossover rate is applied to each member of the population at replacement time to determine whether to produce the offspring by selection and crossover, or to copy it directly from the parent population (with possibility of mutation). The seventh and final gene in the chromosome specifies the selection scheme to be used. Its alleles are simple random selection (S), rank selection (RS), roulette-wheel selection (RWS) and tournament-5 selection (T5S).

Genes 2, 4 and 6 will be referred to as the ‘rate-specifying’ genes, for obvious reasons, when it is necessary to distinguish them from the ‘operator-encoding’ genes.

It is important to note that the implementation of the meta-GA chromosome is somewhat arbitrary. There are mentions of GA parameters and improvements at various points in this document which are not implemented in the chromosome, but which would undoubtedly either improve results or at least shed some light on the validity of these methods.

The size of the chromosome is significant: it is quite small. If one ignores the rate-specifying genes, there are only 300 different combinations of the four operator-encoding genes in this implementation. Combined with the fact that many of these operators are similar in their ability to produce good TSP GA results, the chances of randomly finding a good chromosome are fairly high. This interferes somewhat with analysis. Even if the rate-specifying genes are taken into account, this still makes only 300 million unique chromosomes, a great many of which are extremely similar.

##### 3.2.2.1 Meta-GA chromosome fitness
A chromosome’s fitness is a percentage as the ratio of the best distance found to the optimal known distance for that TSP instance. If the optimal is found, the fitness is 100 + a ratio of the maximum number of generations allowed to the number taken. This latter ratio is taken as a percentage of 10, so the highest fitness is 110, which is only possible to achieve if the optimum tour is randomly generated in the initial population (one chance in n factorial or so). Java-style pseudocode for the setFitness method in class metaGA4tsp.Chromosome is shown below.

```java
public double setFitness(double distance, double known_optimum, 
  integer generations, integer max_generations)
{
    double result = 0.0;
    if (distance <= known_optimum)
        result = 110 – ( generations / max_generations )*10;
    else
        result = known_optimum / distance * 100;
    return result;
}
```

**Figure 17:** Simplified java code for the method abramsJPaul.metaGA4tsp.Chromosome.setFitness(double distance, int gens)

If the known optimum for the desired TSP instance is unknown, it can be set to an impossibly low number and the meta-GA will evolve correctly, although the numbers output for chromosome fitness will be meaningless except when compared to each other.

##### 3.2.2.2 Meta-GA crossover

Crossover is performed to produce an individual in the next generation of the meta-population if a randomly generated number for that individual exceeds a user-specified crossover rate. Crossover is performed by selecting a single locus, forming two genetic subsections of each parent around that locus, and swapping the two subsections. Only one of the two produced children is used in the next generation, however. The child used is decided by flipping a virtual coin.

##### 3.2.2.2 Meta-GA mutation

Mutation is performed on an individual in the population if a randomly generated number for that individual exceeds a user-specified mutation rate. When an individual is selected for mutation, one of its genes is selected at random, and that gene is assigned a random allele among the alleles appropriate for the selected gene.

### 3.3 The TSP GA

As discussed in section 3.2, an evolutionary run of a TSP GA is conducted for each individual in each generation of meta-evolution. This section briefly describes the implementation of that TSP GA.

The TSP individual, as discussed in Chapter 2.1, is a permutation of the set of numbers {\[1..n\]} (n being the number of cities in the TSP instance). In the implementation, an individual’s fitness is calculated as soon as it is created and never again. Each time mutation or crossover is performed, a new individual is created so that fitness may be re-calculated.
The TSP GA initial population is randomly initialized by generating legal tours. The only restriction is that the fitness of each tour is unique; new individuals are generated until this restriction holds. It was briefly considered to start each tour at the same city in order to reduce the size of the search space, but this idea was rejected in favor of simplicity.

The evolutionary loop in a TSP GA is very similar to that used in the meta-GA except that its parameters and operators may vary. It starts with copying all elite individuals directly to the new population. Then for each other individual (each 2, depending on the replacement method being used) in the old population, a crossover die is rolled to determine whether the individual will be copied directly (with possibility of mutation) or whether parents will be selected via the selection method for this TSP GA and offspring produced via crossover. Whatever the case, each non-elite member in the new population has a chance (according the mutation rate for this TSP GA) of being mutated according to the mutation type.

* * *

## CHAPTER4: TESTING AND RESULTS

Population size for TSP GA set at `2 * numCities`.

Note there are about 600,000 to 1.4 million TSP fitness evaluations per generation.

### 4.1 Test plan

Obviously, there are a hugely infinite number of choices for a test plan on this system. Thus, the choice of test plans is necessarily arbitrary in the specific sense, although somewhat less arbitrary in the general sense since many extremes can be ruled out.

#### 4.1.1 TSP test instances

Two 52-city problems were chosen as the main test instances. The first is berlin52 from TSPLIB (Reinelt, 2000) and the second is called dbl\_circ\_52 and was created specifically as a comparison instance for berlin52. An example of a tour for each 52-city problem is displayed graphically in Figure 18.

| ![3f9ff5a35a645dedd65575dd130e31f5.png](/8471e1f2b51846e5abd0d3f034e9c628) | ![b601df14e0e46c1cdd997f35f3fa28eb.png](/5cc2db29dcf74a068003bfa5f00d1534) |
| --- | --- |
| (a) | (b) |

**Figure 18:** Graphical output from abramsJPaul.metaGA4tsp.Demo.tsp() for (a) a local optimum for berlin52 and (b) one of eight (graphically unique) optimal tours for dbl\_circ\_52.

There are methods which can currently solve berlin52 in less than one second of computation time (see Applegate et al, 2001). MetaGA4TSP couldn’t find a combination of parameters and operators implemented that could even find the optimal solution for berlin52 in less than 500 generations (around 6 minutes on my desktop), much less one second. However it should be re-emphasized that the current goal is not to find optimal tours in optimal time, although that could be thought of as one long-term goal for which this work is a stepping stone, much like a poor chromosome might be a necessary step towards a good chromosome.

It was decided to test a larger TSP instance at least to some extent. ‘ch150’ was chosen from TSPLIB, somewhat arbitrarily. It took several days to run a test with the desired parameters on a Pentium™ laptop. **Figure 19** shows the best tour found by MetaGA4TSP in the second12 generation of evolution.

![8d2e4a2478d79612f4856a19010743a2.png](/2834a037912f4628ac4752915062e752)
**Figure 19:** Graphical output for the best tour found in the 2nd generation of meta-evolution during a MetaGA4TSP session using the TSP instance ch150.tsp.

#### 4.1.2 Test parameters

The main parameters whose values are in question when performing a particular test are the following, with a short form given for each to refer to the specified variable (parameter):
• Population size of meta-GA (popSize)
• Number of generations to run meta-GA (numGens)
• Maximum number of generations to run TSP GA for each individual in each generation of the meta-GA (maxTSPGens).
• Mutation rate of the meta-GA (per individual) (mutRate).
• Probability of crossover in the meta-GA (per individual) (xRate).
• Elitism percentage in the meta-GA (elitismPercent).
• TSP instance (layout of cities) (tspFile).
• TSP size (number of cities specified by tspFile) (numCities).

There are many other parameters which could be varied in a given test. One possibility which was explored briefly{13} was the number of alleles considered for each gene, or the number of different operator types considered. In any case, only the listed parameters are varied in the testing phase. Population size for the TSP GA was set at two times the number of cities in the TSP instance, an accepted quantity (obtained empirically) for TSP population size in much of the literature.

#### 4.1.3 Test runs

Determining a test plan was fairly difficult due to the long running time of the tests, since performing some preliminary testing is necessary to get a sense of what the final test plan will be. One mistake made was using too low a population size. It was earlier considered that twelve was a large enough meta-population, but as shall be seen in test 7 this is not the case.

For all test runs, some of the parameters described in the previous section were fixed to a single value. They are `mutRate: 0.35`, `xRate: 0.85` and `elitismPercent: 0.1`. The chosen mutation rate is probably slightly high. Unfortunately there was not sufficient time remaining to conduct a new suite of tests to verify its effect.

**Test 1**
The first test is performed on the TSP instance dbl\_circ\_52. The following parameters were used for this test run, along with the ones specified above.
`popSize: 12, numGens: 12, maxTSPGens: 500`
Five iterations of this test are performed.

**Test 2**
The second test is performed on the TSP instance berlin52 (the only difference between test 1 and test 2). The following parameters are used.
`popSize: 12, numGens: 12, maxTSPGens: 500`
Five iterations of this test are performed.

**Test 3**
The third test is performed on dbl\_circ\_52, but for a larger population size, larger number of generations, and double the number of maximum TSP generations to evolve. The parameters used are the following:
`popSize: 20, numGens: 20, maxTSPGens: 1000`
Three iterations of this test are performed.

**Test 4**
The fourth test is performed on berlin52 with the same parameters as in test 3.
`popSize: 20, numGens: 20, maxTSPGens: 1000`
As with test 3, three iterations of this test are performed.

**Test 5**
The fifth test is performed on the TSP instance ch150 with the following parameters:
`popSize: 20, numGens: 12, maxTSPGens: 2000`

**Test 6**
The sixth test is performed on a smaller TSP called circle32, which is the outer ring of dbl\_circ\_52. Twenty iterations are performed in order to find the best operators by relative frequency.
`popSize: 12, numGens: 12, maxTSPGens: 100`

**Test 7**
The seventh test is identical to the sixth but is performed with a population size of 32 instead of 12 in order to compare results based on different meta-population sizes.
`popSize: 32, numGens: 12, maxTSPGens: 100`

**Test 8**
The eighth test uses the instance berlin52 once again, identical to test 2 except that far fewer TSP generations are allowed per meta-chromosome.
`popSize: 12, numGens: 12, maxTSPGens: 100`

### 4.2 Results

Results are presented in two main stages. The first stage presents results which provide evidence that MetaGA4TSP is evolving parameter sets which result in better TSP GAs. The second stage presents results of each test in a manner that allows identification of ‘good’ parameters and combinations of parameters. Full output for each test is contained in files of type ‘.out’ (which can be viewed using a text editor) on the CD-ROM accompanying this submission in the ‘testing’ sub-directory. Generational results for tests 1-5 are tabulated in Appendix A.

#### 4.2.1 Average and best fitnesses of meta-GA chromosomes by generation

In order to show that MetaGA4TSP is evolving better parameter sets for TSP GA than are initially obtained by random selection, the following graphs have been compiled using output from tests 1-5 and inputting generational information for average and best fitnesses found into a spreadsheet program (Micrsosoft Excel). Fitness is measured in terms of percentage as described in Chapter 3.2.2.1. The fitness scale (y-axis) is sometimes 0-100%, sometimes 0-120% and sometimes shorter ranges for example 84-102 %. Since the first 5 tests all run for either 12 or 20 generations, the x-axis ranges accordingly from 1-12 or 1-20. The data from which these graphics were compiled are shown in tabular format in Appendix A.

| ![3da9482860fca3156112bdf9ae726230.png](/9a40dd25e39d4555a77dd6dc277a3366) | ![596a3864800e469a56b4e3324af8baab.png](:/011739901377420c9775f6a22dffcf2e) |
| --- | --- |
| (a) | (b) |

**Figure 20:** (a) Average and (b) best fitnesses for each generation of each of five iterations of test 1.

| ![73040226ef61def6683bcc619160cae5.png](/825f26d43ac442479e999d87dd600c8b) | ![e72d94ec98ae446779682882978626aa.png](:/97fc2cd4dd4e474eb055ce8c5ea938f3) |
| --- | --- |
| (a) | (b) |

**Figure 21:** (a) Average and (b) best fitnesses for each generation of each of five iterations of test 2.

| ![e25755abd4ffc572fe662a93122501c4.png](/5a6628a6005c463eba8a159e28fcd362) | ![37780cdab13c2fbd2ff613c0613074e8.png](:/b0ad9630d67f4a3a90d29781f4bb311f) |
| --- | --- |
| (a) | (b) |

**Figure 22:** (a) Average and (b) best fitnesses for each generation of each of three iterations of test 3.

![baa814108646e982d8f84cb6688e0915.png](/d9f57f2800954ff2adc025f3f8811ef4)  ![8a43d02d27457639e76c36446229ac1c.png](/f9ad3f0bfc10458d850bb0595bd5bdd0)

|     |     |
| --- | --- |
| (a) | (b) |

**Figure 23:** (a) Average and (b) best fitnesses for each generation of each of three iterations of test 4. The fitness scale for (a) ranges from 0 to 100 percent while the fitness scale for (b) ranges from 84 to 102 percent.

![131a36d4892de3dc2b96aa8f6a0069b2.png](/e76d29c0bb23426b8899e8b08602b637)
**Figure 24:** Average and best fitnesses for the single iteration of test 5.

#### 4.2.2 Best meta-GA chromosomes found in each iteration of each test.

What follows is a listing of a single chromosome found for each iteration of each test. These were copied from the output files which are available in the ‘testing’ folder on the CD-ROM submitted with this document. In all cases, the chromosome shown is the one with the best fitness from the final generation of evolution. Each heading indicating the test number is followed by a list of four of the variables described in Chapter 4.1.2. This is provided as a memory aid for which test is being discussed, since each of the test runs varies only in those four parameters. After the parameter specification, a table showing each of the chromosomes found for all iterations of the particular test is shown, followed by a short discussion giving a sort of informal analysis of those results including some comparison with results of other tests.

##### Test 1

(tspFile: dbl\_circ\_52, popSize: 12, numGens: 12, maxTSPGens: 500)
Table 1 shows the results for test 1.
Table 1: Best chromosome found in the final generation of each iteration of test 1.

| Iteration | Chromosome | Fitness (% of optimal) |
| --- | --- | --- |
| 1   | \[\[H1R E0.23 ISM 0.25 ERX 0.96 RS\]\] | 96.0041 |
| 2   | \[\[H1R E0.31 IVM 0.95 ERX 0.82 RS\]\] | 89.22793 |
| 3   | \[\[H1R E0.14 SIM 0.55 PMX 0.66 RS\]\] | 100.62 |
| 4   | \[\[S2R E0.3 ISM 0.83 ERX 0.89 RS\]\] | 99.12783 |
| 5   | \[\[H1R E0.11 SIM 0.87 OX 0.45 RS\]\] | 95.198204 |

H1R ISM ERX is found twice with different mutation rates. SIM occurs twice, but not with the popular ERX. Elitism rates are between 0.1 and 0.3, mutation rates are generally high, as are crossover rates.

##### Test 2

(tspFile: berlin52, popSize: 12, numGens: 12, maxTSPGens: 500)
Table 2 shows the results for test 2.
Table 2: Best chromosome found in the final generation of each iteration of test 2.
|  			Iteration 		 |  			Chromosome 		                          |  			Fitness 			(% of optimal) 		 |
|-------------|---------------------------------------|--------------------------|
|  			1 		         |  			[[H1R E0.06 DM 0.52 PMX 0.91 			RS]] 		   |  			92.78841 		               |
|  			2 		         |  			[[S2R E0.08 ISM 0.57 MPX 0.82 			RS]] 		  |  			95.60758 		               |
|  			3 		         |  			[[H1R E0.19 DM 0.81 CX 0.95 			RS]] 		    |  			84.03494 		               |
|  			4 		         |  			[[H1R E0.48 SIM 0.75 MPX 0.57 			T5S]] 		 |  			85.00355 		               |
|  			5 		         |  			[[H1R E0.06 SIM 0.66 CX 0.3 			RS]]  			 		  |  			88.46894 		               |

H1R performs well as in Test 1. SIM and DM are the most common mutaters, MPX and CX the most common recombiners, and RS dominates the selection methods except for a single T5S. In comparing the first two tests, the first obvious difference is the prevalence of ERX in the double circle instance, with not one occurrence of ERX in the chromosomes found in berlin52 testing.

##### Test 3

(tspFile: dbl\_circ\_52, popSize: 20, numGens: 20, maxTSPGens: 1000)
Table 3: Best chromosome found in the final generation of each iteration of test 3.
|  			Iteration 		     |  			Chromosome 		     |  			Fitness 			(% of optimal) 		        |
|---|---|---|
|  			1 		     |  			[[H1R E0.0 SIM 0.35 OX 0.95 			RS]] 		        |  			107.38 		     |
|  			2 		     |  			[[H1R E0.14 EM 0.51 ERX 0.99 			RS]] 		        |  			104.54 		     |
|  			3 		     |  			[[H1R E0.22 SIM 0.28 PMX 0.97 			RS]] 		        |  			107.4 		     |
H1R and RS continue to perform better than their alternatives. SIM is a popular mutation type.

##### Test 4

(tspFile: berlin52, popSize: 20, numGens: 20, maxTSPGens: 1000)
Table 4: Best chromosome found in the final generation of each iteration of test 4.
|  			Iteration 		     |  			Chromosome 		     |  			Fitness 			(% of optimal) 		        |
|---|---|---|
|  			1 		     |  			[[S2R E0.09 SIM 0.35 PMX 0.78 			RS]] 		        |  			98.173 		     |
|  			2 		     |  			[[H1R E0.48 ISM 0.79 MPX 0.97 			T5S]] 		        |  			93.87218 		     |
|  			3 		     |  			[[H1R E0.02 SIM 0.25 MPX 0.9 			T5S]] 		        |  			98.93178 		     |

The most obvious thing to observe here is the good performance of T5S. Previously, RS had completely dominated all evolution, but T5S seems to make its way into the population when evolving berlin52 GAs.

##### Test 5

(tspFile: ch150, popSize: 20, numGens: 12, maxTSPGens: 2000)
Since there was only one iteration of test 5, here is the best chromosome found in the final generation:
`\[\[H1R E0.05 SIM 0.4 PMX 0.95 RS\]\] &lt;93.02081&gt;`


##### Test 6

(tspFile: circle32, popSize: 12, numGens: 12, maxTSPGens: 100)
**Table 5:** Best chromosome found in the final generation of each iteration of test 6.

| Iteration | Chromosome | Fitness (%) |
|---|---|---|
1. [[S2R E0.0 EM 0.6 ERX 0.69 RS]]    <81.05481>
2. [[S1R E0.0 ISM 0.87 CX 0.93 RS]]   <83.16397>
3. [[H1R E0.21 EM 0.85 ERX 0.91 RS]]  <95.49882>
4. [[H1R E0.0 EM 0.78 ERX 0.96 RS]]   <102.8>
5. [[H1R E0.13 EM 0.66 ERX 0.57 RS]]  <94.39697>
6. [[S1R E0.2 EM 0.31 OX 0.84 RS]]    <76.330284>
7. [[S1R E0.04 IVM 0.05 OX 0.94 RS]]  <82.91188>
8. [[H1R E0.05 ISM 0.39 ERX 0.9 RS]]  <95.49882>
9. [[H1R E0.1 DM 0.87 OX 0.73 RS]]    <78.3725>
10. [[H1R E0.22 SIM 0.86 PMX 0.74 RS]] <72.76225>
11. [[H1R E0.17 SIM 0.78 OX 0.85 RS]]  <80.406296>
12. [[S1R E0.04 SIM 0.88 ERX 0.81 RS]] <83.27753>
13. [[S1R E0.04 ISM 0.95 ERX 0.88 RS]] <92.602295>
14. [[H1R E0.19 SIM 0.63 ERX 0.93 RS]] <88.72955>
15. [[H1R E0.29 SIM 0.94 CX 0.93 RS]]  <80.648544>
16. [[H1R E0.55 ISM 0.84 ERX 0.78 RS]] <85.64768>
17. [[H1R E0.46 SIM 0.26 OX 0.65 RS]]  <65.530624>
18. [[H1R E0.03 ISM 0.65 OX 0.71 RS]]  <95.98426>
19. [[H1R E0.48 SIM 0.95 ERX 0.61 RS]] <61.220142>
20. [[H1R E0.17 DM 0.55 OX 0.48 RS]]   <85.73193>


The frequencies of the alleles for the replacement, mutation, crossover and selection genes as tallied from Table 5 are the following:
**Replacement:** S2R:1 S1R:5 H1R:14
**Mutation:** EM:5 ISM:5 IVM:1 DM:2 SIM:7
**Crossover:** PMX:1 CX:2 OX:7 ERX:10 MPX:0
**Selection:** S:0 RS:20 RWS:0 T5S:0

Note that all 5 mutation types appear in the 10 iterations, and that the only missing crossover type is MPX. Crossover rates are high. The single IVM also had the only low mutation rate.

##### Test 7

(tspFile: circle32, popSize: 32, numGens: 12, maxTSPGens: 100)
Table 6: Best chromosome found in the final generation of each iteration of test 7.

| Iteration | Chromosome | Fitness (%) |
1. [[H1R E0.15 ISM 0.8 ERX 0.79 RS]]  <101.9>
2. [[H1R E0.01 ISM 0.4 ERX 0.84 RS]]  <103.7>
3. [[S2R E0.11 ISM 0.87 ERX 0.93 RS]] <102.8>
4. [[H1R E0.04 DM 0.25 OX 0.89 RS]]   <100.2>
5. [[H1R E0.09 ISM 0.98 ERX 0.91 RS]] <103.1>
6. [[H1R E0.18 ISM 0.88 ERX 0.94 RS]] <103.9>
7. [[S1R E0.02 ISM 0.75 ERX 0.77 RS]] <101.5>
8. [[H1R E0.16 ISM 0.84 ERX 0.71 RS]] <102.0>
9. [[H1R E0.0 SIM 0.58 PMX 0.79 RS]]  <89.43794>
10. [[H1R E0.02 ISM 0.51 ERX 0.86 RS]] <103.2>
11. [[S1R E0.18 ISM 0.78 ERX 0.78 RS]] <101.4>
12. [[H1R E0.07 EM 0.49 ERX 0.94 RS]]  <95.49882>
13. [[H1R E0.2 ISM 0.63 ERX 0.97 RS]]  <102.8>
14. [[H1R E0.29 EM 0.95 ERX 0.8 RS]]   <95.49882>
15. [[H1R E0.16 EM 0.75 ERX 0.84 RS]]  <103.2>
16. [[S1R E0.15 ISM 0.95 ERX 0.86 RS]] <101.6>
17. [[S2R E0.04 SIM 0.43 OX 0.99 RS]]  <101.4>
18. [[H1R E0.06 ISM 0.83 OX 0.99 RS]]  <103.0>
19. [[H1R E0.22 ISM 0.78 ERX 0.89 RS]] <104.0>
20. [[H1R E0.2 SIM 0.47 OX 0.86 RS]]   <94.90463>

The frequencies of the alleles for the replacement, mutation, crossover and selection genes as tallied from Table 6 are the following:
**Replacement**: S2R:2 S1R:3 H1R:15
**Mutation**: EM:3 ISM:13 IVM:0 DM:1 SIM:3
**Crossover**: PMX:1 CX:0 OX:4 ERX:15 MPX:0
**Selection**: S:0 RS:20 RWS:0 T5S:0

Test 7 comes up with similar results as test 6, except they are more pronounced. ISM seems to perform better with the increased population size.

##### Test 8

(tspFile: berlin52, popSize: 12, numGens: 12, maxTSPGens: 100)
Table 7: Best chromosome found in the final generation of each iteration of test 8.

| Iteration | Chromosome | Fitness (%) |
|---|---|---|
| 1 | [[H1R E0.06 SIM 0.85 ERX 0.73 RS]] | <85.18389> |
| 2 | [[S2R E0.01 IVM 0.89 ERX 0.86 RS]] | <77.37517> |
| 3 | [[H1R E0.08 SIM 0.57 OX 0.98 RS]] | <89.221016> |
| 4 | [[H1R E0.44 DM 0.61 OX 0.87 RS]] | <76.409744> |
| 5 | [[H1R E0.45 ISM 0.71 MPX 0.51 RS]] | <69.945885> |
| 6 | [[H1R E0.52 SIM 0.68 ERX 0.66 RS]] | <75.71515> |
| 7 | [[H1R E0.44 SIM 0.65 MPX 0.96 RS]] | <78.58353> |
| 8 | [[H1R E0.01 SIM 0.58 PMX 0.77 RS]] | <84.53595> |
| 9 | [[S2R E0.07 ISM 0.69 ERX 0.8 RS]] | <79.74952> |
| 10 | [[H1R E0.02 IVM 0.18 OX 0.97 RS]] | <83.12115> |


The frequencies of the alleles for the replacement, mutation, crossover and selection genes as tallied from Table 7 are the following:
**Replacement**: S2R:2 S1R:0 H1R:8
**Mutation**: EM:0 ISM:2 IVM:2 DM:1 SIM:5
**Crossover**: PMX:1 CX:0 OX:3 ERX:4 MPX:2
**Selection**: S:0 RS:10 RWS:0 T5S:0

## CHAPTER 5: CONCLUSION

While the results show that average fitness of the population increases over time (see Figures 20-24), the best distances found in the last generation are generally not all that much better than the best ones found in the first generation. This is because the chances of randomly generating a good chromosome given the current structure are not very low. The best fitness found in each generation also increases over time, in general, although in some cases good tours were found very early on by chance. The chance of a good tour being found quickly is governed by two non-deterministic factors: the initial population of the meta-GA and the initial populations of the TSP GAs. In the former case, if a good combination of operators and parameters is randomly generated, it will most likely dominate the population which will quickly converge. In the latter case, a very good initial TSP population may be generated for some mediocre meta-GA chromosome, but that chromosome may be lost in subsequent generations when less good initial TSP populations are generated. In some cases, where other good meta-GA chromosomes are not found, it may not be lost, but may cause premature population convergence due to elitism.

Due to the limited variety and strength of operators implemented along with the small size of the meta-chromosome, it is fairly clear that MetaGA4TSP does not tell us anything about the performance of particular combinations of those operators that could not have been determined in a similar amount of time from empirical testing (observation of TSP GA performance with varied parameter combinations guided by human intuition). However, since it is clear that MetaGA4TSP does generally find better combinations of TSP parameters through evolution, the system could potentially be extended and improved to include a much larger parameter set and possibly provide more interesting results. Whether or not this would be worthwhile depends largely on whether or not good parameter strategies for small TSP instances can be successfully applied to larger instances. It also depends on whether the parameter sets found when running the GA for a small number of maximum TSP generations can be extrapolated to give results similar to those obtained by running the same meta-GA with an increased number of maximum TSP generations. It is unlikely that this is the case, at least for large differences.

At least one interesting result of this experiment is the observation of the good results obtained with H1R, which outperformed S1R and S2R in every test performed. The effect of H1R, we recall from Chapter 3.1.4.4, is the same as S1R except that the fittest individual among the two parents and their single offspring is chosen to survive in the next generation, instead of strictly the offspring as in S1R. While the good performance of H1R may seem like no surprise to some, there has been some speculation that unfit children were required in a population as stepping stones towards better individuals. The overwhelmingly good performance of H1R in MetaGA4TSP seems to counter this argument.
Elitism rates were low in general, but sometimes as high as 50 percent.

The most successful mutation types were SIM and ISM, two very different operators. It seems surprising that the success of SIM was not shared with IVM, since they seem very similar.

The most successful crossover operator, at least on TSP GAs running for a small number of generations, was ERX. It performed the best on tests 1, 6, 7 and 8. In test 2, MPX CX and PMX performed well. Test 3 saw results divided between OX, ERX and PMX, test 4 between PMX and MPX. The single iteration of test 5 (the 150-city problem) found a chromosome containing PMX.

The most dominated gene in the meta-GA chromosome by far was the last gene, corresponding to the selection method. As can easily be seen from test output, it quickly converges to RS in almost all cases. The only exceptions are tests 2 and 4, corresponding to berlin52 GAs running for 500 and 1000 generations each, respectively. It seems interesting that it is only these two tests that exhibit good results with T5S, and since nothing similar was observed in the circle-shaped TSP instances, these results suggest some correlation between selection method and city layout.

### 5.1 Problems encountered and potential solutions

It almost goes without saying that in performing a work of this magnitude for the first time, countless mistakes are made and therefore countless lessons are learned. One of the biggest problems involved trying to avoid re-doing work that has already been done. Unfortunately, research was not conducted in a sufficiently professional manner, nor was the goal chosen with sufficient foresight, to avoid this pitfall. One lesson in particular that will be remembered is that online sources which have not been officially published are sometimes unreliable. Misleading literature impeded progress on more than one occasion, e.g. with frequently misunderstood concepts such as coevolution.

A specific problem inherent with the system seems to be related to the fact that the fitness of a particular chromosome varies each time it is calculated, since the random seed used to create the population is not preserved. Thus good chromosomes will sometimes not be found if they get ‘bad luck’. This problem could perhaps be alleviated somewhat, or at least monitored, by maintaining a unique ID for each chromosome and keeping a list of all its calculated fitnesses. Another solution might be to add facilities to preserve and re-use random seeds.

Another lesson learned was that the testing phase in a work of this type demands attentive consideration. Testing was neglected in this work (partly due to late changes in the implementation){14}, and the utility of the results suffered as a consequence.

### 5.2 Opportunity for future work

While the meta-GA implemented here is rudimentary, given more time it is fairly certain that the system could be enhanced on more than one level with additional parameters and operators in order to enhance performance.
For example, one serious limitation is that the same parameters allow only one type of operation throughout evolution of the TSP GA. It has been shown in other work that best results are achieved by following one strategy until convergence, and then switching strategies. It would not be difficult to extend the meta-GA chromosome to follow two different strategies, and then allow evolution to find a good combination. There is also the possibility of making the chromosome as large as the number of operators and parameters used, and allowing each allele to specify a probability of application for that gene.

It has also been mentioned that the operators used are among the most basic and simple developed for the TSP. With the exception of the H1R replacement scheme, no heuristic methods are used and this partially explains the system’s relative uselessness with large problems. Improvements not involving the meta-GA chromosome might be to optimize each TSP population heuristically before evolution. This should improve individual results and allow larger problem sizes. Also, the GA probably should have been implemented so that each individual in the meta-population starts with the same set of tours each time a chromosome is evaluated. This was actually considered at one point, but it was thought that results would be skewed unacceptably towards the choice of initial population. In retrospect, the knowledge that each TSP evolution starts from the same state might offset any detriments and it is unfortunate that there was insufficient time to test both methods.

Then there are improvements to be made at the meta-GA level. Here we encounter the same problem as in the original TSP GA: What types of operators and parameters should be used?

## REFERENCES

Applegate, David; Bixby, Robert; Chvatal, Vasek and Cook, William (2001). Combinatorial Optimization and Networked Combinatorial Optimization Research and Development Environment (Concorde), Princeton University Mathematics Department, http://www.math.princeton.edu/tsp/concorde.html visited 4/5/2003.

Black, Paul E. (1998). Dictionary of Algorithms and Data Structures, National Institute of Standards and Technology. http://www.nist.gov/dads/ visited 3/25/2003.

Brady, R.M. (1985). Optimization Strategies Gleaned From Biological Evolution, Nature, 317, pp.804-806. Cited in Larrañaga et al (1999).

Cormen, Thomas H., Leiserson, Charles E. and Rivest, Ronald L. (1989) Introduction to Algorithms, MIT Press, pp. 916-960.

Darwin, Charles (1859). The Origin of Species, http://www.literature.org/authors/darwin-charles/the-origin-of-species/
visited 3/19/2003.

Davis, L. (1985). Applying Adaptive Algorithms to Epistatic Domains, Proceedings of the International Joint Conference on Artificial Intelligence, pp. 162-164. Cited in Larrañaga et al (1999).

DeJong, K. (1975). An Analysis of the Behaviour of a Class of Genetic Adaptive Systems, PhD thesis, University of Michigan.

Dolan, Paul Kent (2002). Traveller, http://www.well.com/user/xanthian/java/TravellerDoc.html visited 3/27/2003.

Faupel, M. (1999). GAJIT – A Simple Java Genetic Algorithms Package. http://www.angelfire.com/ca/Amnesiac/gajit.html visited 3/19/2003.

Goldberg, D.E. and Lingle, Jr., R. (1985). Alleles, Loci and the TSP, in Grefenstette, J.J. (Ed.) Proceedings of the First International Conference on Genetic Algorithms and Their Applications, Lawrence Erlbaum, Hillsdale, New Jersey, pp.154-159. Cited in Larrañaga et al (1999).

Gottlieb, Jens and Kruse, Torben (2000). Selection in Evolutionary Algorithms for the Traveling Salesman Problem, Proceedings of the 2000 ACM symposium on Applied computing, Como, Italy.

Grefenstette, J.J. (1986). Optimization of control parameters for genetic algorithms, IEEE Transcript Systems, Man and Cybernetics, SMC-16(1), 122-128. Cited in Smith and Fogarty (1997).

Heitkötter, J. and Beasley, D., (2000). Hitch-Hiker’s Guide to Evolutionary Computation, issue 8.1, released 29 March 2000. http://www.cs.bham.ac.uk/Mirrors/ftp.de.uu.net/EC/clife/www/Q99.htm visited 4/6/2003.

Holland, J. (1975). Adaptation in Natural and Artificial Systems, University of Michigan Press, Ann Arbor. Cited in Larrañaga et al (1999).

Larrañaga, P., Kuijpers, C.M.H., Murga, R.H., Inza, I., and Dizdarevic, S. (1999) Genetic Algorithms for the Travelling Salesman Problem: A Review of Representations and Operators, Artificial Intelligence Review 13 (2): 129-170, April 1999.

Lin, S. and Kernighan, B.W. (1973). An effective heuristic algorithm for the traveling salesman problem, Oper. Res., 21(2):498--516, cited at http://citeseer.nj.nec.com/context/500/0 visited 3/21/2003. Cited in Vaidyanathan, Basu (1998).

Merriam-Webster Dictionary, http://www.m-w.com visited 4/4/2003.

Mathias, K. and Whitley, D. (1992). Genetic Operators, The Fitness Landscape, and The Travelling Salesman Problem, Parallel Problem Solving from Nature, 2. [http://www.evalife.dk/bbase/list\_author.php?au\_id=273](http://www.evalife.dk/bbase/list_author.php?au_id=273) visited 3/21/2003.

Mernik, M., Crepinsek, M. and Zumer, V. (2000). A MetaEvolutionary Approach in Searching of the Best Combination of Crossover Operators for the TSP, University of Maribor. http://marcel.uni-mb.si/marjan/NN2000.ps visited 3/19/2003.

Moran, Laurence (1993-1997). What is Evolution? http://www.talkorigins.org/faqs/evolution-definition.html visited 4/6/2003

Morrison, Jason (1998). Co-Evolution and Genetic Algorithms, Master Thesis, Carleton University. http://www.scs.carleton.ca/~morrison/ visited 3/27/2003.

Muhlenbein, H., Gorges-Schleuter, M. and Kramer, O. (1988). Evolution Algorithms in Combinatorial Optimization, Parallel Computing, 7, pp. 65-85. Cited in Larrañaga et al. (1999).

Obitko, Marek (1998). Introduction to Genetic Algorithms. Czech Technical University, Faculty of Engineering. http://cs.felk.cvut.cz/~xobitko/ga/ visited 3/27/2003.

Oliver, I.M., Smith, D.J. and Holland, J.R.C. (1987). A Study of Permutation Crossover Operators on the TSP, in Grefenstette, J.J. (Ed.) Genetic Algorithms and Their Applications: Proceedings of the Second international Conference, Lawrence Erlbaum, Hillsdale, New Jersey, pp. 224-230.

Oppacher, Franz (1999). 95.417: Evolutionary Programming course notes, Carleton University.

Petrovski, A. and McCall, J.A.W (1998). Comparison of a statistical approach to GA parameter selection with the meta-GAs method, extended abstract, School of Computer and Mathemeatical Sciences, The Robert Gordon University, Aberdeen, Scotland. http://www.scms.rgu.ac.uk/research/biomed/TR2.pdf visited 4/6/2003.

Potter, Mitchell A. (1999). Evolutionary Computation Toolkit, George Mason University. http://cs.gmu.edu/~mpotter/eckit/ visited 3/19/2003.

Reinelt, Gerhard (2001). TSPLIB, University of Heidelburg. http://www.iwr.uni-heidelberg.de/groups/comopt/software/TSPLIB95/ visited 3/31/2003.

Rotstan, Neil (2003), JGAP: The Java Genetic Algorithms Package, http://jgap.sourceforge.net visited 3/27/2003.

Schaffer, J.D., Caruana, R.A., Eshelman, L.J., and Das, R. (1989). A study of control parameters affecting online performance of genetic algorithms for function optimization. In Schaffer, J.D. (ed.), Proceedings of the Third International Conference on Genetic Algorithms, pp. 61-68. Morgan Kaufmann. Cited in Smith and Fogarty (1997).

Smith, J.E. and Fogarty, T. C. (1997). Operator and Parameter Adaptation in Genetic Algorithms, Soft Computing, 1(2):81—87.

Vaidyanathan, Basu (1998). Comparison of various approaches to solving Traveling Salesman Problem. http://www.lips.utexas.edu/~scott/ta/project9/TSPReport.htm visited 3/23/2003.

Whitley, D., Starkweather, T. and D'Ann Fuquay (1989). Scheduling Problems and Travelling Salesman: The Genetic Edge Recombination Operator, in Schaffer, J. (Ed.) Proceedings on the Third International Conference on Genetic Algorithms, Morgan Kaufman
* * *
## APPENDIX A: ADDITIONAL TEST DATA

TESTING:
In all of the generational information tables in the next sections, the chromosome ‘found’ by the meta-GA is the fittest chromosome from the final generation, which is shown in the last row of each table. The data from which these tables were compiled are the text output of each test session, available on disk in files of type ‘.out’ (see Appendix C).
Table 8: Best chromosome found in each generation of test 1, iteration 1 of 5.
|  			Gen 		     |  			Average 			fitness (%) 		        |  			Best 			chromosome with best fitness (%) (optimal distance:  242.1645) 		        |
|---|---|---|
|  			0 		     |  			43.9217 		     |  			[[H1R E0.23 EM 0.25 ERX 0.96 			RS]] <99.41> d: 243.7405 		        |
|  			1 		     |  			48.5194 		     |  			[[H1R E0.23 EM 0.25 ERX 0.96 			RS]] <99.13> d: 244.2952 		        |
|  			2 		     |  			57.5408 		     |  			[[H1R E0.23 EM 0.25 ERX 0.96 			RS]] <96.82> d: 250.1133 		        |
|  			3 		     |  			59.1664 		     |  			[[H1R E0.23 EM 0.25 ERX 0.96 			RS]] <100.4> d: 242.1645 		        |
|  			4 		     |  			59.1557 		     |  			[[S1R E0.23 EM 0.25 ERX 0.96 			RS]] <82.7>  d: 292.7796 		        |
|  			5 		     |  			58.2230 		     |  			[[H1R E0.23 EM 0.33 ERX 0.63 			RS]] <75.8>  d: 319.3326 		        |
|  			6 		     |  			72.3307 		     |  			[[H1R E0.23 EM 0.33 ERX 0.63 			RS]] <81.25> d: 298.0188 		        |
|  			7 		     |  			79.2672 		     |  			[[H1R E0.23 EM 0.33 ERX 0.63 			RS]] <95.94> d: 252.4100 		        |
|  			8 		     |  			76.4758 		     |  			[[H1R E0.23 EM 0.25 ERX 0.63 			RS]] <94.20> d: 257.0644 		        |
|  			9 		     |  			75.4453 		     |  			[[S1R E0.23 EM 0.95 ERX 0.63 			RS]] <99.05> d: 244.492 		        |
|  			10 		     |  			78.6791 		     |  			[[S1R E0.23 EM 0.95 ERX 0.63 			RS]] <93.43> d: 259.20 		        |
|  			11 		     |  			74.1991 		     |  			[[H1R E0.23 ISM 0.25 ERX 0.96 			RS]] <96.0041> d: 252.2439 		        |

Table 9: Best chromosome found in each generation of test 1, iteration 2 of 5.
|  			Gen 		     |  			Average 			fitness (%) 		        |  			Best 			chromosome with best fitness (%) (optimal distance:  242.1645) 		        |
|---|---|---|
|  			0 		     |  			41.5031 		     |  			[[S2R E0.16 DM 0.95 ERX 0.22 			RS]] <64.27243> 		        |
|  			1 		     |  			49.0695 		     |  			[[H1R E0.31 DM 0.95 ERX 0.22 			RS]] <68.45345> 		        |
|  			2 		     |  			52.955 		     |  			[[S1R E0.16 DM 0.96 ERX 0.22 			RS]] <62.63307> 		        |
|  			3 		     |  			55.0410 		     |  			[[H1R E0.31 DM 0.95 ERX 0.93 			RS]] <93.24107> 		        |
|  			4 		     |  			60.2867 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <81.33729> 		        |
|  			5 		     |  			65.6639 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <87.57323> 		        |
|  			6 		     |  			68.8510 		     |  			[[H1R E0.31 DM 0.95 ERX 0.93 			RS]] <84.21701> 		        |
|  			7 		     |  			70.2930 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <83.91271> 		        |
|  			8 		     |  			74.9361 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <83.62687> 		        |
|  			9 		     |  			75.7166 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <81.42511> 		        |
|  			10 		     |  			79.3259 		     |  			[[H1R E0.31 DM 0.95 ERX 0.82 			RS]] <90.95045> 		        |
|  			11 		     |  			77.3659 		     |  			[[H1R E0.31 IVM 			0.95 ERX 0.82 RS]] <89.22793> 		        |


**Table 10:** Best chromosome found in each generation of test 1, iteration 3 of 5.
|  			Gen 		     |  			Average 			fitness (%) 		        |  			Best 			chromosome with best fitness (%) (optimal distance:  242.1645) 		        |
|---|---|---|
|  			0 		     |  			46.1552 		     |  			[[H1R E0.83 SIM 0.55 MPX 0.66 			RS]] <60.970905> 		        |
|  			1 		     |  			53.5920 		     |  			[[H1R E0.39 EM 0.16 ERX 0.66 			RS]] <66.99468> 		        |
|  			2 		     |  			56.2586 		     |  			[[H1R E0.39 EM 0.16 ERX 0.66 			RS]] <69.758354> 		        |
|  			3 		     |  			61.5981 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <87.87432> 		        |
|  			4 		     |  			58.384 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <85.22443> 		        |
|  			5 		     |  			59.5486 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <87.319885> 		        |
|  			6 		     |  			64.9386 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <93.8515> 		        |
|  			7 		     |  			69.7274 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <90.38534> 		        |
|  			8 		     |  			70.2595 		     |  			[[H1R E0.26 SIM 0.55 MPX 0.66 			RS]] <91.22363> 		        |
|  			9 		     |  			73.0051 		     |  			[[H1R E0.26 SIM 0.55 PMX 0.66 			RS]] <92.28316> 		        |
|  			10 		     |  			77.8434 		     |  			[[H1R E0.26 SIM 0.55 PMX 0.66 			RS]] <99.575676> 		        |
|  			11 		     |  			83.0512 		     |  			[[H1R E0.14 SIM 0.55 PMX 0.66 			RS]] <100.62> 		        |

**Table 11:** Best chromosome found in each generation of test 1, iteration 4 of 5.
|  			Gen 		     |  			Average 			fitness (%) 		        |  			Best 			chromosome with best fitness (%) (optimal distance:  242.1645) 		        |
|---|---|---|
|  			0 		     |  			42.983 		     |  			[[S1R E0.78 SIM 0.84 ERX 0.89 			RS]] <71.93171> 		        |
|  			1 		     |  			51.6525 		     |  			[[S2R E0.77 EM 0.83 ERX 0.89 			RS]] <73.92418> 		        |
|  			2 		     |  			65.5781 		     |  			[[S1R E0.04 SIM 0.0 OX 0.89 			RS]] <89.865> 		        |
|  			3 		     |  			69.5876 		     |  			[[H1R E0.27 IVM 0.65 PMX 0.69 			RS]] <96.82194> 		        |
|  			4 		     |  			69.1744 		     |  			[[S2R E0.0 SIM 0.83 ERX 0.89 			RS]] <88.7417> 		        |
|  			5 		     |  			66.1166 		     |  			[[S1R E0.3 ISM 0.83 ERX 0.89 			RS]] <99.12783> 		        |
|  			6 		     |  			77.1611 		     |  			[[S2R E0.0 EM 0.0 OX 0.89 RS]] 			<94.20381> 		        |
|  			7 		     |  			74.5064 		     |  			[[S2R E0.3 ISM 0.83 ERX 0.89 			RS]] <99.575676> 		        |
|  			8 		     |  			72.1997 		     |  			[[S2R E0.3 ISM 0.83 ERX 0.89 			RS]] <99.575676> 		        |
|  			9 		     |  			80.1548 		     |  			[[S2R E0.3 ISM 0.83 ERX 0.89 			RS]] <99.12783> 		        |
|  			10 		     |  			75.9295 		     |  			[[H1R E0.52 SIM 0.83 OX 0.89 			RS]] <92.35921> 		        |
|  			11 		     |  			83.7958 		     |  			[[S2R E0.3 ISM 0.83 ERX 0.89 			RS]] <99.12783> 		        |

**Table 12:** Best chromosome found in each generation of test 1, iteration 5 of 5.
|  			Gen 		     |  			Average 			fitness (%) 		        |  			Best 			chromosome with best fitness (%) (optimal distance:  242.1645) 		        |
|---|---|---|
|  			0 		     |  			42.1892 		     |  			[[S1R E0.11 DM 0.2 OX 0.45 			RS]] <76.68994> 		        |
|  			1 		     |  			48.7393 		     |  			[[S1R E0.11 DM 0.2 OX 0.45 			RS]] <82.04523> 		        |
|  			2 		     |  			52.0904 		     |  			[[S1R E0.11 SIM 0.87 OX 0.45 			RS]] <82.63873> 		        |
|  			3 		     |  			55.3235 		     |  			[[S2R E0.11 SIM 0.87 OX 0.45 			RS]] <86.4652> 		        |
|  			4 		     |  			55.4222 		     |  			[[H1R E0.42 SIM 0.99 OX 0.45 			RS]] <88.421974> 		        |
|  			5 		     |  			61.6814 		     |  			[[H1R E0.11 SIM 0.87 OX 0.45 			RS]] <87.1543> 		        |
|  			6 		     |  			71.1835 		     |  			[[H1R E0.11 SIM 0.81 OX 0.45 			RS]] <99.40809> 		        |
|  			7 		     |  			72.7370 		     |  			[[H1R E0.11 SIM 0.2 PMX 0.45 			RS]] <95.29064> 		        |
|  			8 		     |  			77.0313 		     |  			[[H1R E0.11 SIM 0.99 OX 0.73 			RS]] <92.66964> 		        |
|  			9 		     |  			78.2865 		     |  			[[H1R E0.11 SIM 0.99 OX 0.73 			RS]] <93.45137> 		        |
|  			10 		     |  			82.0574 		     |  			[[H1R E0.11 SIM 0.87 OX 0.45 			RS]] <94.11777> 		        |
|  			11 		     |  			78.0845 		     |  			[[H1R E0.11 SIM 0.87 OX 0.45 			RS]] <95.198204> 		        |

**Table 13:** Best chromosome found in each generation of test 2, iteration 1 of 5.
|  			Gen 		     |  Average fitness (%) |  			Best 			chromosome with Best Fitness (%) (optimal distance:  7542) 		        |
|---|---|---|
|  			0 		     |  			53.8901 		     |  			[[S1R E0.09 IVM 0.89 ERX 0.91 			RS]] <82.37626> 		        |
|  			1 		     |  			61.1243 		     |  			[[H1R E0.11 DM 0.83 ERX 0.91 			RS]] <86.74132> 		        |
|  			2 		     |  			70.1882 		     |  			[[H1R E0.11 IVM 0.89 ERX 0.91 			RS]] <92.32119> 		        |
|  			3 		     |  			78.9324 		     |  			[[H1R E0.11 DM 0.83 ERX 0.91 			RS]] <87.1208> 		        |
|  			4 		     |  			81.7841 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <92.02366> 		        |
|  			5 		     |  			79.9810 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <92.936584> 		        |
|  			6 		     |  			89.0703 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <99.96864> 		        |
|  			7 		     |  			86.0896 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <93.84352> 		        |
|  			8 		     |  			87.3789 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <95.47782> 		        |
|  			9 		     |  			85.9658 		     |  			[[H1R E0.06 ISM 0.89 ERX 0.91 			RS]] <97.771324> 		        |
|  			10 		     |  			84.3188 		     |  			[[H1R E0.06 ISM 0.33 ERX 0.91 			RS]] <90.574814> 		        |
|  			11 		     |  			84.0904 		     |  			[[H1R E0.06 DM 0.52 PMX 0.91 			RS]] <92.78841> 		        |

**Table 14:** Best chromosome found in each generation of test 2, iteration 2 of 5.
|  			Gen 		     |  Average fitness (%)  |  			Best 			chromosome with Best Fitness (%) (optimal distance:  7542) 		        |
|---|---|---|
|  			0 		     |  			54.3758 		     |  			[[S2R E0.51 DM 0.73 ERX 0.17 			RS]] <69.95126> 		        |
|  			1 		     |  			48.5254 		     |  			[[S2R E0.51 DM 0.73 ERX 0.17 			RS]] <73.21652> 		        |
|  			2 		     |  			60.4545 		     |  			[[S1R E0.05 ISM 0.72 MPX 0.49 			RS]] <86.33817> 		        |
|  			3 		     |  			58.2749 		     |  			[[S1R E0.05 ISM 0.72 MPX 0.49 			RS]] <89.89231> 		        |
|  			4 		     |  			64.6409 		     |  			[[H1R E0.08 ISM 0.72 MPX 0.49 			RS]] <91.694885> 		        |
|  			5 		     |  			68.2476 		     |  			[[S2R E0.05 ISM 0.72 MPX 0.49 			RS]] <89.2999> 		        |
|  			6 		     |  			71.7683 		     |  			[[S1R E0.05 ISM 0.72 MPX 0.82 			RS]] <87.76684> 		        |
|  			7 		     |  			64.6642 		     |  			[[S1R E0.08 ISM 0.72 MPX 0.74 			RS]] <88.070656> 		        |
|  			8 		     |  			71.9096 		     |  			[[S2R E0.32 ISM 0.57 MPX 0.49 			RS]] <89.870155> 		        |
|  			9 		     |  			71.5531 		     |  			[[S2R E0.32 ISM 0.72 MPX 0.82 			RS]] <92.21696> 		        |
|  			10 		     |  			82.1964 		     |  			[[H1R E0.08 ISM 0.57 MPX 0.49 			RS]] <96.07178> 		        |
|  			11 		     |  			84.5017 		     |  			[[S2R E0.08 ISM 0.57 MPX 0.82 			RS]] <95.60758> 		        |

**Table 15:** Best chromosome found in each generation of test 2, iteration 3 of 5.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
59.9072
\[\[S2R E0.45 DM 0.81 CX 0.95 RS\]\] &lt;83.080795&gt;
1
59.7411
\[\[S2R E0.45 DM 0.81 CX 0.95 RS\]\] &lt;85.876816&gt;
2
59.9775
\[\[H1R E0.45 DM 0.81 CX 0.95 RS\]\] &lt;84.30377&gt;
3
66.1370
\[\[S1R E0.56 ISM 0.26 MPX 0.95 RS\]\] &lt;84.4084&gt;
4
64.9705
\[\[S2R E0.45 DM 0.81 CX 0.95 RS\]\] &lt;81.817955&gt;
5
74.9528
\[\[S1R E0.56 ISM 0.26 MPX 0.95 RS\]\] &lt;88.04441&gt;
6
77.4298
\[\[H1R E0.19 DM 0.81 CX 0.95 RS\]\] &lt;89.26773&gt;
7
68.6437
\[\[H1R E0.19 DM 0.81 CX 0.95 RS\]\] &lt;85.721565&gt;
8
67.9205
\[\[H1R E0.19 DM 0.81 CX 0.95 RS\]\] &lt;84.79138&gt;
9
76.0971
\[\[S1R E0.55 DM 0.81 CX 0.95 RS\]\] &lt;82.688896&gt;
10
74.3829
\[\[H1R E0.19 DM 0.19 CX 0.95 RS\]\] &lt;84.2282&gt;
11
75.2548
\[\[H1R E0.19 DM 0.81 CX 0.95 RS\]\] &lt;84.03494&gt;

**Table 16:** Best chromosome found in each generation of test 2, iteration 4 of 5.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
54.9891
\[\[H1R E0.48 IVM 0.76 MPX 0.57 T5S\]\] &lt;72.765594&gt;
1
58.3456
\[\[H1R E0.48 IVM 0.76 ERX 0.8 RWS\]\] &lt;81.59698&gt;
2
55.1140
\[\[H1R E0.48 IVM 0.76 ERX 0.8 RWS\]\] &lt;78.54947&gt;
3
58.5442
\[\[H1R E0.35 SIM 0.7 OX 0.57 T5S\]\] &lt;83.03972&gt;
4
64.8335
\[\[H1R E0.35 SIM 0.7 MPX 0.57 T5S\]\] &lt;85.797&gt;
5
67.5457
\[\[H1R E0.48 SIM 0.7 MPX 0.57 T5S\]\] &lt;80.71965&gt;
6
65.5348
\[\[H1R E0.48 SIM 0.75 MPX 0.57 T5S\]\] &lt;79.123474&gt;
7
65.5525
\[\[H1R E0.48 SIM 0.75 MPX 0.57 T5S\]\] &lt;78.86983&gt;
8
71.4123
\[\[H1R E0.35 SIM 0.7 MPX 0.57 T5S\]\] &lt;85.9542&gt;
9
69.5491
\[\[H1R E0.35 SIM 0.7 MPX 0.57 T5S\]\] &lt;83.590775&gt;
10
67.2859
\[\[H1R E0.48 SIM 0.75 MPX 0.57 T5S\]\] &lt;82.321495&gt;
11
66.1740
\[\[H1R E0.48 SIM 0.75 MPX 0.57 T5S\]\] &lt;85.00355&gt;

**Table 17:** Best chromosome found in each generation of test 2, iteration 5 of 5.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
54.8189
\[\[H1R E0.35 EM 0.85 ERX 0.32 RS\]\] &lt;79.26082&gt;
1
55.8373
\[\[H1R E0.35 EM 0.85 ERX 0.32 RS\]\] &lt;81.76816&gt;
2
68.0728
\[\[S1R E0.07 ISM 0.73 MPX 0.32 RS\]\] &lt;87.46529&gt;
3
72.6208
\[\[S2R E0.06 SIM 0.37 ERX 0.32 RS\]\] &lt;83.54027&gt;
4
77.4260
\[\[S2R E0.06 SIM 0.37 ERX 0.32 RS\]\] &lt;84.42936&gt;
5
79.3840
\[\[H1R E0.06 SIM 0.37 ERX 0.32 RS\]\] &lt;87.26076&gt;
6
76.4576
\[\[H1R E0.06 SIM 0.37 MPX 0.32 RS\]\] &lt;84.71405&gt;
7
70.6642
\[\[S2R E0.11 SIM 0.37 ERX 0.32 RS\]\] &lt;84.58506&gt;
8
75.1656
\[\[H1R E0.06 SIM 0.37 ERX 0.3 RS\]\] &lt;88.70839&gt;
9
74.9539
\[\[H1R E0.06 SIM 0.37 MPX 0.86 RS\]\] &lt;91.93296&gt;
10
73.0580
\[\[H1R E0.06 SIM 0.37 MPX 0.86 RS\]\] &lt;92.10304&gt;
11
76.6050
\[\[H1R E0.06 SIM 0.66 CX 0.3 RS\]\] &lt;88.46894&gt;

**Table 18:** Best chromosome found in each generation of test 3, iteration 1 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
55.3061
\[\[S2R E0.07 SIM 0.55 MPX 0.65 RS\]\] &lt;94.15867&gt;
1
71.5843
\[\[S1R E0.12 ISM 0.91 OX 0.7 RWS\]\] &lt;99.04804&gt;
2
77.5471
\[\[S1R E0.29 IVM 0.35 OX 0.95 RS\]\] &lt;101.05&gt;
3
76.5244
\[\[S2R E0.07 SIM 0.18 OX 0.95 RS\]\] &lt;104.74&gt;
4
79.0373
\[\[S2R E0.07 SIM 0.18 OX 0.95 RS\]\] &lt;105.58&gt;
5
82.3042
\[\[S2R E0.07 SIM 0.18 OX 0.95 RS\]\] &lt;104.67&gt;
6
87.3844
\[\[H1R E0.29 IVM 0.35 OX 0.95 RS\]\] &lt;106.66&gt;
7
84.7394
\[\[S2R E0.07 SIM 0.18 OX 0.73 RS\]\] &lt;105.46&gt;
8
90.7365
\[\[H1R E0.07 SIM 0.35 OX 0.95 RS\]\] &lt;106.17&gt;
9
94.9769
\[\[H1R E0.07 SIM 0.35 PMX 0.73 RS\]\] &lt;106.32&gt;
10
99.1571
\[\[H1R E0.07 SIM 0.18 OX 0.95 RS\]\] &lt;108.13&gt;
11
94.694
\[\[H1R E0.07 SIM 0.35 PMX 0.95 RS\]\] &lt;108.15&gt;
12
97.364
\[\[H1R E0.07 SIM 0.35 PMX 0.95 RS\]\] &lt;107.48&gt;
13
93.9891
\[\[H1R E0.07 SIM 0.35 PMX 0.95 RS\]\] &lt;105.81&gt;
14
94.4990
\[\[S2R E0.07 SIM 0.35 PMX 0.95 RS\]\] &lt;107.39&gt;
15
97.1125
\[\[S2R E0.07 SIM 0.35 OX 0.95 RS\]\] &lt;107.47&gt;
16
96.0431
\[\[H1R E0.07 SIM 0.3 OX 0.95 RS\]\] &lt;107.28&gt;
17
92.7159
\[\[S2R E0.03 SIM 0.35 OX 0.95 RS\]\] &lt;103.84&gt;
18
99.7364
\[\[H1R E0.07 SIM 0.35 OX 0.95 RS\]\] &lt;107.04&gt;
19
97.8578
\[\[H1R E0.0 SIM 0.35 OX 0.95 RS\]\] &lt;107.38&gt;

**Table 19:** Best chromosome found in each generation of test 3, iteration 2 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
56.5769
\[\[H1R E0.35 IVM 0.51 ERX 0.81 RS\]\] &lt;89.72947&gt;
1
68.5787
\[\[H1R E0.26 EM 0.51 ERX 0.81 RS\]\] &lt;106.28&gt;
2
76.3711
\[\[H1R E0.26 EM 0.51 ERX 0.74 RS\]\] &lt;103.95&gt;
3
79.5644
\[\[H1R E0.26 EM 0.51 ERX 0.74 RS\]\] &lt;99.575676&gt;
4
86.4978
\[\[H1R E0.26 EM 0.51 ERX 0.81 RS\]\] &lt;106.27&gt;
5
85.5151
\[\[H1R E0.1 EM 0.51 ERX 0.54 T5S\]\] &lt;105.72&gt;
6
87.1511
\[\[H1R E0.26 EM 0.51 ERX 0.81 RS\]\] &lt;106.56&gt;
7
85.4291
\[\[S2R E0.26 EM 0.65 ERX 0.81 RS\]\] &lt;105.71&gt;
8
91.1556
\[\[H1R E0.26 EM 0.65 ERX 0.81 RS\]\] &lt;105.75&gt;
9
80.8585
\[\[H1R E0.26 EM 0.51 ERX 0.99 T5S\]\] &lt;106.18&gt;
10
90.7512
\[\[H1R E0.14 EM 0.65 ERX 0.99 RS\]\] &lt;107.62&gt;
11
87.5627
\[\[H1R E0.14 EM 0.65 ERX 0.99 RS\]\] &lt;102.28&gt;
12
87.7931
\[\[H1R E0.26 EM 0.51 ERX 0.81 T5S\]\] &lt;107.26&gt;
13
86.8034
\[\[H1R E0.26 ISM 0.86 ERX 0.81 T5S\]\] &lt;106.02&gt;
14
88.0794
\[\[H1R E0.26 ISM 0.86 ERX 0.81 T5S\]\] &lt;106.0&gt;
15
94.5023
\[\[H1R E0.14 ISM 0.86 ERX 0.81 T5S\]\] &lt;107.73&gt;
16
89.9774
\[\[H1R E0.14 EM 0.51 ERX 0.81 T5S\]\] &lt;107.5&gt;
17
92.5572
\[\[H1R E0.14 EM 0.51 ERX 0.81 T5S\]\] &lt;106.65&gt;
18
85.6017
\[\[H1R E0.14 EM 0.51 ERX 0.99 RS\]\] &lt;106.64&gt;
19
82.8003
\[\[H1R E0.14 EM 0.51 ERX 0.99 RS\]\] &lt;104.54&gt;

**Table 20:** Best chromosome found in each generation of test 3, iteration 3 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
47.2679
\[\[S2R E0.43 IVM 0.51 PMX 0.97 RS\]\] &lt;98.52995&gt;
1
50.3977
\[\[S1R E0.38 DM 0.39 OX 0.54 RS\]\] &lt;89.03625&gt;
2
57.8658
\[\[H1R E0.43 IVM 0.06 PMX 0.38 RS\]\] &lt;84.08874&gt;
3
66.1232
\[\[S1R E0.38 DM 0.51 PMX 0.97 RS\]\] &lt;92.84301&gt;
4
77.1779
\[\[H1R E0.43 IVM 0.41 OX 0.54 RS\]\] &lt;99.575676&gt;
5
78.9800
\[\[H1R E0.43 IVM 0.41 OX 0.97 RS\]\] &lt;99.575676&gt;
6
81.0474
\[\[H1R E0.43 IVM 0.41 PMX 0.97 RS\]\] &lt;97.16121&gt;
7
87.2577
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;103.74&gt;
8
87.9526
\[\[H1R E0.43 IVM 0.41 OX 0.54 RS\]\] &lt;100.01&gt;
9
87.2795
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;107.3&gt;
10
85.9596
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;99.575676&gt;
11
88.7200
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;104.91&gt;
12
94.0025
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;104.83&gt;
13
87.9373
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;105.0&gt;
14
87.105
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;105.17&gt;
15
93.5915
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;104.85&gt;
16
86.1250
\[\[H1R E0.22 SIM 0.28 PMX 0.97 RS\]\] &lt;105.42&gt;
17
90.4365
\[\[H1R E0.43 SIM 0.28 PMX 0.97 RS\]\] &lt;105.92&gt;
18
87.3973
\[\[H1R E0.22 SIM 0.28 PMX 0.97 RS\]\] &lt;106.53&gt;
19
90.0598
\[\[H1R E0.22 SIM 0.28 PMX 0.97 RS\]\] &lt;107.4&gt;

**Table 21:** Best chromosome found in each generation of test 4, iteration 1 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
67.1865
\[\[H1R E0.25 IVM 0.7 ERX 0.94 T5S\]\] &lt;92.39898&gt;
1
73.2267
\[\[H1R E0.51 IVM 0.43 OX 0.49 RS\]\] &lt;90.31801&gt;
2
78.0078
\[\[H1R E0.09 SIM 0.75 PMX 0.34 T5S\]\] &lt;97.05002&gt;
3
85.3432
\[\[H1R E0.09 SIM 0.75 PMX 0.34 T5S\]\] &lt;97.05002&gt;
4
90.7563
\[\[H1R E0.59 SIM 0.9 OX 0.57 RS\]\] &lt;97.37758&gt;
5
88.8778
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;98.71733&gt;
6
90.7927
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;98.92731&gt;
7
92.5091
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;96.482704&gt;
8
93.7043
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;99.96864&gt;
9
93.7189
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;99.964714&gt;
10
92.2999
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;98.78884&gt;
11
92.3988
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;96.766594&gt;
12
91.8220
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;99.96864&gt;
13
90.4999
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;97.50685&gt;
14
92.3079
\[\[H1R E0.09 SIM 0.35 PMX 0.78 T5S\]\] &lt;99.964714&gt;
15
90.7504
\[\[S2R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;97.19373&gt;
16
91.9631
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;99.02797&gt;
17
92.8312
\[\[H1R E0.09 SIM 0.35 CX 0.78 RS\]\] &lt;98.78878&gt;
18
92.4504
\[\[H1R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;97.80983&gt;
19
93.5470
\[\[S2R E0.09 SIM 0.35 PMX 0.78 RS\]\] &lt;98.173&gt;

**Table 22:** Best chromosome found in each generation of test 4, iteration 2 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
71.9802
\[\[H1R E0.48 ISM 0.85 ERX 0.21 RS\]\] &lt;92.76734&gt;
1
75.2395
\[\[H1R E0.48 ISM 0.85 MPX 0.65 RWS\]\] &lt;92.716194&gt;
2
76.2290
\[\[S1R E0.82 SIM 0.93 OX 0.64 RWS\]\] &lt;92.568596&gt;
3
80.6524
\[\[S1R E0.82 SIM 0.93 OX 0.97 T5S\]\] &lt;90.46759&gt;
4
80.0332
\[\[H1R E0.7 ISM 0.79 MPX 0.97 T5S\]\] &lt;94.40304&gt;
5
78.4585
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;94.66131&gt;
6
86.0853
\[\[H1R E0.7 ISM 0.79 MPX 0.97 T5S\]\] &lt;95.12098&gt;
7
83.5117
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;94.25824&gt;
8
88.4813
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;99.96864&gt;
9
87.7547
\[\[H1R E0.08 ISM 0.79 MPX 0.97 T5S\]\] &lt;97.23741&gt;
10
87.6323
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;96.08384&gt;
11
86.6431
\[\[H1R E0.48 ISM 0.91 MPX 0.97 T5S\]\] &lt;95.50129&gt;
12
90.4386
\[\[H1R E0.08 SIM 0.79 MPX 0.97 T5S\]\] &lt;98.26307&gt;
13
88.2204
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;96.1328&gt;
14
89.4655
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;93.87218&gt;
15
84.7574
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;93.298546&gt;
16
82.8831
\[\[H1R E0.48 ISM 0.79 MPX 0.8 T5S\]\] &lt;94.66854&gt;
17
87.6097
\[\[S1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;99.96864&gt;
18
88.6192
\[\[S1R E0.48 ISM 0.79 MPX 0.8 T5S\]\] &lt;95.9539&gt;
19
85.9202
\[\[H1R E0.48 ISM 0.79 MPX 0.97 T5S\]\] &lt;95.36284&gt;

**Table 23:** Best chromosome found in each generation of test 4, iteration 3 of 3.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
60.9960
\[\[S2R E0.21 SIM 0.2 OX 0.59 RWS\]\] &lt;90.87219&gt;
1
69.6754
\[\[H1R E0.43 ISM 0.95 PMX 0.52 T5S\]\] &lt;93.7592&gt;
2
75.0347
\[\[H1R E0.43 ISM 0.95 PMX 0.52 T5S\]\] &lt;93.40432&gt;
3
80.3275
\[\[H1R E0.59 SIM 0.85 PMX 0.52 T5S\]\] &lt;97.57902&gt;
4
86.3894
\[\[S2R E0.71 SIM 0.68 PMX 0.9 T5S\]\] &lt;96.58755&gt;
5
89.4131
\[\[H1R E0.57 SIM 0.68 PMX 0.9 T5S\]\] &lt;95.778885&gt;
6
89.5110
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;95.0617&gt;
7
91.8029
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;95.261&gt;
8
91.7414
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;99.6845&gt;
9
87.6857
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;97.43399&gt;
10
91.7950
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;96.52657&gt;
11
90.9415
\[\[H1R E0.59 SIM 0.85 PMX 0.9 T5S\]\] &lt;96.01427&gt;
12
90.7995
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;96.041626&gt;
13
89.9482
\[\[H1R E0.59 SIM 0.68 PMX 0.9 T5S\]\] &lt;98.63261&gt;
14
91.6089
\[\[H1R E0.59 SIM 0.68 MPX 0.9 T5S\]\] &lt;97.7239&gt;
15
92.2055
\[\[H1R E0.39 SIM 0.85 PMX 0.77 T5S\]\] &lt;99.2064&gt;
16
88.3166
\[\[H1R E0.02 SIM 0.68 PMX 0.9 T5S\]\] &lt;99.822624&gt;
17
92.0434
\[\[H1R E0.23 SIM 0.68 PMX 0.9 T5S\]\] &lt;99.96864&gt;
18
93.0566
\[\[H1R E0.23 SIM 0.68 PMX 0.9 T5S\]\] &lt;99.96864&gt;
19
91.8176
\[\[H1R E0.02 SIM 0.25 MPX 0.9 T5S\]\] &lt;98.93178&gt;

**Table 24:** Best chromosome found in each generation of test 5.
Gen
Average fitness (%)
Best chromosome with Best Fitness (%) (optimal distance: 7542)
0
41.3808
\[\[H1R E0.72 SIM 0.27 PMX 0.46 RS\]\] &lt;80.45567&gt;
1
52.2769
\[\[H1R E0.42 SIM 0.7 MPX 0.81 RWS\]\] &lt;84.67184&gt;
2
66.1808
\[\[H1R E0.42 SIM 0.27 PMX 0.46 RS\]\] &lt;87.339325&gt;
3
71.9267
\[\[S1R E0.28 SIM 0.27 PMX 0.78 RS\]\] &lt;90.69078&gt;
4
79.0561
\[\[H1R E0.35 SIM 0.27 PMX 0.78 RS\]\] &lt;90.61634&gt;
5
80.5378
\[\[S1R E0.42 SIM 0.4 PMX 0.78 RS\]\] &lt;90.60752&gt;
6
85.8276
\[\[S1R E0.05 SIM 0.62 PMX 0.78 RS\]\] &lt;91.317085&gt;
7
83.0282
\[\[S1R E0.05 SIM 0.4 PMX 0.78 RS\]\] &lt;92.728546&gt;
8
86.1452
\[\[H1R E0.42 SIM 0.4 PMX 0.78 RS\]\] &lt;91.24317&gt;
9
86.0076
\[\[S1R E0.05 SIM 0.62 PMX 0.78 RS\]\] &lt;92.8687&gt;
10
85.0009
\[\[H1R E0.05 SIM 0.62 PMX 0.78 RS\]\] &lt;95.53586&gt;
11
85.8611
\[\[H1R E0.05 SIM 0.4 PMX 0.95 RS\]\] &lt;93.02081&gt;
* * *

## APPENDIX B: JAVA IMPLEMENTATION

The MetaGA4TSP system is implemented as a java application. As of this writing it has only been tested on Microsoft Windows™ systems, although java claims to be platform independent, so one could probably run it on most systems with minimal modification. Some parts have been written with object-oriented concepts in mind, however several principles of the object-oriented paradigm are sometimes blatantly ignored in the interest of simplicity, or ease of implementation.

This appendix is provided as a summary for the java source implemented for anyone wishing to understand and/or modify the code.

### Java classes
A short description of each of the classes in abramsJPaul.metaGA4tsp15 is now given:
• Class Main contains the meta-evolutionary loop which operates on a Population object. It also contains the complete menu system and most output methods for the system.
• Class Demo contains all demonstration routines accessible from the menu system. There is a great deal of duplication of code in this class.
• Class Population handles the meta-Population and maintains its list of individuals which are objects of type Chromosome.
• Class Chromosome specifies the structure of the meta-GA chromosome, which is described in Chapter 3.1. Its behavior includes methods for crossover and mutation.
• Class TSPPopulation contains attribute and behavior specification for the populations which are evolved during the fitness calculation of each Chromosome. It contains the code for all implemented replacement schemes and selection methods.
• Class TSPTour is the chromosome corresponding to TSPPopulation and contains necessary functionality including all implemented crossover and mutation operators.
• Class TSPMap contains functionality to read files in TSPLIB (Reinelt, 2001) format as well as store city locations and distances between cities. It also contains functionality to evaluate the cost (distance) of a given TSPTour.
• Classes GUI, MetaFrame and TSPCanvas provide functionality for the graphical display of TSP tours during evolution.

While the source code is commented in places, it is not designed to be highly readable by other parties.
* * *

## APPENDIX C: THE SOFTWARE

The root directory of the CD-ROM contains various batch files used to run MetaGA4TSP, as well as various TSP files used with the system. It also contains a copy of this document in Microsoft Word format, and a java installation (J2SDK 1.4.1) in case your machine does not have java installed. The java source (as described in Appendix B) and class files are both stored in the subdirectory \\abramsJPaul\\metaGA4tsp. Output and log files for each test are included under the \\testing subdirectory. The log files do not contain any information not included in the output files, but were implemented only to be spreadsheet-friendly (they were never actually used to analyze data). For tests for which graphs were compiled (see for example Figure 20), the Microsoft Excel files (.xls) are also included.

### Installation
The system is tested only on Windows 95 and Windows XP systems using the java SDK v1.4.1rom java.sun.com. Since it is developed in java, the system should work on other platforms as well, but only Windows installation instructions are provided here.

If your machine does not have java installed, install it by double-clicking the j2sdk-1.4.1 icon. After installation, make sure that the \\bin directory in the java installation directory is included in your path (check under Control Panel, System, Advanced, Environment Variables, or alternatively using the path and set path statements from the command prompt). For example, if java is installed in c:\\java, your path environment variable should contain c:\\java\\bin.

Once java is installed, one can install MetaGA4TSP by designating a new directory (it can be named anything, a suggestion is paulTSP but we will refer to it as ‘the installation directory’) on some local hard drive and copying the entire contents of the root directory of the CD-ROM (excluding the java installation executable) to this new directory so that subdirectory structure remains intact. The only important subdirectory is really abramsJPaul\\metaGA4tsp, which contains the source code. The testing subdirectory can safely be excluded.

If there are any problems with the CD-ROM, .bat, .tsp and .java files only are included on 1.4” diskette. If installing from this medium, copy all disk contents to some installation directory as above (ensuring that .java files reside in the abramsJPaul\\metaGA4tsp directory), and then compile the java files by running compile.bat from the command prompt in the installation directory. One may then proceed to execution.

### Execution
Execution of MetaGA4TSP is performed from the command prompt. The easiest way is to run one of the batch files. The file menu.bat is provided as a quick demonstration and can be run from the command prompt in the MetaGA4TSP installation directory. Running it will start the menu user interface with certain default parameters and open another window which will display some graphical information. The menu system is meant to be self-explanatory, but is extremely unforgiving when accepting input, so care is needed to avoid re-starting the program because of input errors. One can begin evolution immediately with default parameters, change parameters, or view demonstrations of various MetaGA4TSP components including a TSP GA which evolves with user-specified parameters. The menu system is constructed so that only one meta-GA evolutionary run is possible per ‘session’. This is because each evolutionary run outputs generational information (the population of the meta-GA at each generation) to the file metaGA4TSP.log in a spreadsheet-readable format for later examination. Once one has evolved a meta-GA, the program must be re-started in order to evolve another meta-GA with different parameters. However, an opportunity is given (provided the menu system is turned on) after meta-evolution to test the evolved parameter set on a TSP GA for a greater number of generations than were allowed during meta-evolution in order to test whether the optimal is found, but currently this only works on the same TSP instance as was used during meta-evolution. However, one could simply restart the system and run a demonstration of TSP GA on the TSP of their choice using the previously evolved chromosome (which can be found in the last line of metaGA4TSP.log).

The menu system may be avoided completely by specifying all necessary parameters from the command line, omitting the –m parameter. Command line parameters can be viewed by calling the MetaGA4TSP program without parameters. This can be done by entering `java abramsJPaul.metaGA4tsp.Main`{16} at the command prompt in the MetaGA4TSP installation directory. A list of parameters will be given (see Figure 25), and

* * *

```DOS
c:\school\tsp>java abramsJPaul.metaGA4tsp.Main
Usage: java abramsJPaul.metaGA4tsp.Main <parameters> <tspfile>
 optional parameters:
 -m                   - Use menu interface
 -n                   - No graphical output
 -g <generations>     - Number of meta-generations to run
 -p <popsize>         - Number of individuals in meta-population
 -t <maxTSPGens>      - Number of TSP generations to run for each
                            individual in each generation of evolution
                            of the meta-population
 -e <elitismPercent>  - Percentage of best individuals to keep each gen. [0..1]
 -r <mutationRate>    - Rate [0..1] of mutation per chromosome of meta-GA
 -x <xoverRate>       - Probability [0..1] of crossover per chromosome
 -d <tspGoal>         - Optimal distance for the TSP in tspfile
 <tspfile>            - List of nodes (cities) in EUC_2D TSPLIB format

c:\school\tsp>
```

**Figure 25:** Command line parameters for abramsJPaul.metaGA4tsp.Main.

can be used by repeating the above line along with the desired parameters. Ensure that there is a space separating each parameter and its value (for parameters that accept values). If examples are required, refer to the included batch files{17}. The last parameter is the name of the file containing the desired TSP instance{18}. If the –d (distance) parameter is not used, the optimal distance is set to a low number and meta-GA chromosome fitnesses will be meaningful only in relation to each other. Following the last parameter, one can also use the output redirection operator (‘>’) to output results to file instead of to screen, which can be especially useful with older Windows™ systems. The redirection operator is not recommended in combination with the –m (menu) parameter, since the menus will be re-directed to file.

During meta-evolution, results are displayed both graphically and in text output. Both outputs give the current meta-GA chromosome being evaluated. The graphical output shows the TSP GA being evolved, although the display is not necessarily updated for every tour found. As evolution progresses, more tabs will appear in the graphical display. Each tab is named with a number representing its generation. Clicking tabs for previous generations should display the last (and presumably/hopefully the best) tour found during that generation, along with the chromosome that found it.

The vast majority of information concerning evolution is directed to standard output. It gives session parameters, lists all chromosomes evaluated and provides other information such as session running time, operator usage, number of evaluations and best chromosomes found during the session in order to see whether good chromosomes are being lost. No information concerning the individual TSP GA populations is currently recorded.
* * *

## GLOSSARY

**Adjacent**. Two nodes in a graph are adjacent if connected directly by an edge. In a TSP tour in path representation, two cities are adjacent if they occur consecutively.

**Algorithm**. A sequence of logical steps which transforms input data into output data.

**Allele**. The state, or value, of a particular gene.

**Chromosome**. A sequence of genes representing part or all of the genome of an individual.

**Complete Graph.** A complete graph of size n is a set of n nodes each of which are connected directly by an edge to each of the other n-1 nodes.

**Convergence**. “A gene is said to have converged when 95% of the chromosomes in the population all contain the same allele for that gene. In some circumstances, a population can be said to have converged when all genes have converged. \[All hyperlink capitals changed to italics\]“ (Heitkötter and Beasley, 2000, glossary entry for converged).

**Crossover**. A binary genetic operator producing one or more child chromosomes from two parent chromosomes by combining parts of the parent chromosomes as specified by some algorithm.

**Edge**. A connection between two nodes of a graph. In a weighted graph, each edge has a number called its weight (Black, 1998).

**Evolution**. Evolution is a process that results in heritable changes in a population spread over many generations. (Moran, 1997)

**Evolve**. See evolution.

**Fitness**. “Loosely: adaptedness. Often measured as, and sometimes equated to, relative reproductive success. Also proportional to expected time to extinction. ‘The fit are those who fit their existing environments \[hyperlink capitals changed to italics\] and whose descendants will fit future environments.’ (J. Thoday, A Century of Darwin \[double quote changed to bold\], 1959).” (Heitkötter and Beasley, 2000, glossary entry for fitness)

**Gene**. A section of a chromosome designated to specify a particular genetic trait of an individual. Its possible values are referred to as alleles.

**Generation**. An iteration of the measurement of fitness and the creation of a new population by means of reproductive operators. (Heitkötter and Beasley, 2000, paraphrased glossary entry for generation)

**Genetic Algorithm.** “A type of evolutionary computation devised by John Holland \[1975\]. A model of machine learning that uses a genetic/evolutionary metaphor. Implementations typically use fixed-length character strings to represent their genetic information, together with a population of individuals which undergo crossover and mutation in order to find interesting regions of the search space \[all hyperlink capitals changed to italics\]” (Heitkötter and Beasley, 2000, glossary entry for genetic algorithm)

**Genetic Operator.** See operator.

**Genome**. All the genetic material of an individual, which is made up of one or more chromosomes.

**Genotype**. Refers to the group of individuals containing compatible genomes (i.e., a species) or it refers to the form of said genomes. (Morrison, 1998)

**Graph**. A structure consisting of a set of nodes and a set of edges. Each edge must begin and end at some node, but there are no other restrictions on the number of edges or nodes.

**Hamiltonian Cycle.** A path through a graph which starts and ends at the same node and includes every other node exactly once (Black, 1998).

**Intractable**. See tractability.

**Individual**. In genetic algorithms, a member of a population, specified by its chromosome (or sometimes chromosomes).

**Locus**. The position of a gene (or one of that gene’s alleles) on a chromosome.

**Mutation**. The process that seems to occur in nature whereby new genetic material is sometimes found with no apparent source. In genetic algorithms, mutation is generally performed by modifying some part of the chromosome in a random manner that still produces a valid chromosome for that species.

**Node**. An item in a graph. Sometimes referred to as a vertex. (Black, 1998)

**Operator**. “A mechanism which influences the way in which genetic information is passed on from parent(s) to offspring during reproduction. Reproduction operators fall into three broad categories: crossover, mutation and reordering operators. \[all hyperlink capitals changed to italics\]” (Heitkötter and Beasley, 2000, glossary entry for reproduction operator).”

**Path**. A list of nodes of a graph where each node has an edge from it to the next node. (Black, 1998).

**Population**. A group of individuals of the same species which evolve over time by recombination and mutation, from one generation to the next.

**Recombination**. The process of genetic crossover, or mating of individuals in a population to produce offspring which may become members of the next generation of the population.

**Replacement**. The process by which a new population is generated from the old population in the evolutionary cycle of a genetic algorithm.

**Reproduction**. See recombination.

**Schema**. “A pattern of gene values in a chromosome, which may include `don't care` states. Thus in a binary chromosome, each schema (plural schemata) can be specified by a string of the same length as the chromosome, with each character one of {0, 1, #}. A particular chromosome is said to `contain` a particular schema if it matches the schema (e.g. chromosome 01101 matches schema #1#0#). The `order` of a schema is the number of non-dont-care positions specified, while the `defining length` is the distance between the furthest two non-dont-care positions. Thus #1##0# is of order 2 and defining length 3. \[all hyperlink capitals changed to italics\]” (Heitkötter and Beasley, 2000, glossary entry for schema).

**Search space.** “If the solution to a task can be represented by a set of N real-valued parameters, then the job of finding this solution can be thought of as a search in an N-dimensional space. This is referred to simply as the search space \[hyperlink capitals changed to italics\]. More generally, if the solution to a task can be represented using a representation scheme, R, then the search space is the set of all possible configurations which may be represented in R.” (Heitkötter and Beasley, 2000, glossary entry for search space)

**Selection**. The process by which parents are selected from a population for crossover.

**Tour**. A potential solution to a TSP instance, or an enumeration of each of the cities in said TSP instance in some order with the restriction that each city appear exactly once. The distance of the tour is calculated by calculating the distances of each of the adjacent cities, including the distance from the last city in the list back to the start city.

**Tractable**. See tractability.

**Tractability**. A problem is tractable if an algorithmic solution exists whose execution time is polynomial or less with respect to the size of the problem. A problem is intractable if there is no such solution.

**Trait**. The state or behaviour of an individual due to a particular allele occupying a gene of the individual’s chromosome.

**Vertex**. An item in a graph. Sometimes referred to as a node (Black, 1998).
* * *
## End Notes (Formerly footnotes)

1.  NP stands for non-deterministic polynomial-time, however it is beyond the scope of this writing to formally define NP-completeness, or even what is meant by an algorithm, problem, or polynomial time. A formal introduction to these topics can be found in Chapter 36 of the text “Introduction to Algorithms” by Cormen, Leiserson and Rivest, cited at the end of this document.
2.  See Laranaga et al (1999, pp. 8, 28, 31, 32) for descriptions of binary, adjacency, ordinal and matrix representations.
3.  The exclamation mark (!) is the standard mathematical symbol for the factorial function.
4.   Actually, in TSP only the first gene can take on n different values.  The second gene can take n-1 different values, the third n-2, etc but this is explained in section 2.1.
5.   Usually, this is done in order to prevent the crossover effect of genes occurring close to one another not becoming separated as often as genes which are far apart.  
6.   Actually, although it is convenient to think of fitness as a high number, a TSP chromosome’s fitness is nevertheless often represented strictly as the total distance of the tour.  One must then be careful however to think of a good tsp fitness as a low number, not a high number.
7.   The word theoretically is used, since in most problems actually listing all points in the search space (not to mention each point’s fitness) is intractable.
8.    A great deal of the literature uses the “co-evolutionary” spelling of coevolutionary.  This document uses the spelling found in Merriam-Webster (2003).
9.    Morrison also mentions that the general lack of understanding and formal definitions for coevolution were the main motivation for his thesis.
10.    A newer java package which was not investigated in time is JGAP (Rotstan, 2003)
11.    The ERX demonstration outputs the full edge list for the parents.  Since two-offspring crossover is performed by calling single-offspring crossover twice (switching the order of the parents the second time), the edge list would be output twice in the demonstration.  It is only for this reason that the ERX demo shows a single child instead of two.
12.     In the diagram of figure 19, the tab for generation ‘1’ is selected, but this is actually the second generation since generation ‘0’ is the first generation.
13.     There is some functionality included to reduce the number of alleles considered for the meta-GA chromosome.  For example, if desired, one could limit the number of crossover alleles to one and evolve the chromosome in an attempt to find the best combination of parameters for the desired crossover type.  This functionality, however, remains for the most part un-tested. 
14.     During preliminary testing, the crossover method for the meta-GA chromosome was implemented using an algorithm that assigned new values to rate-specifying genes by taking random numbers in a range specified by the alleles in the corresponding parent genes.  This method was changed to the current simple single-point crossover method described in Chapter 3  immediately prior to final testing.  After observing preliminary results it was considered desirable to observe chromosomes in which all genes had converged; the averaging crossover was preventing convergence of the rate-specifying genes.
16.     Capitalization is very important when executing java applications.  Note in particular the lower-case TSP.
17.     Note that most included batch files do not use all parameters but instead rely on default values for parameters such as mutation rate (default 0.35) and crossover rate (default 0.85).
18.     Currently, TSPLIB files are not directly supported.  However, any TSPLIB file specifying 2D co-ordinates can be quickly modified so that MetaGA4TSP can read it.  To convert a TSPLIB file, comment out all header information (using double-slash or slash-star style comments), and add a line to the beginning containing only an integer value specifying the number of cities.  The remaining node co-ordinate information can remain intact.  It should consist of space-separated integer values for city_number (1..n), x co-ordinate and y co-ordinate for each city.
