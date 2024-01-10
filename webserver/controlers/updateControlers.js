const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const stuffCtrlGet = require("./getControlers.js");

exports.updateClub = async (req, res) => {
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubname", data: club.newName },
    { dataType: "description", data: club.newDescription },
    { dataType: "parentClubName", data: club.clubName },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const clubId = stuffCtrlGet.getOneClubByName(club.clubName);
  const err = await Database.Write(
    DB_PATH,
    "UPDATE clubs SET name=?, description=? WHERE idClub=?;",
    club.newName,
    club.newDescription,
    clubId[0].idClub
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

exports.updateRoleMember = async (req, res) => {
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
  const newRoleId = await Database.Read(
    DB_PATH,
    "SELECT roleId FROM roles WHERE name=?;",
    data.roleName
  );
  const clubId = stuffCtrlGet.getOneClubByName(clubName);
  const err = await Database.Write(
    DB_PATH,
    "UPDATE membersRoles SET idRole=? WHERE idUser = ? AND idClub = ?;",
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
};

exports.updateCapitalClub = async (req, res) => {
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

  const currentClub = await this.getOneClubByName(capitals.receivingClubName);
  const goalClub = await this.getOneClubByName(capitals.donnorClubName);

  if (currentClub.idClub == goalClub.idClub) {
    CapitalDonnorClub = currentClub.capital + capitals.price;
  } else {
    if (capitals.price < 0) {
      res.json({ status: false, error: "price < 0" });
      return;
    }
    CapitalDonnorClub = currentClub.capital - capitals.price;
    CapitalReceivingClub = goalClub.capital + capitals.price;
  }

  if (CapitalDonnorClub >= 0 && CapitalReceivingClub >= 0) {
    //update current club
    const err = await Database.Write(
      DB_PATH,
      "UPDATE clubs SET capital=? WHERE idClub=?;",
      CapitalDonnorClub,
      currentClub.idClub
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    if (currentClub.idClub != goalClub.idClub) {
      //update goal club
      const err2 = await Database.Write(
        DB_PATH,
        "UPDATE clubs SET capital=? WHERE idClub=?;",
        CapitalReceivingClub,
        goalClub.idClub
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
};
