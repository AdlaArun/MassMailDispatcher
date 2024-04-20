const {validEmailIDs} = require('./mailValidator');
const {dateChecker, setDate} = require('./dateChecker');

let count = 0

const recordUpdate = (num_sent_mails) => {
    console.log(count, "old");
    count += num_sent_mails
    console.log(count, "new");
    return count
}

const limitChecker = () => {
    // The below date checker function is for checking if the application is sending the mail within the same date
    // or different date.
    if(dateChecker(new Date())) {
        // the no. of mails sent and the no. of valid mails should not be greater than 100
        // As the limitation for Gmail SMTP free Acc is 100 mails per day
        if(count+validEmailIDs.length <= 100) {
            return {
                output: true,
                msg: "success"
            };
        }  
        else {
            console.log(`count exceeds the limit the given number of mails are ${count}`);
            return {
                output: false,
                msg: "limit exceeded"
            };
        } 
    }
    else {
        // Gmail SMTP can send 100 mails per day so initial check for no. of mails sent with the below line
        if(validEmailIDs.length <= 100) {
            setDate(new Date()); // Update the date to the current date
            return {
                output: true,
                msg: "success"
            };
        }
        else {
            return {
                output: false,
                msg:`Number of valid mails exceeds the limit: ${validEmailIDs.length}`
            };
        }
    }
}

module.exports = {
    limitChecker,
    recordUpdate
}