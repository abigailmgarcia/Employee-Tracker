const init = require("./inquireFile");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

//connect db
const dbConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    };

    async function sqlConnection(){
        const connection = await mysql.createConnection(dbConfig);

            async function handleUserInput(){
                const answers = await init();

        //handle user input
        switch(answers.options){
            case "View All Departments":
                connection.query("SELECT * FROM department", function (err, results){
                    if (err) throw err;
                    console.log("");
                    console.table(results);
                });
                // console.log(departments);
                break;
            case "View All Roles":
                connection.query(
                    "SELECT role.id, role.title, role.salary, department.table_name AS department From role JOIN department ON role.department_id = department.id",
                        function (err, results) {
                            if (err) throw err;
                            console.table(results);
                        }
                );
                break;
            case "View All Employees":
                connection.query(
                    "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.table_name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id",
                    function (err, results){
                        if (err) {
                            console.error(err);
                        } else {
                            const tableData = results.map((row) =>{
                                return {
                                    id: row.id,
                                    first_name: row.first_name,
                                    last_name: row.last_name,
                                    role: row.role,
                                    department: row.department,
                                    salary: row.salary,
                                    managers: `${row.manager_first_name}${row.manager_last_name}`,
                                };
                            });
                            console.table(tableData);
                        }
                        }
                    );
                break;
            case "Add a Department":
                connection.query(
                    `INSERT INTO employee_db.department(id,table_name) VALUES (null,'${answers.departmentName}')`,
                        function (err, results) {
                            if (err) {
                                console.err(err);
                                return;
                            }
                        console.log("Department Successfully added");
                        connection.query(
                            "SELECT * FROM department",
                            function (err, results) {
                                if (err){
                                    console.err(err);
                                    return;
                                }
                                console.table(results);
                            }
                        );
                        }
                );
                break;
            case "Add a Role":
                connection.query(
                    `INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${answers.roleDepartment}')`,
                        function (err, results) {
                            if (err) {
                                console.err(err);
                                return;
                            }
                            console.log("Role added successfully");
                            connection.query(
                                "SELECT role.id, role.title, role.salary, department.table_name AS department FROM role JOIN department ON role.department_id = department.id",
                                function (err, results) {
                                    if (err) {
                                        console.err(err);
                                        return;
                                    }
                                    console.table(results);
                                }
                            )
                        }
                );
                break;
            case "Add an Employee":
                connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                 [answers.firstName, answers.lastName, answers.role, answers.manager],
                  function (err, res) {
                    if (err) throw err;
                    connection.query(
                        "SELECT employee.id, employee.first_name, employee.last_name, role.title, table_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id",
                        (err, res) => {
                            if (err) throw err;
                            console.table(res);
                        }
                    );
                    }
                 );
                 break;
            case "Update an Employee Role":
                // query db to get employees
                connection.query("SELECT * FROM employee", function (err, employeeResults) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //map employee rec
                    const employeeChoices = employeeResults.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    }));

                    inquirer
                        .prompt([
                            {
                                type: "list",
                                message: "Which employee do you want to update?",
                                name: "employeeToUpdate",
                                choices: employeeChoices,
                            },
                        ])
                        .then(function (answers) {
                            connection.query("SELECT * FROM role", function (err, roleResults) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                const roleChoices = roleResults.map((role) => ({
                                    name: role.title,
                                    value: role.id,
                                }));

                                // prompt user to select new role
                                inquirer
                                .prompt([
                                    {
                                        type: "list",
                                        message: "What is the employees new role?",
                                        name: "newRole",
                                        choices: roleChoices,
                                    },
                                ])
                                .then(function (roleAnswer) {
                                    connection.query(
                                        "UPDATE employee SET role_id = ? WHERE id = ?",
                                        [roleAnswer.newRole, answers.employeeToUpdate],
                                        function (err, updateResults) {
                                            if (err) {
                                                console.error(err);
                                                return;
                                            }
                                            console.log("Employee role updated successfully");

                                            //display employee update table
                                            connection.query(
                                                "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.table_name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id",
                                                function (err, displayResults) {
                                                    if (err) {
                                                        console.error(err);
                                                        return;
                                                    }
                                                    const tableData = displayResults.map((row) => {
                                                        return {
                                                            id: row.id,
                                                            first_name: row.first_name,
                                                            last_name: row.last_name,
                                                            role: row.role,
                                                            department: row.department,
                                                            salary: row.salary,
                                                            managers: `${row.manager_first_name}${row.manager_last_name}`,
                                                        };
                                                    });
                                                    console.table(tableData);
                                                    nextAction();
                                                }
                                            );
                                        }
                                    );
                                });
                            });
                        });
                    })
                        break;
                         default:
                        console.log("invalid option selected");
                }
                await handleUserInput();
            }
            await handleUserInput();
            }
   

    sqlConnection();