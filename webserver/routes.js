const express = require("express");

const router = express.Router();
const stuffCtrlAdd = require("./controlers/addControlers.js");
const stuffCtrlGet = require("./controlers/getControlers.js");
const stuffCtrlUpdate = require("./controlers/updateControlers.js");
const stuffCtrlDelete = require("./controlers/deleteControlers.js");

// CLUBS
router.get("/clubs/getall", stuffCtrlGet.getClubs);
router.get("/clubs/getLast", stuffCtrlGet.getLastClubs);
router.post("/clubs/getOneById", stuffCtrlGet.getOneClubById);
router.post("/clubs/getClubByIdUser", stuffCtrlGet.getClubByIdUser);
router.get("/clubs/getNbrClub", stuffCtrlGet.getNbrClubs);
router.post("/clubs/getAdminPage", stuffCtrlGet.getClubAdminPage);
router.post("/clubs/add", stuffCtrlAdd.addClub);
router.post("/clubs/update", stuffCtrlUpdate.updateClub);
router.delete("/clubs/delete", stuffCtrlDelete.deleteClub);

// USERS
router.get("/users/getall", stuffCtrlGet.getAllUsers);
router.post("/users/login", stuffCtrlGet.loginUsers);
router.post("/users/add", stuffCtrlAdd.addUser);

// CLUB MEMBERS
router.get("/clubsMembers/getNbrMembers", stuffCtrlGet.getNbrMembers);
router.post("/clubsMembers/getMembersByClub", stuffCtrlGet.getMembersClub);
router.post("/clubsMembers/add", stuffCtrlAdd.addClubMember);

router.post("/clubsMembers/updateRoles", stuffCtrlUpdate.updateRoleMember);


// ROLES
router.post("/roles/add", stuffCtrlAdd.addRole);

// TAGS
router.post("/tags/addToClub", stuffCtrlAdd.addTagToClub);
router.delete("/tags/deleteToClubs", stuffCtrlDelete.deleteTagClub);

// EVENTS
router.get("/events/getall", stuffCtrlGet.getEvents);
router.get("/events/get3Last", stuffCtrlGet.getThreeLastEvents);
router.post("/events/add", stuffCtrlAdd.addEvent);
router.delete("/events/delete", stuffCtrlDelete.deleteEvent);

// CAPITAL
router.post("/capital/update", stuffCtrlUpdate.updateCapitalClub);

module.exports = router;

