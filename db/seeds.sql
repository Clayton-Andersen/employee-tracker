USE empTracker;

INSERT INTO department 
(name)
VALUES 
('Sales'),
('Development'),
('Marketing'),
('HR'),
('President');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Manager', 150000, 1),
('Sales Person', 75000, 1),
('Senior Developer', 120000, 2),
('Junior Developer', 60000, 2),
('Marketing Manager', 100000, 3),
('Marketing Assistant', 62000, 3),
('HR Manager', 75000, 4)
('President', 250000, 5);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Bon', 'Jovi', 1, 8),
('Kamala', 'Harris', 1, 1),
('Clayton', 'Andersen', 2, 8),
('John', 'Smith', 2, 3),
('Jane', 'Smith', 3, 8),
('Bob', 'Frommarketing', 3, 5),
('Prince', 'Harry', 4, 8)
('Brad', 'Pitt', 8, null)



