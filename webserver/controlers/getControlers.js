const Database = require("../Database.js");
const crypto = require("crypto");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const moment = require("moment");

exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
};

exports.getUsers = async (req, res) => {
  console.log("test")
  let users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users;"
  );
  res.json(users);
};

exports.getEvents = async (req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT idEvent,idClub,name,description FROM events;"
  );
  res.json(events);
};

exports.getOneClubByName = async (clubName) => {
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  return clubs[0];
};

exports.getOneRoleByName = async (roleName) => {
  const roles = await Database.Read(
    DB_PATH,
    "SELECT * FROM roles WHERE name=?;",
    roleName
  );
  return roles[0];
};

exports.getUserById = async (userId) => {
  const users = await Database.Read(
    DB_PATH,
    "SELECT * FROM users WHERE idUser=?;",
    userId
  );
  return users[0];
};

exports.getClubById = async (clubId) => {
    const clubs = await Database.Read(
      DB_PATH,
      "SELECT * FROM clubs WHERE idClub=?;",
      clubId
    );
    return clubs[0];
  };