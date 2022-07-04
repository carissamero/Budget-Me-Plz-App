//Change routes, have success/fail message append to the page rather than the alert? //

// const loginFormHandler = async (event) => {
//   event.preventDefault();
//   console.log("works");

//   const userEmail = document.querySelector("#email").value.trim();
//   const userPassword = document.querySelector("#password").value.trim();
//   let loginObject = {
//     email: userEmail,
//     password: userPassword,
//   };
//   if (userEmail && userPassword) {
//     fetch("api/login", {
//       method: "POST",
//       body: JSON.stringify(loginObject),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((response) => {
//         if (response.auth) {
//           document.location.replace("/user");
//         } else {
//           alert("Failed to log in");
//         }
//       });
//   }
// };

async function loginFormHandler(event) {
  event.preventDefault(); 

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    const response = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/user');
    } else {
      alert(response.statusText);
    }
  }
}

async function signupFormHandler(event) {
    event.preventDefault();
    document.location.replace('/signup/');
};

document
  .querySelector("#login-button")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-btn")
  .addEventListener("submit", signupFormHandler);
