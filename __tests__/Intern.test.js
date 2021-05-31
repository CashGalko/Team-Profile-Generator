const Intern = require("../lib/Intern");

describe("Intern", ()=>{
    const intern = new Intern("Jane",1,"jane@doe.com","UCF");
    it("should be an object",()=> {
        
        expect(typeof(intern)).toBe("object");
    })
    it("should return getRole() as Intern",()=>{
        
        expect(intern.getRole()).toBe("Intern");
    })
    it("should return getSchool() as UCF",()=>{
        
        expect(intern.getSchool()).toBe("UCF");
    })
})