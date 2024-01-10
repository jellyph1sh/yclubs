const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");

exports.deleteTagClub = async (req, res) => {
  const tag = req.body;
  err = await Database.Write(
    DB_PATH,
    "DELETE FROM tags WHERE idClub=? AND idTag=?;",
    tag.idClub,
    tag.idTag
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};
