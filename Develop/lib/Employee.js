// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role = "Employee") {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    printInfo() {
        console.log(`This person's role is the ${this.role}`);
        console.log(`This person's name is  ${this.name}`);
        console.log(`This person's id is ${this.id}`);
        console.log(`This person's email is ${this.email}`);
    }

    getRole() {
        return this.role; 
    }

    getName() {
        return this.name;
    }
      
    getId() {
        return this.id;
    } 
      
    getEmail() {
        return this.email;
    }
}

module.exports = Employee;