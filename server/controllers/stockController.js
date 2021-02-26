const { spawn } = require('child_process');

const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');

// add stock function
addStock = (req, res, next) => {
  // query db to check if stock already exists
  Stock.findOne({ ticker: req.body.ticker })
  .then((stock) => {
    if(!stock)
    {
      // if stock does not exist, create it
      // get the path to the python script
      var pythonPath = process.env.PLUTUS.toString() + '/StockAdd.py';
      // start the python process to create and populate the stock data
      const pythonProcess = spawn('python', [pythonPath, './config.ini', req.body.ticker]);
      pythonProcess.stdout.on('data', (data) => {
        data = data.toString('utf8').replace(/^\s+|\s+$/g, '');
        if(data === 'Invalid ticker')
        {
          // if python process cannot find stock, return error stating ticker is invalid
          var err = new Error(req.body.ticker + ' is not a valid stock');
          err.status = 403;
          next(err);
        }
        else if(data === 'Stock Added')
        {
          // if stock added successfuly, query db for newly added stock
          Stock.findOne({ ticker: req.body.ticker })
          .then((stock) => {
            if(stock)
            {
              // if stock retrieved, add stock to current portfolio
              Portfolio.findOneAndUpdate(
                { _id: req.body.id },
                { $push: { stocks: stock._id } },
                { new: true }
              ).populate('stocks')
              .then((port) => {
                if(port)
                {
                  // if successful, return updated portfolio
                  return res.status(200).json({
                    success: true,
                    portfolio: port,
                    message: 'Stock successfully created'
                  });
                }
                else
                {
                  // if portfolio does not exist, return an error stating so
                  // should never reach this error
                  var err = new Error('Current portfolio does not exist');
                  err.status = 403;
                  next(err);
                }
              })
              .catch((err) => next(err));
            }
            else
            {
              // if not successful, return an error stating so
              var err = new Error('Stock creation failed');
              err.status = 403;
              next(err);
            }
          })
          .catch((err) => next(err));
        }
        else
        {
          // python process returned something unknown
          // most likely a failure
          var err = new Error('Unknown python process error');
          err.status = 403;
          next(err);
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        console.log(`error:${data}`);
      });
    }
    else
    {
      // if stock exists, query database to add to current portfolio
      // get updated portfolio
      Portfolio.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { stocks: stock._id } },
        { new: true }
      ).populate('stocks')
      .then((port) => {
        if(port)
        {
          // if successful, return with updated portfolio
          return res.status(200).json({
            success: true,
            portfolio: port,
            message: 'Stock successfully created'
          });
        }
        else
        {
          // if portfolio does not exist, return an error stating so
          // should never reach this error
          var err = new Error('Current portfolio does not exist');
          err.status = 403;
          next(err);
        }
      })
      .catch((err) => next(err));
    }
  })
  .catch((err) => next(err));
};

// delete stock function
deleteStock = (req, res, next) => {
  // query db to pull/remove provide stockId from portfolio
  // get updated portfolio with stocks populated
  Portfolio.findOneAndUpdate(
    { _id: req.body.portId },
    { $pull: { stocks: req.body.stockId } },
    { new: true }
  ).populate('stocks')
  .then((port) => {
    if(port)
    {
      // if successful, return update portfolio
      return res.status(200).json({
        success: true,
        portfolio: port,
        message: 'Stock successfully deleted'
      });
    }
    else
    {
      // if portfolio does not exist, return an error stating so
      // should never reach this error
      var err = new Error('Current portfolio does not exist');
      err.status = 403;
      next(err);
    }
  })
  .catch((err) => next(err));
};

module.exports = {
  addStock,
  deleteStock
};