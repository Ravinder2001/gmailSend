/** @format */

// /** @format */

var nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL,
		pass: process.env.PASSWORD,
	},
});

const express = require("express");
const router = express.Router();
const app = express();
router.get("/", async (req, res) => {
	try {
		return res.send("Hii");
	} catch (err) {
		console.log(err.message);
	}
});
router.get("/send", async (req, res) => {
	try {
		var mailOptions = {
			from: process.env.GMAIL,
			to: req.query.email,
			subject: "Yatra Booking Confirmation",
			html: `<div>
			<img
				src='https://bl.thgim.com/migration_catalog/ouzym0/article18356825.ece/alternates/WIDE_615/ct26New-Yatra-Logo'
				width='200px'
			/>
			<h1>Your Ticket Booked Successfully</h1>
			<h2>${req.query.flight}</h1>
			<h2>PNR:${req.query.pnr}</h2>
			<h2>${req.query.from} to ${req.query.to}</h2>
			<h2>${req.query.pass} Passenger</h2>
			<h2>Fare:₹${req.query.price}</h2>
			<h1>Thank You & Have a Safe Journey</h1>
		</div>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error.message);
			} else {
				console.log("Email sent: " + info.response);
			}
		}),
			res.send("Mail Sent");
	} catch (err) {
		console.log(err.message);
	}
});
const PORT = process.env.PORT || 2000;
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => {
	console.log("listening to port " + PORT);
});
