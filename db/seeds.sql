USE empTracker;

INSERT INTO department 
(name)
VALUES 
('Sales'),
('HR');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Manager', 150000, 1),
('Sales Person', 75000, 1),
('HR Manager', 75000, 2);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Clayton', 'Andersen', 1, null),
('New', 'Employee', 2, 1);

