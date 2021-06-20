# ``hera#6500``

## What is ``hera``?

``hera`` is a Discord bot developed by me for my family. It acts as a helper bot to ease the process of reminding them events.

## What does ``hera`` use?

``hera`` is a [node.js](https://nodejs.org) application utilizing different node modules, including:
- [Discord.js](https://discord.js.org) (for Discord API interactions)
- [node-postgres](https://node-postgres.com) (for making and handling queries to the PostgreSQL server)

Currently, ``hera`` is being hosted 24/7 on a free [Heroku](https://heroku.com) server, with automatic deployment routed to this repository.

As mentioned above, ``hera`` stores and acquires data in a PostgreSQL database. The database is also handled by Heroku.

## Functions

### Lunch or dinner

#### ``hera who home [lunch/dinner] [date]``

Checks who is available for lunch/dinner on a given date (defaults to today). Example:

    hera who home dinner
    
#### ``hera [home/no] [lunch/dinner] [date] ([reason])``

Records your availability for lunch/dinner on a given date (defaults to today). Example:

    hera no dinner tonight (party with friends)
    
#### ``hera [home/no] [lunch/dinner] all [weekday] ([reason])``

Records your new weekly routine for lunch/dinner on a given weekday. Example:

    hera home lunch all friday
    
#### ``hera show [name]``

Shows the lunch/dinner schedule of the whole week for a given person (defaults to yourself). Example:

    hera show mum

## Notable features

### Time expressions:
Since most of my family members aren't programmers, I try to make my commands as "English-like" as possible. One of my approaches to achieving this is to handle
time expressions like English, such as "today", "tonight" or "tomorrow". I would add in additional finders to handle these words, which improves user experience.


## List of ideas for future development

- sending reminder messages
- making a database for chores
