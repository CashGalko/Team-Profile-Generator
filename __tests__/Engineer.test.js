const Engineer = require("../lib/Engineer");

describe("Engineer",()=>{
    const engineer = new Engineer("cash",1,"cash@galko.com","cashgit");
    it("Should be able to instantiate",()=>{
       
        expect(typeof(engineer)).toBe("object");
    })
    it("should return getRole() as Engineer",()=>{
       
        expect(engineer.getRole()).toBe("Engineer");
    })
    it("should return getGit() as cashgit",()=>{
       
        expect(engineer.getGit()).toBe("cashgit");
    })
})