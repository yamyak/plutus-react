const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');

addStock = (req, res, next) => {
  Stock.create({
    ticker: req.body.ticker,
  })
  .then((stock) => {
    if(stock)
    {
      Portfolio.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { stocks: stock._id } },
        { new: true }
      ).populate('stocks')
      .then((port) => {
        if(port)
        {
          return res.status(200).json({
            success: true,
            data: port,
            message: 'Stock successfully created'
          });
        }
        else
        {
          var err = new Error('Current portfolio does not exist');
          err.status = 403;
          next(err);
        }
      })
      .catch((err) => next(err));
    }
    else
    {
      var err = new Error('Unable to add stock ' + req.body.ticker);
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

module.exports = {
  addStock
};