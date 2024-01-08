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

router.post('/clubMember',stuffCtrl.addClubMember)

//roles
router.post("/roles/add", stuffCtrl.addRole);
router.post('/updateRoleMember',stuffCtrl.updateRoleMember)

//tag
router.post('/tags',stuffCtrl.addTag)
router.delete('/tags',stuffCtrl.deleteTagClub)

//event
router.get("/events/getall", stuffCtrl.getEvent);
router.post("/events/add", stuffCtrl.addEvent);

module.exports = router;

