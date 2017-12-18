# Ping Command for Botyo
[![npm](https://img.shields.io/npm/v/botyo-command-ping.svg)](https://www.npmjs.com/package/botyo-command-ping)
[![npm](https://img.shields.io/npm/dt/botyo-command-ping.svg)](https://www.npmjs.com/package/botyo-command-ping)
[![npm](https://img.shields.io/npm/l/botyo-command-ping.svg)]()

The **Ping Command for [Botyo](https://github.com/ivkos/botyo)** sends a ping in a private message to a specific person, or makes the bot respond to the ping.

## Usage
`#ping [person]`

For example:
- `#ping` - Makes the bot respond to the ping if it's online.
- `#ping Alice` - Sends a ping in a private message to Alice.

## Install
**Step 1.** Install the module from npm.

`npm install --save botyo-command-ping`

**Step 2.** Register the module.
```typescript
import Botyo from "botyo";
import PingCommand from "botyo-command-ping"

Botyo.builder()
    ...
    .registerModule(PingCommand)
    ...
    .build()
    .start();
```