const inquirer = require('inquirer');
const fs = require('fs');

const prompts = [{
        type: 'input',
        name: 'token',
        message: 'Enter the application token'
    },
    {
        type: 'input',
        name: 'prefix',
        message: 'Enter the bot\'s prefix'
    },
    {
        type: 'input',
        name: 'owner',
        message: 'Enter the owner\'s ID'
    },
    {
        type: 'input',
        name: 'database',
        message: 'Enter the path to database. Example: ./data/mydata'
    }
];

(async () => {
    const answers = await inquirer.prompt(prompts);
    const data = Object.assign({
        TOKEN: null,
        PREFIX: '!',
        COMMAND_DIR: './commands',
        EVENT_DIR: './events',
        OWNER: null,
        DATABASE: './database'
    }, {
        TOKEN: answers.token,
        PREFIX: answers.prefix,
        OWNER: answers.owner,
        DATABASE: answers.database
    });
    fs.writeFileSync('./config.json', JSON.stringify(data));
})();