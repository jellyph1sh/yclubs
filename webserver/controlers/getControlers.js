const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const hashFunc = require("../verificationFunc/password.js")


// CLUBS
exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
};

exports.getOneClubByName = async (clubName) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  let club = clubs[0];
  return club;
};


exports.getLastClubs = async (req, res) => {
  let clubs = await Database.Read(
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
  let nbrClubs = await Database.Read(
    DB_PATH,
    "SELECT COUNT(idClub) FROM clubs;"
  );
  res.json(nbrClubs);
};

// USERS
exports.getAllUsers = async (req, res) => {
  let users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users;"
  );
  res.json(users);
};

exports.loginUsers = async (req, res) => {
  const loginUser = req.body
  let users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users WHERE email=?;",
    loginUser.email
  );
  if (users[0].password == hashFunc.hashPassword("sha256", "base64", loginUser.password)){
    res.json(users);
  }else{
    res.json({ status: false, error: "Password or email is false" });
  }
};

exports.getUserById = async (userId) => {
  const users = await Database.Read(
    DB_PATH,
    "SELECT * FROM users WHERE idUser=?;",
    userId
  );
  return users[0];
};


// MEMBERS CLUB
exports.getNbrMembers = async (req, res) => {
  let nbrMember = await Database.Read(
    DB_PATH,
    "SELECT COUNT(DISTINCT idUser) FROM membersClubs;"
  );
  res.json(nbrMember);
};

//EVENTS
exports.getEvents = async (req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT idEvent,idClub,name,description FROM events;"
  );
  res.json(events);
};

exports.get3LastEvents = async (req, res) => {
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
