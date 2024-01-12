const Database = require("../Database.js");
const DB_PATH = "./clubs.db";
const Verif = require("../verificationFunc/verifInput.js");
const hashFunc = require("../verificationFunc/password.js");
const tokenFunc = require("../verificationFunc/token.js");

// CLUBS
exports.getClubs = async (_req, res) => {
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs;"
  );
  res.json({ clubs: clubs });
};

exports.getOneClubByName = async (clubName) => {
  const verifResult = Verif.ManageVerif([
    { dataType: "clubName", data: clubName },
  ]);
  if (verifResult != "") {
    return "invalidClubName";
  }
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  if (clubs.length == 0) {
    return "unknownClubName";
  }
  return clubs[0];
};

exports.getOneClubById = async (req, res) => {
  const club = req.body
  const verifResult = Verif.ManageVerif([
    { dataType: "id", data: club.idClub },
  ]);

  if (verifResult != "") {
    res.json({ error: "invalid IdClub" });
    return
  }
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE idClub=?;",
    club.idClub
  );
  if (clubs.length == 0) {
    res.json({ error: "unknownClubId" });
    return
  }
  const president = await Database.Read(
    DB_PATH,
    "SELECT roles.description, users.lastname, users.firstname FROM membersClubs INNER JOIN roles on roles.idRole = membersClubs.idRole INNER JOIN users on users.idUser = membersClubs.idUser WHERE membersClubs.idClub=? AND membersClubs.idRole = 2;",
    club.idClub
  );
  if (president.length == 0) {
    res.json({ error: "unknown president" });
    return
  }
  const events = await Database.Read(
    DB_PATH,
    "SELECT * FROM events WHERE idClub=? ORDER BY idEvent DESC LIMIT 2;",
    club.idClub
  );
  
  if (events.length == 0) {
    res.json({ club: clubs[0], president: president[0], event_one: "", event_two: ""});
    return
  }
  if (events.length == 1){
    res.json({ club: clubs[0], president: president[0], event_one: events[0]});
  } else {
    res.json({ club: clubs[0], president: president[0], event_one: events[0], event_two: events[1]});
  }
  
};

exports.getLastClubs = async (req, res) => {
  if (!tokenFunc.verifyToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs ORDER BY idClub DESC LIMIT 1 ;"
  );
  res.json({ club: clubs[0] });
};

exports.getClubById = async (clubId) => {
  const clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE idClub=?;",
    clubId
  );
  return clubs[0];
};

exports.getNbrClubs = async (_req, res) => {
  const nbrClubs = await Database.Read(
    DB_PATH,
    "SELECT COUNT(idClub) AS nbrClubs FROM clubs;"
  );
  res.json({ nbrClubs: nbrClubs[0].nbrClubs });
};

// USERS
exports.getAllUsers = async (req, res) => {
  if (!tokenFunc.verifToken(req)) {
    res.json({ status: false, error: "inexistantToken" });
    return;
  }
  const users = await Database.Read(
    DB_PATH,
    "SELECT idUser,lastname,firstname,email,password,isAdmin FROM users;"
  );
  res.json({ allUsers: users });
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
  if (users.length != 0) {
    if (
      users[0].password ==
      hashFunc.hashPassword("sha256", "base64", loginUser.password)
    ) {
      const token = tokenFunc.createToken(users[0].idUser, loginUser.email);
      res.json({ isLogin: true, user: JSON.stringify(users[0]), token: token });
      return;
    } else {
      res.json({ error: "Password is false", isLogin: false });
      return;
    }
  }
  res.json({ error: "email is false", isLogin: false });
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
    "SELECT COUNT(DISTINCT idUser) AS nbrMember FROM membersClubs;"
  );
  res.json({ nbrMember: nbrMember[0].nbrMember });
};

exports.getMembersClub = async (req, res) => {
  // TO DO : définir quelles données sont utiles lors de la récupération des utilisateurs
  const data = req.body;
  const club = await this.getOneClubByName(data.clubName);
  if (club == "invalidClubName" || club == "unknownClubName") {
    res.json({ status: false, error: club });
    return;
  }
  const members = await Database.Read(
    DB_PATH,
    "SELECT * FROM users JOIN membersClubs ON users.idUser = membersClubs.idUser WHERE idClub = ?;",
    club.idClub
  );
  res.json({ members: members });
};

exports.getMemberRole = async (idClub, idUser) => {
  const memberRole = await Database.Read(
    DB_PATH,
    "SELECT roles.name FROM membersClubs INNER JOIN roles on roles.idRole = membersClubs.idRole WHERE membersClubs.idClub=? AND membersClubs.idUser=?;",
    idClub,
    idUser
  );
  if (memberRole.length != 0) {
    return memberRole[0].name;
  }
  return "";
};

exports.isUserInClub = async (userId, clubId) => {
  const nbrMember = await Database.Read(
    DB_PATH,
    "SELECT COUNT(DISTINCT idUser) FROM membersClubs WHERE idUser = ? AND idClub = ?;",
    userId,
    clubId
  );
  res.json(nbrMember);
};

//EVENTS
exports.getEvents = async (_req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT events.name AS name, events.description AS description, events.date AS date, clubs.alias AS alias FROM events JOIN clubs ON clubs.idClub = events.idClub;"
  );
  res.json({ events: events });
};

exports.getThreeLastEvents = async (_req, res) => {
  const events = await Database.Read(
    DB_PATH,
    "SELECT events.name AS name, events.description AS description, clubs.alias AS alias FROM events JOIN clubs ON events.idClub = clubs.idClub ORDER BY idEvent DESC LIMIT 3 ;"
  );
  res.json({ events: JSON.stringify(events) });
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
