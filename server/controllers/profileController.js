const Profile = require('../models/profileModel');

createProfile = (req, res) => {
  const body = req.body;
  if(!body)
  {
    return res.status(400).json({
      success: false,
      message: 'No profile data provided'
    });
  }

  Profile.findOne({ name: body.name })
  .then((data) => {
    if(data)
    {
      return res.status(400).json({
        success: false,
        message: 'Duplicate profile'
      });
    }

    const profile = new Profile(body);
    if(!profile)
    {
      return res.status(400).json({
        success: false,
        error: err,
        message: 'Profile creation failed 1'
      });
    }

    profile.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: profile,
        message: 'Profile successfully created'
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
        message: 'Profile creation failed 2'
      });
    });
  })
  .catch((err) => {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Profile creation failed 3'
    });
  });
}

module.exports = {
  createProfile,
};