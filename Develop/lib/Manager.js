// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(firstname, lastname, id, email, role, officenumber ){
        super(firstname, lastname, id, email, role);
        this.officeNumber = officenumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
};

module.exports = Manager;