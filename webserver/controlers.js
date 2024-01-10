const Database = require("./Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("./verifInput.js");
const moment = require("moment");

//clubs
exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
};

exports.addClub = async (req, res) => {
  const club = req.body;
  if (!Verif.VerifName(club.name)) {
    // invalid name or another club with this name should exist
    res.json({ status: false, error: "invalidName" });
    return;
  }
  if (!Verif.VerifName(club.description, 0, 255)) {
    // invalid description length or invalid word are in description
    res.json({ status: false, error: "invalidDescription" });
    return;
  }
  if (!Verif.VerifName(club.parentClubName)) {
    res.json({ status: false, error: "invalidParentClubName" });
    return;
  }
  if (!Verif.VerifName(club.alias, 2, 5)) {
    res.json({ status: false, error: "invalidAlias" });
    return;
  }
  if (isNaN(parseInt(club.capital))) {
    //not a number
    res.json({ status: false, error: "invalidCapital" });
    return;
  }
  if (!Verif.VerifImage(club.image)) {
    //not a valid image link
    res.json({ status: false, error: "invalidImage" });
    return;
  }
  if (!Verif.VerifArray(club.tags.split(" "))) {
    // invalid tags
    res.json({ status: false, error: "invalidTag" });
    return;
  }
  let parentClubId = null;
  if (club.parentClubName != "none") {
    parentClubId = await Database.Read(
      DB_PATH,
      "SELECT name FROM clubs WHERE name=?;",
      club.parentClubName
    );
  }
  let err = await Database.Write(
    DB_PATH,
    "INSERT INTO clubs(idClubParent,name,description,capital,alias,image) VALUES(?,?,?,?,?,?)",
    parentClubId,
    club.name,
    club.description,
    parseInt(club.capital),
    club.alias,
    club.image
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false, errorType: err.code });
    return;
  }
  const tags = club.tags.split(" ");
  let clubId = await Database.Read(
    DB_PATH,
    "SELECT idClub FROM clubs WHERE name=?;",
    club.name
  );
  clubId = clubId[0].idClub;
  for (const tag of tags) {
    err = await Database.Write(
      DB_PATH,
      "INSERT INTO tags(name) VALUES(?);",
      tag
    );
    if (err != null) {
      console.error("tag already create");
      console.error(err);
    }
    let tagId = await Database.Read(
      DB_PATH,
      "SELECT idTag FROM tags WHERE name=?",
      tag
    );
    tagId = tagId[0].idTag;
    err = await Database.Write(
      DB_PATH,
      "INSERT INTO clubsTags(idClub,idTag) VALUES(?,?);",
      clubId,
      tagId
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
  }
  res.json({ status: true });
};

// TO DO
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

//TO DO : DELETE CONTROLER

//users

const hashPassword = (algorithm, base, passwd) => {
  return crypto.createHash(algorithm).update(passwd).digest(base);
};

exports.getUsers = async (req, res) => {
  let users = await Database.Read(
    DB_PATH,
    "SELECT lastname,firstname,email,password,isAdmin FROM users;"
  );
  res.json(users);
};

exports.addUser = async (req, res) => {
  const user = req.body;
  if (!Verif.VerifEmail(user.email) || !Verif.VerifInput(user.email)) {
    res.json({ status: false, error: "invalidEmailFormat" });
    return;
  }
  if (!Verif.VerifName(user.firstname) || !Verif.VerifName(user.lastname)) {
    res.json({ status: false, error: "invalidName" });
    return;
  }
  if (!Verif.VerifInput(user.password)) {
    res.json({ status: false, error: "invalidPassword" });
    return;
  }
  const password = hashPassword("sha256", "base64", user.password);
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO users(lastname,firstname,email,password,isAdmin) VALUES(?,?,?,?,?);",
    user.lastname,
    user.firstname,
    user.email,
    password,
    false
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  console.log("an user has been successfully add");
  res.json({ status: true });
};

exports.addClubMember = async (req, res) => {
  const data = req.body;
  const clubId = await Database.Read(
    DB_PATH,
    "SELECT idClub FROM clubs WHERE name=?;",
    data.clubName
  );
  const roleId = await Database.Read(
    DB_PATH,
    "SELECT idRole FROM roles WHERE name=?;",
    data.roleName
  );
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO membersClubs(idClub,idUser,idRole) VALUES(?,?,?);",
    clubId[0].idClub,
    data.userId,
    roleId[0].idRole
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

//roles

exports.addRole = async (req, res) => {
  const role = req.body;
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO roles(name,description) VALUES(?,?);",
    role.name,
    role.description
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  console.log("a role has been successfully add");
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

//EVENT
exports.getEvents = async (req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT idEvent,idClub,name,description FROM events;"
  );
  res.json(events);
};

exports.addEvent = async (req, res) => {
  const event = req.query;
  if (!Verif.VerifName(event.name)) {
    res.json({ status: false, error: "invalidEventName" });
    return;
  }
  if (!Verif.VerifName(event.description)) {
    res.json({ status: false, error: "invalidEventDescription" });
    return;
  }
  if (isNaN(parseInt(event.idClub))) {
    //not a number
    res.json({ status: false, error: "invalidUserId" });
    return;
  }
  // DD/MM/YYYY
  const date = moment(event.date, "DD/MM/YYYY").toDate();
  if (!Verif.VerifInput(event.date) || isNaN(date)) {
    res.json({ status: false, error: "invalidDate" });
    return;
  }
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO events(idClub,name,description,date) VALUES(?,?,?,?);",
    parseInt(event.idClub),
    event.name,
    event.description,
    date
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

//TAG
exports.addTagToClub = async (req, res) => {
  const tag = req.body;
  err = await Database.Write(
    DB_PATH,
    "INSERT INTO tags(name) VALUES(?);",
    tag.name
  );
  if (err != null) {
    console.error(err);
  }
  const tagId = await Database.Read(
    DB_PATH,
    "SELECT idTag FROM tags WHERE name=?",
    tag
  );
  err = await Database.Write(
    DB_PATH,
    "INSERT INTO clubsTags(idClub,idTag) VALUES(?,?);",
    tag.clubId,
    tagId[0].idTag
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

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

exports.getOneClubsByName = async (clubName) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  let club = clubs[0];
  return club;
};

exports.manageCapitalClub = async (req, res) => {
  const capitals = req.body;
  let CapitalCurrentClub = 0;
  let CapitalGoalClub = 0;

  let currentClub = await this.getOneClubsByName(capitals.CurrentClubName);
  let goalClub = await this.getOneClubsByName(capitals.GoalClubName);

  if (currentClub.idClub == goalClub.idClub) {
    CapitalCurrentClub = currentClub.capital + capitals.price;
  } else {
    if (capitals.price < 0) {
      res.json({ status: false });
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
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};
