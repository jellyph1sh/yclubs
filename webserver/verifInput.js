const VerifInput = (s) => {
  const banStrings = ["<", ">", "select", "update", "delete", "from"];
  for (const banString in banStrings) {
    if (s.banString) {
      return false;
    }
  }
  return true;
};
