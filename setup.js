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
        message: 'Enter the prefix'
    },
    {
        type: 'input',
        name: 'owner',
        message: 'Enter the owner\'s ID'
    },
    {
        type: 'input',
        name: 'database',
        message: 'Enter the database name. It can be anything you want'
    }
];

(async () => {
    const answers = await inquirer.prompt(prompts);
    const data = Object.assign({
        TOKEN: answers.token,
        PREFIX: answers.prefix,
        OWNER: answers.owner,
        DATABASE: answers.database
    }, {
        TOKEN: null,
        PREFIX: '!',
        OWNER: null,
        DATABASE: 'database'
    })
    fs.writeFileSync('./config.json', JSON.stringify(data));
})();