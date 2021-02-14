const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');

addStock = (req, res, next) => {
  Stock.create({
    name: "name",
    ticker: req.body.ticker,
    industry: "industry",
    sector: "sector",
    price: 0,
    peratio: 0,
    dividend: 0,
    score: 0
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
            portfolio: port,
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

deleteStock = (req, res, next) => {
  Stock.deleteOne({ _id: req.body.stockId })
  .then(() => {
    Portfolio.findOneAndUpdate(
      { _id: req.body.portId },
      { $pull: { stocks: req.body.stockId } },
      { new: true }
    ).populate('stocks')
    .then((port) => {
      if(port)
      {
        return res.status(200).json({
          success: true,
          portfolio: port,
          message: 'Stock successfully deleted'
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
  })
  .catch((err) => next(err));
};

module.exports = {
  addStock,
  deleteStock
};