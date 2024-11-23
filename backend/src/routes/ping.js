const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		res.json("pong");
	} catch (err) {
		res.status(500).json({
			message: "Error pinging",
			error: err.message,
		});
	}
});

module.exports = router;