const monthlybillsEL = document.querySelector("#monthly-bills");
const monthlyincomeEL = document.querySelector("#monthly-income");
const leaves = document.querySelector("#leaves");
const checkingEL = document.querySelector("#checking-account");

const dueDateEL = document.querySelector("#formal-due");
const beforeEL = document.querySelector("#due-before");
const newCheckingEL = document.querySelector("#new-checking");

const billCostEL = document.querySelectorAll(".bill-cost");
const billNameEL = document.querySelectorAll(".bill-name");
const informalDueDatesEL = document.querySelectorAll(".informal-due-date");

billCostEL.forEach((element) => {
    let x = parseInt(element.innerHTML).toLocaleString();
    element.textContent = `$${x}`;
});

informalDueDatesEL.forEach((element) => {
    let x = element.innerHTML.split("-");
    let y = [`${x[1]}/`, `${x[2]}/`, `${x[0]}`].join("");
    element.textContent = y;
});
// not finished!
billNameEL.forEach((element) => {
    let arr = element.innerHTML.split("");
    // console.log(arr)
    let index = undefined;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element === "&") {
            index = i;
        }
    }
    arr = arr.filter((data) => data != "&").map((data) => data.toUpperCase());
    // console.log(arr)
    if (index != undefined) {
        arrss = arr.splice(index, 4, "&");
        // console.log(arrss)
    }

    element.textContent = `${arr.join("")}`;
});

const leftOverCalculation = () => {
    let arr = monthlybillsEL.innerHTML
        .split(",")
        .filter((data) => data != "")
        .map((data) => parseInt(data));
    let x = 0;
    arr.forEach((element) => {
        x += element;
    });
    // console.log(x);

    let income = monthlyincomeEL.innerHTML;
    let billtotal = x;
    let newone = parseInt(
        income
        .split("")
        .filter((data) => data != "$")
        .filter((data) => data != ",")
        .join("")
    );
    let leftover = newone - billtotal;

    monthlyincomeEL.textContent = `${income}`;
    monthlybillsEL.textContent = ` - $${billtotal.toLocaleString()}`;

    if (leftover < 0) {
        leftover *= -1;
        leaves.textContent = `- $${leftover.toLocaleString()}`;
        leaves.style.color = `#EE4949`;
    } else {
        leaves.textContent = `+ $${leftover.toLocaleString()}`;
        leaves.style.color = `#2CBB39`;
    }
};

const newCheckingBalance = () => {
    dueDateEL.text;
};

const timeBar = () => {
    const tbEL = document.querySelector("#time-bar");
    const timeBallEL = document.querySelector("#time-ball");
    const timeINTEL = document.querySelector("#time-int");

    let size = window.screen.width;
    let seconds = 86400;

    let dt = new Date();
    let options = { hour12: true };
    let secs = dt.getSeconds() + 60 * dt.getMinutes() + 60 * 60 * dt.getHours();
    let fraction = Math.floor((size / seconds) * secs);
    let ampm = dt.toLocaleString("en-US", options).split(" ").splice(2, 1);
    let time =
        dt
        .toLocaleString("en-US", options)
        .split(",")
        .splice(1, 1)
        .join("")
        .split(":")
        .splice(0, 2)
        .join(":") + ` ${ampm}`;

    tbEL.style.width = `${Math.floor((size / seconds) * secs)}px`;
    timeBallEL.style.left = `${fraction - 15}px`;
    timeINTEL.style.left = `${fraction - 70}px`;
    timeINTEL.innerHTML = time;

    setInterval(() => {
        let dt = new Date();
        let ampm = dt.toLocaleString("en-US", options).split(" ").splice(2, 1);
        let time =
            dt
            .toLocaleString("en-US", options)
            .split(",")
            .splice(1, 1)
            .join("")
            .split(":")
            .splice(0, 2)
            .join(":") + ` ${ampm}`;
        let secs = dt.getSeconds() + 60 * dt.getMinutes() + 60 * 60 * dt.getHours();
        let fraction = Math.floor((size / seconds) * secs);

        timeBallEL.style.left = `${fraction - 15}px`;
        tbEL.style.width = `${fraction}px`;
        timeINTEL.innerHTML = time;
        timeINTEL.style.left = `${fraction - 70}px`;
    }, 500);
};

timeBar();

leftOverCalculation();