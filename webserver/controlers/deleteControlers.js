const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const stuffCtrlGet = require("./getControlers.js");

exports.deleteTagClub = async (req, res) => {
  const tag = req.body;
  if (await stuffCtrlGet.getMemberRole(tag.idClub,tag.idUser)=="directeur"){
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM clubsTags WHERE idClub=? AND idTag=?;",
      tag.idClub,
      tag.idTag
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    res.json({ status: true });
    return
  }
  res.json({ status: false });
};
