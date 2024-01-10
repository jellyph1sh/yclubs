const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");
const hashFunc = require("../verificationFunc/password.js")

exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
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


exports.getLastClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs ORDER BY idClub DESC LIMIT 1 ;"
  );
  res.json(clubs);
};

exports.getNbrClubs = async (req, res) => {
  let nbrClubs = await Database.Read(
    DB_PATH,
    "SELECT COUNT(idClub) FROM clubs;"
  );
  res.json(nbrClubs);
};

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

exports.getNbrMembers = async (req, res) => {
  let nbrMember = await Database.Read(
    DB_PATH,
    "SELECT COUNT(DISTINCT idUser) FROM membersClubs;"
  );
  res.json(nbrMember);
};


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


