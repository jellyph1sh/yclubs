const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
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
  if (await stuffCtrlGet.getMemberRole(clubId,club.idUser)=="directeur"){
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
    return
  } else {
    res.json({ status: false });
  }
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
  const clubId = stuffCtrlGet.getOneClubByName(clubName);
  if (await stuffCtrlGet.getMemberRole(clubId,data.userId)=="directeur"){
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

  if (await stuffCtrlGet.getMemberRole(currentClub.idClub,capitals.userId)=="directeur" || await stuffCtrlGet.getMemberRole(currentClub.idClub,capitals.userId)=="trésorier"){

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
      //update donnor club
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
        //update receiving club
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
    return
  }else{
    res.json({ status: false });
    return
  }
};
