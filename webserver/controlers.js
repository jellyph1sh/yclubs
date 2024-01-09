const Database = require("./Database.js");
const crypto = require("crypto");

const DB_PATH = "./clubs.db";

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
  let parentClubId = null;
  if (club.parentClubName != "none") {
    parentClubId = await Database.Read(
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
  const password = hashPassword("sha256", "base64", user.password);
  const err = await Database.Write(
    DB_PATH,
    "INSERT INTO users(lastname,firstname,email,password,isAdmin) VALUES(?,?,?,?,?);",
    user.lastname,
    user.firstname,
    user.email,
    password,
    user.isAdmin
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

exports.addClubMember = async (req, res) => {
  const data = req.body;
  const clubId = await Database.Read(
    "SELECT idClub FROM clubs WHERE name=?;",
    data.clubName
  );
  const roleId = await Database.Read(
    "SELECT idRole FROM roles WHERE name=?;",
    data.roleName
  );
  const err = await Database.Write(
    "INSERT INRO membersClubs(idClub,idUser,idRole) VALUES(?,?,?);",
    clubId,
    data.userId,
    roleId
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
    "INSERT INTO roles(name,description) VALUES(?,?);",
    role.name,
    role.description
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
  const newRoleId = await Database.Read(
    "SELECT roleId FROM roles WHERE name=?;",
    role.roleName
  );
  const clubId = await Database.Read(
    "SELECT idClub FROM clubs WHERE name=?;",
    data.clubName
  );
  const err = await Database.Write(
    "UPDATE membersRoles SET idRole=? WHERE idUser = ? AND idClub = ?;",
    newRoleId,
    role.userId,
    clubId
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

//EVENT
exports.getEvent = async (req, res) => {
  let events = await Database.Read(
    DB_PATH,
    "SELECT idEvent,idClub,name,description FROM events;"
  );
  res.json(events);
};

exports.addEvent = async (req, res) => {
  const event = req.body;
  const err = await Database.Write(
    "INSERT INTO events(idClub,name,description) VALUES(?,?,?);",
    event.idClub,
    event.name,
    event.description
  );
  console.log("test");
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  res.json({ status: true });
};

//TAG
exports.addTag = async (req, res) => {
  const tag = req.body;
  err = await Database.Write(
    DBPATH,
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
    tagId
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
    DBPATH,
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
