const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const hashFunc = require("../verificationFunc/password.js");
const stuffCtrlGet = require("./getControlers.js");

exports.addClub = async (req, res) => {
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "clubname", data: club.clubName },
    { dataType: "description", data: club.description },
    { dataType: "parentClubName", data: club.parentClubName },
    { dataType: "alias", data: club.alias },
    { dataType: "capital", data: club.capital },
    { dataType: "image", data: club.image },
    { dataType: "tags", data: club.tags },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
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

exports.addUser = async (req, res) => {
  const user = req.body;
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

exports.addClubMember = async (req, res) => {
  const club = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "email", data: club.email },
    { dataType: "parentClubName", data: club.clubName }, // the parent club is the member's new club
    { dataType: "roleAssign", data: club.roleName },
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
};

exports.addRole = async (req, res) => {
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
  const event = req.query;
  const verifResult = Verif.ManageVerif([
    { dataType: "name", data: event.name },
    { dataType: "description", data: event.description },
    { dataType: "name", data: event.name },
    { dataType: "date", data: event.date },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const date = moment(event.date, "DD/MM/YYYY").toDate();
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

exports.addTagToClub = async (req, res) => {
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