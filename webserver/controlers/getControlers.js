const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const hashFunc = require("../verificationFunc/password.js");
const stuffCtrlGet = require("./getControlers.js");

// CLUBS
exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
};

exports.getOneClubByName = async (clubName) => {
  const verifResult = Verif.ManageVerif([
    { dataType: "clubName", data: clubName },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  return clubs[0];
};

exports.getLastClubs = async (_req, res) => {
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs ORDER BY idClub DESC LIMIT 1 ;"
  );
  res.json(clubs);
};

exports.getClubById = async (clubId) => {
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE idClub=?;",
    clubId
  );
  return clubs[0];
};

exports.getNbrClubs = async (req, res) => {
  const nbrClubs = await Database.Read(
    DB_PATH,
    "SELECT COUNT(idClub) FROM clubs;"
  );
  res.json(nbrClubs);
};

// USERS
exports.getAllUsers = async (_req, res) => {
  const users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users;"
  );
  res.json(users);
};

exports.loginUsers = async (req, res) => {
  const loginUser = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "email", data: loginUser.email },
    { dataType: "password", data: loginUser.password },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users WHERE email=?;",
    loginUser.email
  );
  if (
    users[0].password ==
    hashFunc.hashPassword("sha256", "base64", loginUser.password)
  ) {
    res.json(users);
  } else {
    res.json({ status: false, error: "Password or email is false" });
  }
};

exports.getUserById = async (userId) => {
  const verifResult = Verif.ManageVerif([
    { dataType: "userExistId", data: userId },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const users = await Database.Read(
    DB_PATH,
    "SELECT * FROM users WHERE idUser=?;",
    userId
  );
  return users[0];
};

// MEMBERS CLUB
exports.getNbrMembers = async (_req, res) => {
  const nbrMember = await Database.Read(
    DB_PATH,
    "SELECT COUNT(DISTINCT idUser) FROM membersClubs;"
  );
  res.json(nbrMember);
};

exports.getMembersClub = async (req, res) => {
  // TO DO : définir quelles données sont utiles lors de la récupération des utilisateurs
  const data = req.body;
  const verifResult = Verif.ManageVerif([
    { dataType: "parentClubName", data: data.clubName },
  ]);
  if (verifResult != "") {
    res.json({ status: false, error: verifResult });
    return;
  }
  const club = this.getOneClubByName(data.clubName);
  const members = await Database.Read(
    DB_PATH,
    "SELECT * FROM users JOIN membersClubs ON users.idUser = membersClubs.idUser WHERE idClub = ?;",
    club
  );
  res.json(members);
};

//EVENTS
exports.getEvents = async (_req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT idEvent,idClub,name,description FROM events;"
  );
  res.json(events);
};

exports.get3LastEvents = async (_req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT * FROM events ORDER BY idEvent DESC LIMIT 3 ;"
  );
  res.json(events);
};

// ROLES
exports.getOneRoleByName = async (roleName) => {
  const roles = await Database.Read(
    DB_PATH,
    "SELECT * FROM roles WHERE name=?;",
    roleName
  );
  return roles[0];
};
