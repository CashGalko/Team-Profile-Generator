const Manager = require("../lib/Manager");

describe("Manager", ()=>{
    const manager = new Manager("Jane",1,"jane@doe.com","5611234567");
    it("should be an object",()=> {
       
        expect(typeof(manager)).toBe("object");
    })
    it("should return getRole() as Manager",()=>{
     
        expect(manager.getRole()).toBe("Manager");
    })
    it("should return getOfficeNum() as 5611234567",()=>{
     
        expect(manager.getOfficeNum()).toBe("5611234567");
    })
})