const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Regular expression for checking email
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

// An array that contains team members
let commandArray = [];

// Email checking function
function isEmailValid(email) {
    return EMAIL_REGEXP.test(email) ? true : "email address is invalid";
};

// Questions to create a Manager
const addManager = () => {
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'manager name',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'emailAddress',
            type: 'input',
            message: 'Email address',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return isEmailValid(input);
            }
        },
        {
            name: 'officeNumber',
            type: 'input',
            message: 'Office number',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        }
    ]).then(answers => new Manager(
        answers.name,
        answers.employeeId,
        answers.emailAddress,
        answers.officeNumber
    ));
};

// Questions to create a Engineer
const addEngineer = () => {
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Engineer name',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'emailAddress',
            type: 'input',
            message: 'Email address',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return isEmailValid(input);
            }
        },
        {
            name: 'gitHub',
            type: 'input',
            message: 'Git Hub',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        }
    ]).then(answers => new Engineer(
        answers.name,
        answers.employeeId,
        answers.emailAddress,
        answers.gitHub
    ));
};

// Questions to create a Intern
const addIntern = () => {
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Intern name',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'Employee ID',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        },
        {
            name: 'emailAddress',
            type: 'input',
            message: 'Email address',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return isEmailValid(input);
            }
        },
        {
            name: 'school',
            type: 'input',
            message: 'School',
            validate: input => {
                if (!input) {
                    return 'cannot be empty';
                }
                return true;
            }
        }
    ]).then(answers => new Intern(
        answers.name,
        answers.employeeId,
        answers.emailAddress,
        answers.school
    ));
};

// File saving function
function saveFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        err ? console.error(err) : console.log(`file: '${fileName}' saved successfully`);
    });
}

// Action selection menu
function showMenu() {
    console.log("\nMenu:");

    inquirer.prompt([
        {
            name: 'option',
            type: 'list',
            message: 'Select menu item:',
            choices: [
                'Add an Engineer',
                'Add an Intern',
                'Finish building the team'
            ]
        }
    ]).then(({ option }) => {
        switch (option) {
            case 'Add an Engineer':
                addEngineer().then(engineer => {
                    console.log("Was created", engineer);
                    commandArray.push(engineer);
                    showMenu();
                });
                break;

            case 'Add an Intern':
                addIntern().then(intern => {
                    console.log("Was created", intern);
                    commandArray.push(intern);
                    showMenu();
                });
                break;

            case 'Finish building the team':
                let renderHTML = render(commandArray);

                if (fs.existsSync(OUTPUT_DIR)) {
                    saveFile(outputPath, renderHTML);
                } else {
                    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
                }
                break;
        }
    });
}

// Start function
function init() {
    addManager().then(manager => {
        console.log("Was created", manager);
        commandArray.push(manager);
        showMenu();
    });
};

// Start
init();