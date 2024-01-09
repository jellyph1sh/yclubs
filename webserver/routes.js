const express = require("express");

const router = express.Router();
const stuffCtrl = require("./controlers.js");

//clubs
router.get("/clubs/getall", stuffCtrl.getClubs);
router.post("/clubs/add", stuffCtrl.addClub);
router.post("/clubs/update", stuffCtrl.updateClub);

//users
router.get("/users/getall", stuffCtrl.getUsers);
router.post("/users/add", stuffCtrl.addUser);

router.post("/clubMember/add", stuffCtrl.addClubMember);
router.post("/clubMember/update", stuffCtrl.updateRoleMember);

//roles
router.post("/roles/add", stuffCtrl.addRole);
router.post("/updateRoleMember", stuffCtrl.updateRoleMember);

//tag
router.post("/tags", stuffCtrl.addTagToClub);
router.delete("/tags", stuffCtrl.deleteTagClub);

//event
router.get("/events/getall", stuffCtrl.getEvents);
router.post("/events/add", stuffCtrl.addEvent);

module.exports = router;
