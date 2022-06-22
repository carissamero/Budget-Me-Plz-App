let spinner = document.getElementById("spinner");
let spinner2 = document.getElementById("spinner2");
let wheel1 = document.getElementById("wheel1");
let wheel2 = document.getElementById("wheel2");
let wheel3 = document.getElementById("wheel3");
let logo = document.querySelector("#logo-flare").children[0];
let logoName = document.querySelector("#logo-name");
let num = 0;
let num2 = 0;
let t = 0;
rotateSpinner = () => {
    setInterval(function() {
        num += 30;
        if (num === 360) {
            num = 0;
        }
        spinner.style.transform = `rotate(${num}deg)`;
        spinner2.style.transform = `rotate(${num}deg)`;
    }, 100);
};

rotateWheel = () => {
    setInterval(function() {
        num2 += 2;
        if (num2 === 360) {
            num2 = 0;
        }
        wheel1.style.transform = `rotate(${num2}deg)`;
        wheel2.style.transform = `rotate(${num2}deg)`;
        wheel3.style.transform = `rotate(${num2}deg)`;
    }, 5);
};

logoName.addEventListener("mouseover", function(event) {
    logoName.style.color = "#000";

    let timer = setInterval(function() {
        t += -1;
        if (t === 360) {
            t = 0;
        }
        logo.parentElement.style.transform = `rotate(${t}deg)`;
    }, 20);

    logoName.addEventListener("mouseout", function() {
        logoName.style.color = "#000";
        clearInterval(timer);
    });
});