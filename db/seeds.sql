USE empTracker;

INSERT INTO department 
(name)
VALUES 
('President'),
('Sales'),
('Development'),
('Marketing'),
('HR');

INSERT INTO role
(title, salary, department_id)
VALUES
('President', 250000, 1),
('Sales Manager', 150000, 2),
('Sales Person', 75000, 2),
('Senior Developer', 120000, 3),
('Junior Developer', 60000, 3),
('Marketing Manager', 100000, 4),
('Marketing Assistant', 62000, 4),
('HR Manager', 75000, 5);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Brad', 'Pitt', 1, null),
('Bon', 'Jovi', 2, 1),
('Kamala', 'Harris', 4, 2),
('Clayton', 'Andersen', 4, 1),
('John', 'Smith', 5, 4),
('Jane', 'Smith', 6, 1),
('Bob', 'Frommarketing', 7, 6),
('Prince', 'Harry', 8, 1);


