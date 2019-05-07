export class Contact {

    constructor(id:string, name: string, email: string) {
      this.Id = id;
      this.Name = name;
      this.EmailAddress = email;
    }
  
    Id: string;
    Name: string;
    EmailAddress: string;
  }