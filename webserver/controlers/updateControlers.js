const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "../clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");

exports.updateClub = async (req, res) => {
    const club = req.body;
    const clubId = await Database.Read(
      DB_PATH,
      "SELECT idClub FROM clubs WHERE name=?;",
      club.clubName
    );
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
    const role = req.body;
    if (!Verif.VerifName(role.roleName)) {
      res.json({ status: false, error: "invalidRoleName" });
      return;
    }
    if (!Verif.VerifName(role.clubName)) {
      res.json({ status: false, error: "invalidClubName" });
      return;
    }
    if (isNaN(parseInt(role.userId))) {
      //not a number
      res.json({ status: false, error: "invalidUserId" });
      return;
    }
    const newRoleId = await Database.Read(
      DB_PATH,
      "SELECT roleId FROM roles WHERE name=?;",
      role.roleName
    );
    const clubId = await Database.Read(
      DB_PATH,
      "SELECT idClub FROM clubs WHERE name=?;",
      role.clubName
    );
    const err = await Database.Write(
      DB_PATH,
      "UPDATE membersRoles SET idRole=? WHERE idUser = ? AND idClub = ?;",
      newRoleId[0].idRole,
      role.userId,
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
    if (!Verif.VerifName(capitals.CurrentClubName)) {
      // invalid name or another club with this name should exist
      res.json({ status: false, error: "invalidName" });
      return;
    }
    if (!Verif.VerifName(capitals.GoalClubName)) {
      // invalid name or another club with this name should exist
      res.json({ status: false, error: "invalidName" });
      return;
    }
    if (isNaN(parseInt(capitals.price))) {
      //not a number
      res.json({ status: false, error: "invalidCapital" });
      return;
    }
  
    let CapitalCurrentClub = 0
    let CapitalGoalClub = 0
  
    let currentClub = await this.getOneClubsByName(capitals.CurrentClubName);
    let goalClub = await this.getOneClubsByName(capitals.GoalClubName);
  
    if (currentClub.idClub == goalClub.idClub) {
      CapitalCurrentClub = currentClub.capital + capitals.price;
    } else {
      if (capitals.price<0){
        res.json({ status: false, error: "price < 0" });
        return;
      }
      CapitalCurrentClub = currentClub.capital - capitals.price;
      CapitalGoalClub = goalClub.capital + capitals.price;
    }
  
    if (CapitalCurrentClub >= 0 && CapitalGoalClub >= 0) {
      //update current club
      const err = await Database.Write(
        DB_PATH,
        "UPDATE clubs SET capital=? WHERE idClub=?;",
        CapitalCurrentClub,
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
          CapitalGoalClub,
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