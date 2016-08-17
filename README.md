# memory-x

Here we have a little memory card game. Or we will eventually. Obviously I'm in the early stages of this thing.

Building on what I've been learning in the various books and tutorials I've been working through the past three months, I'm putting together a pretty straightforward, one-level memory card game from scratch. You've got three minutes (that may change, we'll see) to match all the cards on the board. You run out of time, you lose.

As of July 30th, all I've got are some hard-coded cards you can flip around and some skeleton code (is that a thing?). But one thing at a time, yeah?

---

Yesterday was a lot of getting the view object going. Today (July 31) I've been working mostly on the model. I can now generate arrays of random pairs of cards and assign them random spots on the board. Still working on getting them to actually show up in their assigned places, which is my (<strike>hopefully reasonable</strike> INCREDIBLY SIMPLE???) goal for the end of this evening.

---

Getting these matches to work is really kicking my butt here. Right now (August 7) you can click on cards to flip them, and the screen will even log a score!

...But you can't officially win and also oh that's right every individual card you flip counts as a match for some reason? And after the first card is flipped every card gives you two points. Fun new problems, I guess??

---

8/16:
It's actually possible to play a game now! There's no timer to race against, so there's still no way to lose, and the game gets a little glitchy if you try to click on a new card before the previous two selections have cleared away. But you CAN WIN. How exciting!
