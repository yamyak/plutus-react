const Profile = require('../models/profileModel');

createProfile = (req, res) => {
  const body = req.body;
  console.log(body);
  if(!body)
  {
    console.log('No profile data provided');
    return res.status(400).json({
      success: false,
      message: 'No profile data provided'
    });
  }

  const profile = new Profile(body);
  if(!profile)
  {
    console.log('Profile creation failed 1');
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Profile creation failed'
    });
  }

  profile.save()
  .then(() => {
    console.log('Profile successfully created');
    return res.status(201).json({
      success: true,
      id: profile._id,
      message: 'Profile successfully created'
    });
  })
  .catch((err) => {
    console.log('Profile creation failed 2');
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Profile creation failed'
    });
  });
}

getProfile = (req, res) => {
  Profile.findOne({ name: req.body.name })
  .then((profile) => {
    if(!profile)
    {
      return res.status(400).json({
        success: false,
        message: 'Profile not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
      message: 'Profile data retrieved'
    });
  })
  .catch((err) => {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Profile retrieval failed'
    });
  });
}

module.exports = {
  createProfile,
  getProfile
};