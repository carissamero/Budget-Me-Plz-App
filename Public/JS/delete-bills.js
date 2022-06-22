const deleteBillsHandler = async(event) => {
    event.preventDefault();
    let target = { id: event.target.getAttribute("id") };

    // const billToDelete = target.getAttribute('id')
    console.log(target);

    try {
        const response = await fetch("/api/dash/bills/", {
            method: "DELETE",
            body: JSON.stringify(target),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        }
    } catch (err) {
        console.log(err);
    }
};

const billsDB = document.querySelectorAll(".kill-bill");

billsDB.forEach((element) => {
    element.addEventListener("click", deleteBillsHandler);
});
///////

const deleteDebtHandler = async(event) => {
    event.preventDefault();

    const debtToDelete = document.querySelector("#debt-amount").value.trim();

    try {
        const response = await fetch("/api/debt", {
            method: "DELETE",
            body: JSON.stringify({ debtToDelete }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        }
    } catch (err) {
        console.log(err);
    }
};

// document
//     .querySelector('.kill-debt')
//     .addEventListener('click', deleteDebtHandler);