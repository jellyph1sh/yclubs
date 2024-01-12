const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const stuffCtrlGet = require("./getControlers.js");
const tokenFunc = require("../verificationFunc/token.js");

exports.deleteTagClub = async (req, res) => {
  const tag = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubExistId", data: tag.idClub },
    { dataType: "id", data: tag.idTag },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const tokenResult = tokenFunc.verifToken(req);
  if (
    (await stuffCtrlGet.getMemberRole(tag.idClub, tokenResult.idUser)) ==
      "directeur" ||
    tokenResult != false
  ) {
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
    return;
  }
  res.json({ status: false });
};

exports.deleteClub = async (req, res) => {
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubExistId", data: club.idClub },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const tokenResult = tokenFunc.verifToken(req);
  if (
    (await stuffCtrlGet.getMemberRole(tag.idClub, tokenResult.idUser)) ==
      "directeur" ||
    tokenResult != false
  ) {
    // delete events for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM events WHERE idClub=?;",
      club.idClub
    );

    // delete members for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM membersClubs WHERE idClub=?;",
      club.idClub
    );

    // delete tags for the club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM clubsTags WHERE idClub=?;",
      club.idClub
    );

    // delete club
    err = await Database.Write(
      DB_PATH,
      "DELETE FROM clubs WHERE idClub=?;",
      club.idClub
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    res.json({ status: true });
    return;
  }
  res.json({ status: false });
};

// exports.deleteTagClub = async (req, res) => {
//   const tag = req.body;
//   const verifResult = Verif.ManageVerif([
//     { dataType: "clubExistId", data: tag.idClub },
//     { dataType: "userExistId", data: tag.idUser },
//   ]);
//   if (verifResult != "") {
//     res.json({ status: false, error: verifResult });
//     return;
//   }
//   const tokenResult = tokenFunc.verifToken(req);
//   if (
//     (await stuffCtrlGet.getMemberRole(tag.idClub, tokenResult.idUser)) ==
//       "directeur" ||
//     tokenResult != false 
//     || true // temp condition because role system is not 
//   ) {
//     err = await Database.Write(
//       DB_PATH,
//       "DELETE FROM membersClubs WHERE idClub=? AND idUser=?;",
//       tag.idClub,
//       tag.idUser
//     );
//     if (err != null) {
//       console.error(err);
//       res.json({ status: false });
//       return;
//     }
//     res.json({ status: true });
//     return;
//   }
//   res.json({ status: false });
// };
