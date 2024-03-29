# [Mastermind Online](https://mastermind.cxllm.uk) <!-- omit in toc -->

This project, completed as part of my A-Level Computer Science course, is an online version of the Mastermind board game written using TypeScript and the React web framework.

Table of Contents

- [The Game](#the-game)
- [Playing the Game](#playing-the-game)
  - [Colour Definitions](#colour-definitions)
  - [Winning and Losing](#winning-and-losing)
- [Features](#features)
  - [Mobile Support (Responsive Design)](#mobile-support-responsive-design)
  - [Difficulty Selection](#difficulty-selection)

## The Game

The way it works is similar to the way the game [Wordle (_New York Times_)](https://www.nytimes.com/games/wordle/index.html) works. The player has to guess a randomly-generated 4-colour sequence across 6 guesses. There are 6/8/10 colours that can be included in the sequence and colours can be repeated in a sequence.

## Playing the Game

**Guess the 4 colour sequence in 6 tries**

- Each guess much contain 4 colours of the 6/8/10 available
- To begin, select your chosen colours on the first row and press submit, and repeat this until you guess correctly, or have guessed 6 times.
- The colours of the circles next to your guess will change to show how close you were to the correct sequence

### Colour Definitions

- A white circle means that your guess is in the sequence and in the position selected
- A red circle means that your guess is in the sequence, but in a different position
- A hollow circle means that your guess is not in the sequence

### Winning and Losing

To win, you must guess the sequence correctly in 6 guesses or less, and you lose if you fail to do so.

## Features

### Mobile Support (Responsive Design)

The website is adapted to be used on mobile as well as on a desktop:

Mobile Version:

<img src="https://i.imgur.com/CAi48YJ.png" width="200px" />
<img src="https://i.imgur.com/oZk2zIu.png" width="200px" />

Desktop Version:

<img src="https://i.imgur.com/RHpmh6N.png" width="1000px" />
<img src="https://i.imgur.com/RHpmh6N.png" width="1000px" />

### Difficulty Selection

Users have the option to choose whether or not their sequence made up of 6, 8 or 10 colours, allowing users to change the game based on their skill level

<img src="https://i.imgur.com/ccfFQug.png" width="400px" />
