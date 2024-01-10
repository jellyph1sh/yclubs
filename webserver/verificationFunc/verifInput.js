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

VerifAlias = (a) => {
  for (const v of a) {
    if (!this.VerifName(v, 2, 4)) return false;
  }
  return true;
};

// VerifDate = (date) => {
//   const dateMoment = moment(date, "DD/MM/YYYY");
//   return !isNaN(new Date(dateArr[2], dateArr[1] - 1));
// };

// ManageVerif return an empty string if all data are valid otherwise it return the error code of the first error that is catch
exports.ManageVerif = (elementsToCheck) => {
  elementsToCheck.forEach((element) => {
    switch (element.dataType) {
      case "clubName":
        if (!VerifName(element.data, 3, 20)) return "invalidClubName";
        break;
      case "parentClubName":
        if (!VerifName(element.data, 3, 20)) return "invalidParentClubName";

      break;
      case "name":
        if (!VerifName(element.data, 3, 25)) return "invalidName";
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
        if (!VerifName(element.data)) return "invalidAlias";
        break;
      case "description":
        if (!VerifName(element.data, 0, 255)) return "invalidDescription";
        break;
      case "tags":
        if (!VerifAlias(element.data)) return "invalidTags";
        break;
      default:
        return "invalidDataType";
    }
  });
  return "";
};
