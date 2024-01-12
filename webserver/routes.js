const express = require("express");

const router = express.Router();
const stuffCtrlAdd = require("./controlers/addControlers.js");
const stuffCtrlGet = require("./controlers/getControlers.js");
const stuffCtrlUpdate = require("./controlers/updateControlers.js");
const stuffCtrlDelete = require("./controlers/deleteControlers.js");

// CLUBS
router.get("/clubs/getall", stuffCtrlGet.getClubs);
router.get("/clubs/getLast", stuffCtrlGet.getLastClubs);
// router.get("/clubs/get_one", stuffCtrlGet.getOneClubs);
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
// router.post("/clubsMembers/update", stuffCtrlUpdate.updateMember);
router.post("/clubsMembers/updateRoles", stuffCtrlUpdate.updateRoleMember);
// router.delete('/clubsMembers/delete',stuffCtrlDelete.ClubMember)

// ROLES
router.post("/roles/add", stuffCtrlAdd.addRole);
// router.delete("/roles/delete", stuffCtrlDelete.Role);

// TAGS
router.post("/tags/addToClub", stuffCtrlAdd.addTagToClub);
router.delete("/tags/deleteToClubs", stuffCtrlDelete.deleteTagClub);

// EVENTS
router.get("/events/getall", stuffCtrlGet.getEvents);
router.get("/events/get3Last", stuffCtrlGet.getThreeLastEvents);
router.post("/events/add", stuffCtrlAdd.addEvent);
// router.get("/events/getClub", stuffCtrlGet.getClubEvent);

// CAPITAL
router.post("/capital/update", stuffCtrlUpdate.updateCapitalClub);

module.exports = router;

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const fusion = (left, right) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  return fusion(mergeSort(left), mergeSort(right));
}
a = 1;
a = 2;
