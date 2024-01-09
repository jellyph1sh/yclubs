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
    }
    const tagId = await Database.Read(
      DB_PATH,
      "SELECT idTag FROM tags WHERE name=?",
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

// TO DO
exports.updateClub = async (req, res) => {
  const club = req.body;
  const clubId = await Database.Read(
    "SELECT idClub FROM clubs WHERE name=?;",
    data.clubName
  );
  const err = await Database.Write(DBPATH, "UPDATE ");
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


//EVENT
exports.getEvent = async (req, res) => {
  let events = await Database.Read(
    DBPATH,
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

exports.getOneClubsByName = async (clubName) => {
  let clubs = await Database.Read(
    DB_PATH,
    "SELECT * FROM clubs WHERE name=?;",
    clubName
  );
  let club = clubs[0]
  return(club);
};

exports.manageCapitalClub = async (req, res) => {
  const capitals = req.body;
  let CapitalCurrentClub = 0
  let CapitalGoalClub = 0

  let currentClub = await this.getOneClubsByName(capitals.CurrentClubName)
  let goalClub = await this.getOneClubsByName(capitals.GoalClubName)

  if (currentClub.idClub == goalClub.idClub){
    CapitalCurrentClub = (currentClub.capital + capitals.price)
  } else {
    if (capitals.price<0){
      res.json({ status: false });
      return;
    }
    CapitalCurrentClub = (currentClub.capital - capitals.price)
    CapitalGoalClub = (goalClub.capital + capitals.price)
  }
  
  
  if (CapitalCurrentClub >= 0 && CapitalGoalClub >= 0){
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
    if (currentClub.idClub != goalClub.idClub){
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

