var IdGenerator = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = IdGenerator;