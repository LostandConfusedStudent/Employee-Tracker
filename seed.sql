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
VALUE ("Mike", "Kung", null, 7);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gloria", "Cheung", null, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Christopher", "Peterson", null, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Paul", "Sun", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brian", "King", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ricky", "Spanish", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bobo", "The Clown", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Smith", 1, 8);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Erica", "Peterson", 2, 6);

