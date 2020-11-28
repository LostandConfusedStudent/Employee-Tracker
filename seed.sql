USE employee_tracker;

-- Department seeds
INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Warehouse");

INSERT INTO department (name)
VALUE ("HR");

INSERT INTO department (name)
VALUE ("IT");

-- Role seeds
INSERT into role (title, salary, department_id)
VALUE ("Sales Manager", 100000, 1);

INSERT into role (title, salary, department_id)
VALUE ("Sales Representative", 60000, 1);

INSERT into role (title, salary, department_id)
VALUE ("Warehouse Manager", 75000, 2);

INSERT into role (title, salary, department_id)
VALUE ("Warehouse Grunt", 20000, 2);

INSERT into role (title, salary, department_id)
VALUE ("HR Manager", 120000, 3);

INSERT into role (title, salary, department_id)
VALUE ("HR Representative", 60000, 3);

INSERT into role (title, salary, department_id)
VALUE ("IT Manager", 110000, 4);

INSERT into role (title, salary, department_id)
VALUE ("IT Technician", 56000, 4);

-- Employee seeds
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Paul", "Sun", null, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Frank", "Sun", null, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gloria", "Cheung", null, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Christopher", "Peterson", 1, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mike", "Kung", 2, 5);