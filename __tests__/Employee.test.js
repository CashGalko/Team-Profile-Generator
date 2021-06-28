const Employee = require("../lib/Employee");

describe("Employee", ()=>{
    const employee = new Employee("cash",1,"cash@galko.com");
    it("should Instantiate a new object ",()=>{
        
        expect(typeof(employee)).toEqual("object");
    })
    it("should return getRole() as Employee",()=>{
       
        expect(employee.getRole()).toBe("Employee");
    })
    it("should return getID() as 1",()=>{
        
        expect(employee.getID()).toBe(1);
    })
    it("should return getEmail() as jane@doe.com",()=>{
        
        expect(employee.getEmail()).toBe("jane@doe.com");
    })
})