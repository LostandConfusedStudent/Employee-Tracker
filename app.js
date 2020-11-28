// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

// Connect
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected");
    init();
});

// Initiate program
function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want?",
            name: "choice",
            choices: [
                "View employees",
                "View employees by their roles",
                "View employees by their departments",
                "Update employee",
                "Add employee",
                "Add role",
                "Add department"
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "View employees":
                viewEmployees();
            break;

            case "View employees by their roles":
                viewRoles();
            break;

            case "View employees by their departments":
                viewDepartments();
            break;

            case "Update employee":
                updateEmployee();
            break;

            case "Add employee":
                addEmployee();
            break;

            case "Add role":
                addRole();
            break;

            case "Add department":
                addDepartment();
            break;            
        };
    });
};

// View employees
function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
        if (err) throw err
      console.table(res)
      init();
    });
};

// View roles
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    init();
    });
};

// View departments
function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      init();
    });
};

// Update employee


// Add employee


// Add role


// Add department
