//Change routes, have success/fail message append to the page rather than the alert? //

const loginFormHandler = (event) => {
    event.preventDefault();
    console.log("works");

    const userEmail = document.querySelector("#email").value.trim();
    const userPassword = document.querySelector("#password").value.trim();
    let loginObject = {
        email: userEmail,
        password: userPassword,
    };
    if (userEmail && userPassword) {
        const response = await fetch("api/post/login", {
            method: "POST",
            body: JSON.stringify(loginObject),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to log in");
        }
    }
};

async function signupFormHandler(event) {
    event.preventDefault();

    document.location.replace('/signup/');
};

document
    .querySelector("#login-button")
    .addEventListener("click", loginFormHandler);

document.querySelector('#signup-btn').addEventListener('submit', signupFormHandler);