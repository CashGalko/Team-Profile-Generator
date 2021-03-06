const Intern = require("../lib/Intern");

describe("Intern", ()=>{
    const intern = new Intern("cash",1,"cash@galko.com","UCF");
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