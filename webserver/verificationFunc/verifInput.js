const stuffCtrlGet = require("../controlers/getControlers.js");

VerifInput = (s) => {
  // return true if the input is valide else false
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  banStrings.forEach((banString) => {
    if (s.includes(banString)) {
      console.log(banString, "ban");
      return false;
    }
  });
  console.log("valid input");
  return true;
};

VerifEmail = (s) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s);
};

VerifName = (s, minLength = 3, maxLength = 25) => {
  //return true if the name is valid else false
  // caract allowed : 'A-z' ' ' 'À-ú
  // length allowed : minLength <= currentLength <= maxLength
  const regx = new RegExp(`^[\\w\\sÀ-ú]{${minLength},${maxLength}}$`);
  return regx.test(s) && this.VerifInput(s);
};

VerifImage = (s) => {
  // const regx = new RegExp(`(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)`, "g");
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(s);
};

VerifTags = (a) => {
  for (const v of a) {
    if (!this.VerifName(v, 3, 20)) return false;
  }
  return true;
};

// VerifDate = (date) => {
//   const dateMoment = moment(date, "DD/MM/YYYY");
//   return !isNaN(new Date(dateArr[2], dateArr[1] - 1));
// };

// ManageVerif return an empty string if all data are valid otherwise it return the error code of the first error that is catch
//
// Possible action :
//    1) check if string data are valid
//       (clubName,name,password,alias,description,tags)
//
//    2) check if some data are in right format
//       (email,image,date)
//
//    3) check if number data are in right format
//       (capital,id)
//
//    4) check if some data are consistent with the database
//       (userExistId,clubExistId)

exports.ManageVerif = (elementsToCheck) => {
  elementsToCheck.forEach((element) => {
    switch (element.dataType) {
      case "clubName":
        if (!VerifName(element.data, 3, 20)) return "invalidClubName";
        break;
      case "parentClubName":
        if (
          isNaN(stuffCtrlGet.getOneClubsByName(element.data)) ||
          !VerifName(element.data, 3, 20)
        )
          return "invalidParentClubName";
        break;
      case "roleAssign":
        if (
          isNaN(stuffCtrlGet.getOneRoleByName(element.data)) ||
          !VerifName(element.data, 3, 20)
        )
          return "invalidRoleName";
        break;
      case "name":
        if (!VerifName(element.data, 3, 25)) return "invalidName";
        break;
      case "email":
        if (!VerifEmail(element.data) || !Verif.VerifInput(element.data))
          return "invalidEmail";
        break;
      case "password":
        if (!Verif.VerifInput(element.data)) return "invalidInput";
        break;
      case "date":
        if (
          isNaN(moment(event.date, "DD/MM/YYYY").toDate()) ||
          !Verif.VerifInput(event.date)
        )
          return "invalidDate";
        break;
      case "image":
        if (!VerifImage(element.data)) return "invalidImage";
        break;
      case "alias":
        if (!VerifName(element.data, 2, 4)) return "invalidAlias";
        break;
      case "description":
        if (!VerifName(element.data, 0, 255)) return "invalidDescription";
        break;
      case "tags":
        if (!isNaN(element.data)) {
          if (!VerifTags(element.data.split(" "))) return "invalidTags";
        }
        break;
      case "capital":
        if (isNaN(parseInt(element.data))) return "invalidCapital";
        break;
      case "id":
        if (isNaN(parseInt(element.data))) return "invalidId";
        break;
      case "userExistId":
        if (
          !isNaN(stuffCtrlGet.getUserById(element.data)) ||
          isNaN(parseInt(element.data))
        )
          return "invalidUserId";
        break;
      case "clubExistId":
        if (
          !isNaN(stuffCtrlGet.getUserById(element.data)) ||
          isNaN(parseInt(element.data))
        )
          return "invalidClubId";
        break;

      default:
        return "invalidDataType";
    }
  });
  return "";
};
