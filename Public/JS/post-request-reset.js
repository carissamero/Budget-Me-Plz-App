//Change routes, have success/fail message append to the page rather than the alert? //

const requestPassResetFormHandler = async(event) => {
    event.preventDefault();

    const accountEmail = document.querySelector("#email-login").value.trim();

    if (accountEmail) {
        const response = await fetch("/api/post/request-new", {
            method: "POST",
            body: JSON.stringify({ accountEmail }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Please enter a valid email");
        }
    }
};

document
    .querySelector("#request-reset")
    .addEventListener("click", requestPassResetFormHandler);