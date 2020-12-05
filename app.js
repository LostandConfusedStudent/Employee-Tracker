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
    console.log("Connected as id " + connection.threadId)
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
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
};

// View roles
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
};

// View departments
function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            init();
        });
};

// Empty array for roles
var rolesArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        };

    });
    return rolesArray;
};

// Empty array for managers
var managersArray = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArray.push(res[i].first_name);
        };
    });
    return managersArray;
};

// Update employee
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "Last name? ",
            },
            {
                name: "role",
                type: "rawlist",
                message: "New title? ",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
                {
                    last_name: val.lastName
                },
                {
                    role_id: roleId
                },
                function(err) {
                    if (err) throw err
                    console.table(val)
                    init();
                });
        });
    });
};

// Add employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What's the first name? "
        },
        {
            name: "lastname",
            type: "input",
            message: "What's the last name? "
        },
        {
            name: "role",
            type: "list",
            message: "Role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Who's their manager?",
            choices: selectManager()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function(err) {
                if (err) throw err
                console.table(val)
                init();
            });
    });
};

// Add role
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "Role title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "Salary?"

            }
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    init();
                }
            );
        });
    });
};

// Add department
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Department?"
        }
    ]).then(function (res) {
        connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name
            },
            function (err) {
                if (err) throw err
                console.table(res);
                init();
            }
        );
    });
};