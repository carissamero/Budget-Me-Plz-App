const nodemailer = require("nodemailer");

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "budgetmeplz@gmail.com",
                pass: "BudgetM3PLz!",
            },
        });

        await transporter.sendMail({
            from: "budgetmeplz@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
module.exports = sendEmail;