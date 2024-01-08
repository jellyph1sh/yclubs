const Database = require("./Database.js");
const crypto = require("crypto");

const DB_PATH = "./clubs.db";

//clubs
exports.getClubs = async (req, res) => {
  let clubs = await Database.Read(
    DBPATH,
    "SELECT idClub,idClubParent,name,description,capital FROM clubs;"
  );
  res.json(clubs);
};

exports.addClub = async (req, res) => {
  const club = req.body;
  const parentClubId = await Database.Read(
    "SELECT name FROM clubs WHERE name=?;",
    club.parentClubName
  );
  let err = await Database.Write(
    DBPATH,
    "INSERT INTO clubs(idClubParent,name,description,capital) VALUES(?,?,?,?)",
    parentClubId,
    club.name,
    club.description,
    club.capital
  );
  if (err != null) {
    console.error(err);
    res.json({ status: false });
    return;
  }
  for (const tag in club.tags) {
    err = await Database.Write(
      DBPATH,
      "INSERT INTO tags(name) VALUES(?);",
      tag
    );
    if (err != null) {
      console.error(err);
      return;
    }
    const tagId = await Database.Read(
      DB_PATH,
      "SElECT idTag FROM tags WHERE name=?",
      tag
    );
    err = await Database.Write(
      DB_PATH,
      "INSERT INTO clubsTags(idClub,idTag) VALUES(?,?);",
      club.clubId,
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

exports.updateClub = async (req, res) => {
  const club = req.body;
  const err = await Database.Write(DBPATH, "");
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
  let users = await Database.Read(DBPATH, "");
  res.json(users);
};

exports.addUser = async (req, res) => {
  const user = req.body;
  const password = hashPassword("sha256", "base64", password);
  const err = await Database.Write(
    "INSERT INTO user(lastname,firstname,email,password,isAdmin) VALUES(?,?,?,?,?);",
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
