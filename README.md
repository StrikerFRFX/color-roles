# Color Roles

[![Build Status](https://travis-ci.com/strikerfrfx/color-roles.svg?branch=master)](https://travis-ci.com/strikerfrfx/color-roles)

# Table of Contents

- [Color Roles](#color-roles)
- [About Color Roles](#about-color-roles)
- [How To Find a Hex Code Easily, with pictures](#how-to-find-a-hex-code-easily--with-pictures)
- [Commands (and how to use, with pictures!)](#commands--and-how-to-use--with-pictures--)
  * [.colorRequest // .cr](#colorchange-hexcode-or-cr-hexcode)
  * [.colorChange // .cc](#colorchange----hexcode----or-cr----hexcode---)
  * [.seeColor // .sc](#seecolor-optional-mention-or-sc-optional-mention)
  * [.previewColor](#seecolor-optional-mention-or-sc-optional-mention)
  * [.randomColor](#randomcolor)
- [Libraries Used](#libraries-used)
- [Credits](#credits)

# About Color Roles
Color Roles is an open source Discord Bot that allows you to assign "Color Roles" to yourself and then edit them with just one command (the source code is not yet available to be cloned and configured but that will be coming soon!)

  - Create a Color Role for yourself (one time command)
  - Edit this Color Role whenever you want seamlessly!
  - Preview new colors without even losing your current one!
  - See your own color if you forget, and other peoples with just one command!
  - If you're feeling lucky, roll a random color and use that!
  - Clean, simple and fast commands!

# How To Find a Hex Code Easily, with pictures
It's rather simple really. 
- Go to Google
- Google "color picker"
- Mess around until you find the right one for you
- Copy paste the hex code
- Use in commands
- ????
- Profit


> ![hexcode](https://i.imgur.com/NagTN1M.png)

> It's rather simple, really.
> \- Striker, 2020

# Commands (and how to use, with pictures!)
Note: with all commands, replace the ***bold italics*** (e.g **.colorRequest #ff00ff** ). Also, each command has an available alias as well to be used.

## .colorRequest ***hexcode*** OR .cr ***hexcode***
This is a one time use only command, you usually use it when you don't have a role with "color" and your username already. If you do have one and a booster role has gone above it, run **[.boostRoleReplace](.boostRoleReplace)** which you should have been prompted to in DMs (unless turned off).

> ![success](https://i.imgur.com/TBPtKew.png)

> If you do it right, you get this.

> ![nohex](https://i.imgur.com/assf0r3.png)

> It doesn't like no hex codes.

> ![greedy](https://i.imgur.com/O8Tm6uT.png)

> You can't be greedy either.

## .colorChange ***hexcode*** OR .cr ***hexcode***
This command can be run whenever you want, unlike the command above. However, it requires you to already have a Color Role (hence why running the above command is a prerequisite to it and the bot will error if you do not have a Color Role, as shown below). 

> ![success](https://i.imgur.com/noPeCuG.png)

> Yes, that's a darker shade of the same pink. Shut it.

## .seeColor ***@optional mention*** OR .sc ***@optional mention***
This command is one of my personal favourites. It allows you to see your own Color (directly saved to your DMs if you have them turned on, if not sent to the channel you used the command in for 15 seconds so you can screenshot or copy paste directly) or see another user's color (you can become matching with people!). The command works as such: 
- Use **.sc** by itself to receive your color (or mention yourself if you want)
- Use **.sc @mention** to receive someone else's color. Usernames do not work.

> ![yours](https://i.imgur.com/IgHCfr3.png)

> Don't specify an @ and you will receive your own color in your DMs (provided it can DM you).

> ![other](https://i.imgur.com/5O9G6gN.png)

> Specify someone else's @ and you will receive their color (same here, if it can DM it will).

## .previewColor ***hexcode*** or .pc ***hexcode***
This one is a good one because it allows you to preview colors for 15 seconds before deleting them. Essentially, you run the command just as if you were to request or change a color and it will give you a "preview" role then delete it (as shown below) after 15 seconds. This gives you enough time to send a message and see what it looks like and if you like this color (can be helpful for color coordinated your profile pic and color)
> ![previewcolor](https://i.imgur.com/ESW0oZ2.png)

> ![previewrole](https://i.imgur.com/aw3gE8s.png)

## .randomColor
This one is simple. Rolls a complete random hex code (it can sometimes get similar results so may need several rolls) and keeps it up for 15 seconds so if you like it, you can copy it.

> ![randomone](https://i.imgur.com/VE59SnW.png)

> ![randomtwo](https://i.imgur.com/9laoPu5.png)

> ![randomthree](https://i.imgur.com/Bd33xGM.png)

> It usually generates random colors that are different but sometimes they look similar due to the randomiser algorithm.

# Libraries Used
### [Discord.JS](https://github.com/discordjs/discord.js) (Discord API Library)
### [Discord Akairo](https://github.com/discord-akairo/discord-akairo) (Built in util features)
### [Eslint](https://eslint.org/) (Linter)
### [PM2](https://pm2.keymetrics.io/) (Process Management)

# Credits
### Me (Design)
### Me (Programming)
### Me (Project Manager)
### Heroku (Completely free hosting)
### Also Me (Working on this for 3 whole months and making it perfect :)) )


