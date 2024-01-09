exports.VerifInput = (s) => {
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  for (const banString in banStrings) {
    if (s.includes(banString)) {
      return false;
    }
  }
  return true;
};

exports.VerifEmail = (s) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(s);
};

exports.VerifName = (s) => {
  return /^[\w\s]*$/.test(s) && s.length < 25;
};
