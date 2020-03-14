{
    class Person {
        constructor({firstName, lastName, job})
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.job = job;
            this.skills = [];
            Person._amount = Person._amount || 0;
            Person._amount++;
        }
    
        static get amount()
        {
            return Person._amount;
        }
    
        get fullName()
        {
            return `${this.firstName} ${this.lastName}`;
        }
    
        set fullName(fN)
        {
            if (/[A-Za-z]\s[A-Za-z]/.test(fN)) {
                [this.firstName, this.lastName] = fN.split(' ');
            } else {
                throw Error('Bad full name');
            }
        }
    
        learn(skill)
        {
            this.skills.push(skill);
        }
    }
    
    
    
    class Job{
        constructor(company, position, salary)
        {
            this.company = company;
            this.position = position;
            this.salary = salary;
        }
    }
    
    console.log(Person.amount);
    const john = new Person({
        firstName: 'John',
        lastName: 'Doe',
        job: new Job("YouTube", "Developere", 200000)
    });
    const timmy = new Person({
        firstName: 'Timmy',
        lastName: 'Doe',
        job: new Job("YouTube", "Developere", 200000)
    });
    
    console.log(Person.amount);
    
    john.fullName = "Mike Smith";
    
    john.learn('ES6');
    john.learn('ES7');
    console.log(john, timmy);
}