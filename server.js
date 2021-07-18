const inquirer = require('inquirer')
const connection = require('./db/connection')

const mainMenu = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'userSelection',
        message: 'Select an option',
        choices: [{
            name: 'View all departments',
            value: 'viewDepartments'
        },
        {
            name: 'View all roles',
            value: 'viewRoles'
        },
        {
            name: 'View all employees',
            value: 'viewEmployees'
        },
        {
            name: 'Add a department',
            value: 'addDepartment'
        },
        {
            name: 'Add a role',
            value: 'addRole'
        },
        {
            name: 'Add an employee',
            value: 'addEmployee'
        },
        {
            name: 'Update an employees role',
            value: 'updateEmployeeRole'
        }]
    }])
    .then(({ userSelection }) => {
        switch (userSelection) {
            case 'viewDepartments':
                viewDepartments();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmployees();
                break;
            case 'addDepartment':
                addDepartment();
                break;
            case 'addRole':
                addRole();
                break;
            case 'addEmployee':
                addEmployee();
                break;
            case 'updateEmployeeRole':
                updateEmployeeRole();
                break;
        }
    })
}

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (error,data) => {
        console.table(data)
        mainMenu();
    })
}
const viewRoles = () =>  {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const viewEmployees = () =>  {
    connection.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', (error, data) => {
        console.table(data)
        mainMenu();
    })
//Section needs work from here down!!!
}
const addDepartment = () =>  {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const addRole = () =>  {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const addEmployee = () =>  {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const updateEmployeeRole = () =>  {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}


mainMenu();