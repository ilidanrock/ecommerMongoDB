const router = require("express").Router();

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      res.json({aqui : "Aqui ta"})
  }
);

module.exports = router;
