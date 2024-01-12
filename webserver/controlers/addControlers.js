const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const hashFunc = require("../verificationFunc/password.js");
const tokenFunc = require("../verificationFunc/token.js");
const stuffCtrlGet = require("./getControlers.js");

// 1) Verification of incoming data :
//    - stop the request if there is a problem with incoming data
//    - otherwise continue
//
// 2) Adding club in database
//
// 3) Adding tags and link them with the newly created club
exports.addClub = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const club = req.body;
  // 1)
  const verifResult = Verif.ManageVerif([
    { dataType: "clubName", data: club.name },
    { dataType: "description", data: club.description },
    { dataType: "parentClubName", data: club.parentClubName },
    { dataType: "alias", data: club.alias },
    { dataType: "capital", data: club.capital },
    { dataType: "tags", data: club.tags },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  // 2)
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
    club.clubName,
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
  // 3)
  const tags = club.tags.split(" ");
  let clubId = await Database.Read(
    DB_PATH,
    "SELECT idClub FROM clubs WHERE name=?;",
    club.clubName
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

// 1) Verification of incoming data :
//    - stop the request if there is a problem with incoming data
//    - otherwise continue
//
// 2) Adding user in database with an encrypt password
exports.addUser = async (req, res) => {
  const user = req.body;
  // 1)
  const verifResult = Verif.ManageVerif([
    { dataType: "email", data: user.email },
    { dataType: "name", data: user.firstname },
    { dataType: "name", data: user.lastname },
    { dataType: "password", data: user.password },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  // 2)
  const password = hashFunc.hashPassword("sha256", "base64", user.password);
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

// 1) Verification of incoming data :
//    - stop the request if there is a problem with incoming data
//    - otherwise continue
//
// 2) Adding a new member to a club with a role
exports.addClubMember = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const club = req.body;
  // 1)
  const verifResult = Verif.ManageVerif([
    { dataType: "parentClubName", data: club.clubName }, // the parent club is the member's new club
    { dataType: "clubName", data: club.clubName },
    { dataType: "roleAssign", data: club.roleName }, // if the role is not previously create it will return an error code
    { dataType: "userExistId", data: club.userId },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const clubId = await Database.Read(
    DB_PATH,
    "SELECT idClub FROM clubs WHERE name=?;",
    club.clubName
  );
  if (
    (await stuffCtrlGet.getMemberRole(clubId, club.idUserConnected)) ==
    "directeur"
  ) {
    const userInClub = stuffCtrlGet.isUserInClub(club.userId, clubId);
    if (userInClub != 0) {
      res.json({ status: false, error: "userAlreadyInClub" });
      return;
    }
    const roleId = await Database.Read(
      DB_PATH,
      "SELECT idRole FROM roles WHERE name=?;",
      club.roleName
    );
    const err = await Database.Write(
      DB_PATH,
      "INSERT INTO membersClubs(idClub,idUser,idRole) VALUES(?,?,?);",
      clubId[0].idClub,
      club.userId,
      roleId[0].idRole
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false });
      return;
    }
    res.json({ status: true });
  } else {
    res.json({ status: true, error: "You don't have the permissions" });
  }
};

exports.addRole = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const role = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "name", data: role.name },
    { dataType: "description", data: role.description },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
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

exports.addEvent = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const event = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "name", data: event.name },
    { dataType: "description", data: event.description },
    { dataType: "clubExistId", data: event.idClub },
    { dataType: "date", data: event.date },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const date = moment(event.date, "YYYY/MM/DD").toDate();
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
    res.json({ status: false, error: err });
    return;
  }
  res.json({ status: true });
};

exports.addTagToClub = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const tag = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "name", data: tag.name },
    { dataType: "parentClubName", data: tag.clubName },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  err = await Database.Write(
    DB_PATH,
    "INSERT INTO tags(name,description) VALUES(?);",
    tag.name
  );
  if (err != null) {
    console.log("A tag already exist in the database");
  }
  const tagToAdd = await Database.Read(
    DB_PATH,
    "SELECT idTag FROM tags WHERE name=?",
    tag.name
  );
  const club = stuffCtrlGet.getOneClubByName(tag.clubName);
  err = await Database.Write(
    DB_PATH,
    "INSERT INTO clubsTags(idClub,idTag) VALUES(?,?);",
    club[0].idClub,
    tagToAdd[0].idTag
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

exports.addClubMemberByEmail = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const data = req.body;
  // 1)
  let verifResult = Verif.ManageVerif([
    { dataType: "email", data: data.email },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const userId = await stuffCtrlGet.getUserByEmail(data.email);
  if (userId == "invalidEmail") {
    res.json({ status: false, error: "invalidEmail" });
    return
  }
  if (
    (await stuffCtrlGet.getMemberRole(data.clubId, data.idUserConnected)) ==
      "directeur" ||
    true // temp condition because role system is not ready
  ) {
    const userInClub = await stuffCtrlGet.isUserInClub(
      data.userId,
      data.clubId
    );
    if (userInClub != 0) {
      res.json({ status: false, error: "userAlreadyInClub" });
      return;
    }
    const roleId = await Database.Read(
      DB_PATH,
      "SELECT idRole FROM roles WHERE name='membre';"
    );
    if (roleId.length == 0) {
      const err = await Database.Write(
        DB_PATH,
        "INSERT INTO roles(name,description) VALUES(?,?);",
        "membre",
        "simple membre du club"
      );
      if (err != null) {
        console.error(err);
        res.json({ status: false, error: "cannot insert 'membre' role" });
        return;
      }
      roleId = await Database.Read(
        DB_PATH,
        "SELECT idRole FROM roles WHERE name='membre';",
        "membre"
      );
    }
    console.log(userId);
    const err = await Database.Write(
      DB_PATH,
      "INSERT INTO membersClubs(idClub,idUser,idRole) VALUES(?,?,?);",
      data.clubId,
      userId.idUser,
      roleId[0].idRole
    );
    if (err != null) {
      console.error(err);
      res.json({ status: false, error: "cannot add this member to the club" });
      return;
    }
    res.json({ status: true });
  } else {
    res.json({ status: false, error: "You don't have the permissions" });
  }
};
