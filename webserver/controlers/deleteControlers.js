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


exports.deleteClub = async (req, res) => {
  const club = req.body;
  if (await stuffCtrlGet.getMemberRole(club.idClub,club.idUser)=="directeur"){

    // delete events for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM events WHERE idClub=?;",
      club.idClub,
    );

    // delete members for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM membersClubs WHERE idClub=?;",
      club.idClub,
    );

    // delete tags for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM clubsTags WHERE idClub=?;",
      club.idClub,
    );
    
    // delete club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM clubs WHERE idClub=?;",
      club.idClub,
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
