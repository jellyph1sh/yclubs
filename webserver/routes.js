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

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const fusion = (left, right) => {
    let result = [];
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
