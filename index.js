const inquirer = require("inquirer");
const fs = require('fs');

// initialize app
function init() {
    inquirer
        .createPromptModule([
            {
                type:"list",
                name: "options",
                message: "what would you like to do? (use arrow keys)",
                choices: [
                    " View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add a role",
                    "Add an Employee",
                    "Update an Employee",
                    "Update an Employee Role",
                ],
            },
        ])

}