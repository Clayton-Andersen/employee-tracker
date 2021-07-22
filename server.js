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
    connection.query('SELECT * FROM department', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const viewRoles = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const viewEmployees = () => {
    connection.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', (error, data) => {
        console.table(data)
        mainMenu();
    })

}
const addDepartment = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', async (error, data) => {
        console.table(data)
        const departmentName = await inquirer.prompt([{
            name: 'department',
            message: 'Input the name of the department you wish to add:',
            type: 'input'
        }])
        connection.query('INSERT INTO department (name) VALUES (?)', [departmentName.department], (error, data) => {
            if (error) throw error
            mainMenu();
        })
    })
}
const addRole = () => {
    connection.query('SELECT * FROM department', async (error, data) => {
        const roleType = await inquirer.prompt([{
            name: 'role',
            message: 'What job title would you like to add?',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'What will the salary be?',
            type: 'input'
        },
        {
            name: 'department_id',
            message: 'To which department will this role be added?',
            type: 'list',
            choices: data.map((department) => ({ name: department.name, value: department.id }))
        }
        ])
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleType.role, roleType.salary, roleType.department_id], (error, data) => {
            if (error) throw error
            console.table(data)
            mainMenu();
        })
    })
};
const addEmployee = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}
const updateEmployeeRole = () => {
    connection.query('SELECT * FROM role LEFT JOIN department ON role.department_id = department.id;', (error, data) => {
        console.table(data)
        mainMenu();
    })
}


mainMenu();