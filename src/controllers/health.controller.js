const catchAsync = require('../utils/catchAsync');

const healthMessage = {
  message: 'i am healthy, thanks for asking',
};

const health = catchAsync(async (req, res) => {
  res.send(healthMessage);
});

module.exports = {
  health,
};
