const { questions } = require("./inquireFile")
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();


// const PORT = process.env.PORT || 3001;
// const app = express();

//connect db
const dbConfig = 
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    };

    async function main(){
        const connection = await mysql.createConnection(dbConfig);
        const answers = await inquirer.prompt(questions);

        //handle user input
        switch(answers.options){
            case 'View All Departments':
                const [departments] = await connection.query('SELECT * FROM departments');
                console.log(departments);
                break;
            case 'View All Roles':
                const [roles] = await connection.query('SELECT * FROM role');
                console.log(roles);
                break;
            case 'View All Employees':
                cosnt [employees] = await connection.query('SELECT * FROM employee');
                console.log(employees);
                break;
            case 'Add a Department':
                await connection.query('INSERT INTO department (name) VALUES (?)', [answers.departmentName]);
                break;
            case 'Add a Role':
                await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.roleTitle, answers.roleSalary, answers.roleDepartment]);
                console.log('Role added succesfully');
                break;
            case 'Add an Employee':
                 await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.role, answers.manager]);
                 console.log('employee added successfully');
                 break;
            case 'Update an Employee':
                console.log('Update an employee');
                break;
            case 'Update an Employee Role':
                    console.log('Update an Employee Role');
                break;
            default:
                console.log('Invalid option selected.');
        }
    }

    // // close db
    // await connection.end();

    main();