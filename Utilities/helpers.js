//    returns:
//--- an object with multiple (current & due) dates
const dateData = () => {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date();

    let year = date.getFullYear();
    let nextYear = 1;
    let day = date.getDate();
    let nextMonth = date.getMonth() + 1;

    if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += year;
    } else {
        nextYear = year;
    }

    return {
        month: month[date.getMonth()],
        day: day,
        year: date.getFullYear(),
        formalDate: `${month[date.getMonth()]} ${day}, ${year}`,
        formalDueDate: `${month[nextMonth]} ${day}, ${nextYear}`,
        informalDate: `${date.getMonth() + 1}/${day}/${year}`,
        informalDueDate: `${nextMonth + 1}/${day}/${nextYear}`,
    };
};

//    returns:
//--- the sum of all bills,
//--- and the income leftover
const leftOverCalculation = (monthlyIncome, allBills) => {
    let billTotal = 0;
    allBills.forEach((element) => {
        total += element.amount;
    });
    return {
        totalBills: billTotal,
        leaves: monthlyIncome - billTotal,
    };
};

//    returns:
//--- the total amount of all bills before the next payday,
//--- the updated checkingAcc total
const updateCheckingCalculation = (textValue, allBills, accounts) => {
    let checking = 0;
    let total = 0;
    let userInput = textValue.splce(" ")[1];

    accounts.forEach((element) => {
        if (element.name.toLowerCase() === "checking") {
            return (checking = element.amount);
        }
    });

    allBills.forEach((element) => {
        let day = element.dueDate.slice(" ")[1];
        if (day <= userInput) {
            total += element.amount;
        }
    });
    return {
        billsDue: total,
        updatedCheckingBalance: checking - total,
    };
};

const datePackage = dateData();

module.exports = {
    datePackage,
    leftOverCalculation,
    updateCheckingCalculation,
};