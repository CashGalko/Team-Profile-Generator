const Engineer = require("../lib/Engineer");

describe("Engineer",()=>{
    const engineer = new Engineer("Jane",1,"jane@doe.com","janegit");
    it("Should be able to instantiate",()=>{
       
        expect(typeof(engineer)).toBe("object");
    })
    it("should return getRole() as Engineer",()=>{
       
        expect(engineer.getRole()).toBe("Engineer");
    })
    it("should return getGit() as janegit",()=>{
       
        expect(engineer.getGit()).toBe("janegit");
    })
})