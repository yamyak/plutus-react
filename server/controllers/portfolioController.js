const Portfolio = require('../models/portfolioModel');

createPortfolio = (req, res) => {
  const body = req.body;
  if(!body)
  {
    return res.status(400).json({
      success: false,
      message: 'Please provide a portfolio'
    });
  }

  const portfolio = new Portfolio(body);
  if(!portfolio)
  {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Portfolio creation failed'
    });
  }

  portfolio.save()
  .then(() => {
    return res.status(201).json({
      success: true,
      id: profile._id,
      message: 'Portfolio successfully created'
    });
  })
  .catch((err) => {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Portfolio creation failed'
    });
  });
}

getPortfolio = (req, res) => {
  Profile.findOne({ name: req.body.name })
  .then((profile) => {
    if(!profile)
    {
      return res.status(400).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
      message: 'Portfolio data retrieved'
    });
  })
  .catch((err) => {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Portfolio retrieval failed'
    });
  });
}

