const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');

addStock = (req, res, next) => {
  Stock.create({
    name: "name",
    ticker: req.body.ticker,
    price: 0, 
    score: 0,
    industry: "industry",
    sector: "sector",
    peratio: 0,
    dividend: 0,
    profit: 0,
    revenue: 0,
    debt: 0,
    marketcap: 0,
    payoutratio: 0,
    pbratio: 0,
    currentratio: 0,
    quickratio: 0,
    grossmargin: 0,
    operatingmargin: 0,
    debttoequity: 0,
    debtratio: 0,
    netmargin: 0,
    receivablesturnover: 0,
    assetturnover: 0,
    returnonequity: 0
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
  Stock.findOneAndDelete({ _id: req.body.stockId })
  .then((stock) => {
    if(stock)
    {
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
    }
    else
    {
      var err = new Error('Unable to delete stock ' + req.body.stockId);
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

getStock = (req, res, next) => {
  Stock.findOne({ _id: req.body.id })
  .then((full) => {
    if(full)
    {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.json({
        success: true,
        stock: full,
        message: 'Stock retrieved'
      });
      res.end('Stock retrieved!');
    }
    else
    {
      var err = new Error('Stock with id ' + req.body.id + ' does not exist!');
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

module.exports = {
  addStock,
  deleteStock,
  getStock
};