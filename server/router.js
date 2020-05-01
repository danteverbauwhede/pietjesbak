const router = require('express').Router();

router.get("/", (req, res) => {
  res.send("You S of a B, I'm running.")
})

module.exports = router;