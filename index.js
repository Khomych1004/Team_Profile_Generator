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
            message: 'employee ID',
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

// Start function
function init() {
    addManager().then(manager => { console.log("Was created", manager) });
};

init();