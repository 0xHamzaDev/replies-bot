# Replies Bot

Replies Bot is a Telegram bot designed to manage custom replies for commands in group chats. It allows users to add, remove, and list custom replies, as well as invite the bot to new groups.

## Features

- **Add Custom Reply**: Add a custom reply for a specific command.
- **Remove Custom Reply**: Remove a custom reply for a specific command.
- **List Custom Replies**: List all custom replies in the current chat.
- **Invite Bot**: Get an invite link to add the bot to other groups.

## Project Structure

### Key Files and Directories

- **src/commands/**: Contains command handlers for the bot.
  - `addReply.ts`: Handles the `/add_reply` command.
  - `invite.ts`: Handles the `/invite` command.
  - `listReplies.ts`: Handles the `/replies` command.
  - `removeReply.ts`: Handles the `/remove_reply` command.
  - `start.ts`: Handles the `/start` command.

- **src/db/**: Contains database-related files.
  - `db.ts`: Database connection setup.
  - `schema.ts`: Database schema definitions.
  - `migrations/`: Database migration files.

- **src/handlers/**: Contains handlers for different types of bot events.
  - `callbackHandler.ts`: Handles callback queries.
  - `messageHandler.ts`: Handles incoming messages.

- **src/server.ts**: Main entry point for the bot. Sets up the bot and registers command handlers.

## Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/0xHamzaDev/replies-bot.git
    cd replies-bot
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your Telegram bot token:
    ```
    TOKEN=your-telegram-bot-token
    ```

4. **Run the bot**:
    ```sh
    npm start
    ```

## Usage

- **/start**: Initialize the bot.
- **/add_reply <command> <reply>**: Add a custom reply for a command.
- **/remove_reply <command>**: Remove a custom reply for a command.
- **/replies**: List all custom replies in the current chat.
- **/invite**: Get an invite link to add the bot to other groups.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
