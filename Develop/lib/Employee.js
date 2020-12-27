// TODO: Write code to define and export the Employee class
class Employee {
    constructor(firstname, lastname, id, email, role) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    printInfo() {
        console.log(`This person's role is the ${this.role}`);
        console.log(`This person's name is  ${this.firstName}  ${this.lastName}`);
        console.log(`This person's id is ${this.id}`);
        console.log(`This person's email is ${this.email}`);
    }

    getRole() {
        return this.role; 
    }

    getName() {
        return this.firstName + " " + this.lastName;
    }
      
    getId() {
        return this.id;
    } 
      
    getEmail() {
        return this.email;
    }
}

module.exports = Employee;