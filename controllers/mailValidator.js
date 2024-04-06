const {readFileSync, unlink} = require("fs")
let emailIDs = [];
let validEmailIDs = [];
let invalidEmailIDs = [];

async function checkDomainExists(domain) {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}`);
        const data = await response.json();
        return data.Answer && data.Answer.length > 0;
    } catch (error) {
        console.error("Error checking domain:", error);
        return false;
    }
}

async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
    if (!emailRegex.test(email)) {
        return false;
    }
    const domain = email.split('@')[1];
    
    if (!domainRegex.test(domain)) {
        return false;
    }
    
    const domainExists = await checkDomainExists(domain);
    return domainExists;
}


const mailIDValidation = async (path) => {
    emailIDs = readFileSync(path, 'utf8').split('\n')
    emailIDs = Array.from(new Set(emailIDs))
    emailIDs.pop()
    validEmailIDs.length = 0
    invalidEmailIDs.length = 0

    let return_value = "";

    for(let email of emailIDs) {
        const value = await validateEmail(email)
        if(value){
            validEmailIDs.push(email) 
        } 
        else {
            invalidEmailIDs.push(email)
        } 
    }

    if(validEmailIDs.length <= 100) {
        return_value =  "success"
    }
    else {
        return_value = "exceeded"
    }
    unlink(path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return "file delete error"
        }
        console.log('File deleted successfully');
    })

    return return_value
}


module.exports = { mailIDValidation, validEmailIDs, invalidEmailIDs }
