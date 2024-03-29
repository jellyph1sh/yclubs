const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const tokenFunc = require("../verificationFunc/token.js");
const stuffCtrlGet = require("./getControlers.js");

exports.updateClub = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubExistId", data: club.idClub },
    { dataType: "clubName", data: club.newName },
    { dataType: "alias", data: club.alias },
    { dataType: "description", data: club.description },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }

  if (
    true || // temp useless condition
    (await stuffCtrlGet.getMemberRole(club.idClub, club.idUser)) == "directeur"
  ) {
    const err = await Database.Write(
      DB_PATH,
      "UPDATE clubs SET name=?, description=?,alias=?,image=? WHERE idClub=?;",
      club.newName,
      club.description,
      club.alias,
      club.image,
      club.idClub
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    res.json({ status: true });
    return;
  } else {
    res.json({ status: false });
  }
};

exports.updateRoleMember = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const data = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "name", data: data.roleName },
    { dataType: "parentClubName", data: data.clubName },
    { dataType: "userExistId", data: data.userId },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const clubId = stuffCtrlGet.getOneClubByName(clubName);
  if ((await stuffCtrlGet.getMemberRole(clubId, data.userId)) == "directeur") {
    const newRoleId = await Database.Read(
      DB_PATH,
      "SELECT idRole FROM roles WHERE name=?;",
      data.roleName
    );

    const err = await Database.Write(
      DB_PATH,
      "UPDATE membersClubs SET idRole=? WHERE idUser = ? AND idClub = ?;",
      newRoleId[0].idRole,
      data.userId,
      clubId[0].idClub
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    res.json({ status: true });
    return;
  } else {
    res.json({ status: false });
  }
};

exports.updateCapitalClub = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const capitals = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "parentClubName", data: capitals.receivingClubName },
    { dataType: "parentClubName", data: capitals.donnorClubName },
    { dataType: "capital", data: capitals.price },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }

  let CapitalDonnorClub = 0;
  let CapitalReceivingClub = 0;

  const donnorClub = await stuffCtrlGet.getOneClubByName(
    capitals.donnorClubName
  );
  const receivingClub = await stuffCtrlGet.getOneClubByName(
    capitals.receivingClubName
  );

  if (
    (await stuffCtrlGet.getMemberRole(donnorClub.idClub, capitals.userId)) ==
      "directeur" ||
    (await stuffCtrlGet.getMemberRole(donnorClub.idClub, capitals.userId)) ==
      "trésorier"
  ) {
    if (
      donnorClub.idClub == receivingClub.idClub ||
      donnorClub.idClubParent == undefined ||
      donnorClub.idClubParent == receivingClub.idClub
    ) {
      if (donnorClub.idClub == receivingClub.idClub) {
        CapitalDonnorClub = donnorClub.capital + capitals.price;
      } else {
        if (capitals.price < 0) {
          res.json({ status: false, error: "price < 0" });
          return;
        }
        CapitalDonnorClub = donnorClub.capital - capitals.price;
        CapitalReceivingClub = receivingClub.capital + capitals.price;
      }

      if (CapitalDonnorClub >= 0 && CapitalReceivingClub >= 0) {
        //update donnor club
        const err = await Database.Write(
          DB_PATH,
          "UPDATE clubs SET capital=? WHERE idClub=?;",
          CapitalDonnorClub,
          donnorClub.idClub
        );
        if (err != null) {
          console.error(err);
          res.json({ status: false });
          return;
        }
        if (donnorClub.idClub != receivingClub.idClub) {
          //update receiving club
          const err2 = await Database.Write(
            DB_PATH,
            "UPDATE clubs SET capital=? WHERE idClub=?;",
            CapitalReceivingClub,
            receivingClub.idClub
          );
          if (err2 != null) {
            console.error(err2);
            res.json({ status: false });
            return;
          }
        }
      } else {
        res.json({ status: false, error: "price < 0" });
        return;
      }
      res.json({ status: true });
      return;
    } else {
      res.json({
        status: false,
        error: "You can't modify the capital of this club",
      });
      return;
    }
  }
  res.json({ status: false, error: "You don't have the permissions" });
  return;
};

exports.updateClubName = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubName", data: club.newName },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const isClubExist = await stuffCtrlGet.getOneClubByName(club.newName);
  if (isClubExist != "unknownClubName") {
    res.json({ status: false, error: "clubAlreadyExist" });
    return;
  }
  if (
    true
    // (await stuffCtrlGet.getMemberRole(club.idClub, club.idUser)) == "directeur"
  ) {
    const err = await Database.Write(
      DB_PATH,
      "UPDATE clubs SET name=? WHERE idClub=?;",
      club.newName
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    console.log("name edit");
    res.json({ status: true });
    return;
  } else {
    res.json({ status: false, error: "userNotOwner" });
  }
};
