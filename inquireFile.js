const inquirer = require('inquirer');
const mysql = require("mysql2")

async function init () {
    return inquirer.prompt([

            {
                type:"list",
                name: "options",
                message: "what would you like to do? (use arrow keys)",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add a role",
                    "Add an Employee",
                    "Update an Employee Role",
                ],
            },
            {
                type: "input",
                name: 'departmentName',
                message: 'Enter a new department name:',
                when: (answers) => answers.options === "Add a Department",
            },
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Add a new role title:',
                when: (answers) => answers.options === "Add a Role",
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter a salary:',
                when: (answers) => answers.options === "Add a Role",
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: "Add a department ID for this role:",
                when: (answers) => answers.options === "Add a Role",
            },
            {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:",
                when: function (answers) {
                    return answers.options === "Add an Employee";
                },
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee's last name:",
                when: function (answers) {
                    return answers.options === "Add an Employee";
                },
            },
            {
                type: 'input',
                name: 'role',
                message: "Enter the employee's role ID:",
                when: function (answers) {
                    return answers.options === "Add an Employee:";
                },
            },
            {
                type: "input",
                name: "department",
                message: "Enter the employee's department ID:",
                when: function (answers) {
                    return answers.options === "Add an Employee";
                },
            },
            {
                type: 'input',
                name: 'manager',
                message: "Enter the employee's manager ID:",
                when: function (answers) {
                    return answers.options === "Add an Employee";
                },
            }
        ])
    }

module.exports = init;