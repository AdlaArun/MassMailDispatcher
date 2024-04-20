let latest_date;

const setDate = (given_date) => {
    const date = given_date
    latest_date = `${String(date.getDate())}-${String(date.getMonth()+1)}-${String(date.getFullYear())}`
}

const dateChecker = (ldate) => {
    current_date = `${String(ldate.getDate())}-${String(ldate.getMonth()+1)}-${String(ldate.getFullYear())}`
    console.log(latest_date, "old");
    console.log(current_date, "new");
    return latest_date === current_date
}

module.exports = {
    dateChecker,
    setDate
}