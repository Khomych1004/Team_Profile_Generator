// Engineer is a class that inherits from the Emplotee base class
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
        super(name, id, email);

        this.gitHub = gitHub;
        this.role = 'Engineer';
    }

    getGitHub() {
        return this.gitHub;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Engineer;