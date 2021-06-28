const Manager = require("../lib/Manager");

describe("Manager", ()=>{
    const manager = new Manager("cash",1,"cash@galko.com","1234567890");
    it("should be an object",()=> {
       
        expect(typeof(manager)).toBe("object");
    })
    it("should return getRole() as Manager",()=>{
     
        expect(manager.getRole()).toBe("Manager");
    })
    it("should return getOfficeNum() as 1234567890",()=>{
     
        expect(manager.getOfficeNum()).toBe("1234567890");
    })
})