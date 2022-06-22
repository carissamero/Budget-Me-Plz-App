///ADD CHECKING AND SAVINGS INFO ///

const checkSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="30pt" height="20pt" version="1.1" viewBox="-40 0 170 170" xmlns="http://www.w3.org/2000/svg">
 <path d="m0 65.98c2.6406-5.2773 7.918-11.875 17.156-9.2383 7.918 2.6406 13.195 10.559 17.156 21.113 31.672-35.629 58.062-60.699 89.73-68.617 3.957 0 5.2773 0 2.6406 2.6406-34.309 23.754-67.301 59.383-93.691 105.57-1.3203 1.3203-2.6406 1.3203-3.957 0-5.2773-13.195-9.2383-26.391-15.836-39.586-2.6406-6.5977-6.5977-11.875-13.195-11.875z" fill="#39c367" fill-rule="evenodd"/>
</svg>`;
const notCheckedSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="30pt" height="20pt" version="1.1" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
 <path d="m23.297 68.734h81.281c1.4062 0 2.5586-1.1523 2.5586-2.5586v-4.4805c0-1.4062-1.1523-2.5586-2.5586-2.5586h-81.281c-1.4062 0-2.5586 1.1523-2.5586 2.5586v4.4805c-0.003906 1.4102 1.1484 2.5586 2.5586 2.5586z" fill="#9999"/>
</svg>`;

const svgTakenBoolean = async(event) => {
    const billId = event.target.getAttribute("id");
    const billStatus = event.target.getAttribute("status");
    let isTrue = false;
    if (billStatus == "true") {
        isTrue = false;
    } else {
        isTrue = true;
    }

    console.log("working");
    if (billId && billStatus) {
        let billInfo = {
            id: billId,
            debited: isTrue,
        };
        console.log(billInfo);
        const response = await fetch("/api/put/bills", {
            method: "PUT",
            body: JSON.stringify(billInfo),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
            // const flipSVGS = (target, status) => {
            //   if(status == "true") {
            //     target.innerHTML = notCheckedSVG;
            //     target.setAttribute('status', 'false')
            //   } else {
            //     target.innerHTML = checkSVG;
            //     target.setAttribute('status', 'true')
            //   }
            // }

            // flipSVGS(event.target, billStatus)
        } else {
            alert("Please complete all fields.");
        }
    }
};
const svgEL = document.querySelectorAll(".svg-taken");
svgEL.forEach((element) => {
    element.addEventListener("click", svgTakenBoolean);
});

const accountHandler = async(event) => {
    event.preventDefault();
    let target = event.target;
    const account_amount =
        target.parentElement.parentElement.children[0].textContent
        .split("")
        .filter((data) => data != "$")
        .filter((data) => data != ",")
        .join("");
    const account_name =
        target.parentElement.children[0].textContent.toLowerCase();

    if (account_name && account_amount) {
        let accountData = {
            name: account_name,
            amount: account_amount,
        };
        console.log(accountData);
        const response = await fetch("/api/dash/account", {
            method: "PUT",
            body: JSON.stringify(accountData),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please enter an amount.");
        }
    }
};
const accountEL = document.querySelectorAll(".account-save-button");

accountEL.forEach((element) => {
    element.addEventListener("click", accountHandler);
});

const monthlyIncomeHandler = async(event) => {
    event.preventDefault();
    console.log(event.target.parentElement.children[1]);

    const monthlyIncome = event.target.parentElement.children[1].innerHTML
        .split("")
        .filter((data) => data != "$")
        .filter((data) => data != ",")
        .join("");

    if (monthlyIncome) {
        let data = {
            monthly_income: monthlyIncome,
        };
        console.log(data);
        const response = await fetch("/api/put/income", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please enter an amount.");
        }
    }
};
const monthlyEL = document
    .querySelector("#monthly-income-clickable")
    .addEventListener("click", monthlyIncomeHandler);

///ADD BILLS ///
const billsHandler = async(event) => {
    event.preventDefault();
    console.log(event.target);

    const billName = document.querySelector("#bill-name").value.trim();
    const billCost = parseInt(document.querySelector("#bill-cost").value.trim());
    const billDueDate = document.querySelector("#bill-due-date").value;
    const billIsAutoPay = document.querySelector("#bill-is-auto-pay");
    let isautoPay = false;
    if (billIsAutoPay.checked) {
        isautoPay = true;
    }
    // const billIsDebited = document.querySelector('#bill-is-debited').value.trim()
    console.log(billName, billCost, billDueDate, billIsAutoPay);

    if (billName && billCost && billDueDate && billIsAutoPay) {
        let billInfo = {
            name: billName,
            cost: billCost,
            due_date: billDueDate,
            auto_pay: isautoPay,
            debited: false,
        };
        console.log(billInfo);
        const response = await fetch("/api/dash/bills", {
            method: "POST",
            body: JSON.stringify(billInfo),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            console.log(response.status);
            // -------------------------------------------- remove later
            document.location.replace("/");
        }
    }
};
document
    .querySelector("#bill-save-button")
    .addEventListener("click", billsHandler);

////ADD CARDS////Need to initialize with sample info at id: 1
const cardsHandler = async(event) => {
    event.preventDefault();

    const cardName = document.querySelector("#card-name").value.trim();
    const cardAmount = document.querySelector("#card-amount").value.trim();
    const cardDueDate = document.querySelector("#card-due-date").value.trim();

    if (cardName && cardAmount && cardDueDate) {
        let cardInfo = {
            name: cardName,
            amount: cardAmount,
            due_date: cardDueDate,
        };
        console.log(cardInfo);
        const response = await fetch("/api/cards", {
            method: "PUT",
            body: JSON.stringify(cardInfo),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please complete all fields.");
        }
    }
};
// document
//   .querySelector('#card-save-button')
//   .addEventListener('click', cardsHandler)

///UPDATE MONTHLY INCOME//////
const incomeHandler = async(event) => {
    event.preventDefault();

    const monthlyIncome = document.querySelector("#monthly-income").value.trim();

    if (monthlyIncome) {
        let monthlyIncomeData = {
            income: monthlyIncome,
        };
        console.log(monthlyIncomeData);
        const response = await fetch("/api/income", {
            method: "PUT",
            body: JSON.stringify(monthlyIncomeData),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please enter a value.");
        }
    }
};
// document
//   .querySelector('#income-save-button')
//   .addEventListener('click', incomeHandler)

/////UPDATE NEXT PAYDAY/////
const paydayHandler = async(event) => {
    event.preventDefault();

    const nextPayday = document.querySelector("#next-payday").value.trim();

    if (nextPayday) {
        let paydayData = {
            payday: paydayData,
        };
        console.log(paydayData);
        const response = await fetch("/api/payday", {
            method: "PUT",
            body: JSON.stringify(paydayData),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please enter a value.");
        }
    }
};
// document
//   .querySelector('#payday-save-button')
//   .addEventListener('click', paydayHandler)