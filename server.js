const inquirer = require('inquirer')
const connection = require('./db/connection')

const mainMenu = () => {
    //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
//continue
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
            //repeat:
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

mainMenu();