//Change routes, have success/fail message append to the page rather than the alert? //
const signUpFormHandler = async(event) => {
    event.preventDefault();
    console.log('listening');
    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (firstName && lastName && email && password) {
        let user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            pay_day: "mm/dd/yyyy",
            monthly_income: 0,
            checking: 0,
            savings: 0,
            credit_card: 0,
            bills_before: 0,
            new_checking: 0,
        };

        const response = await fetch("/api/post/signup", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(
                "User already exists. Please log in or sign up with a different email."
            );
        }
    }
};

document
    .getElementById("signup-button")
    .addEventListener("click", signUpFormHandler);

// document
//     .querySelector("#signup-button")
//     .addEventListener("click", signUpFormHandler);