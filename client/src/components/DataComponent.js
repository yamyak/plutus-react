import React from 'react';
import MaterialTable from 'material-table';
import { TableIcons } from '../shared/material-icons';
import { deleteStock } from '../connections/BackendConnection';

// portfolio table class
class Data extends React.Component
{
  constructor(props) {
    super(props);

    // set the columns to display in table
    this.state = {
      columns: [
        {title: "Name", field: "name"},
        {title: "Ticker", field: "ticker"},
        {title: "Price", field: "price", type: "numeric"},
        {title: "Score", field: "score", type: "numeric"}
      ]
    };
    
    this.handleDeleteStock = this.handleDeleteStock.bind(this);
  }

  // called when delete button is selected
  // calls backend to delete stock from portfolio
  handleDeleteStock(stockId)
  {
    // call backend api to delete stock from portfolio
    // pass in stock id and current portfolio id
    deleteStock(stockId, this.props.portfolio._id)
    .then((res) => {
      if(res.success)
      {
        // if successful, pass portfolio object to parent component
        this.props.set(res.portfolio);
      }
      else
      {
        // if unsuccessful, notify user why
        console.log('Stock deletion failed');  
      }
    })
    .catch(() => {
      // if unsuccessful, notify user why
      console.log('Stock deletion failed');
    });
  }

  render()
  {
    // only render table if current portfolio is set and contains stocks
    if(this.props.portfolio !== null && this.props.portfolio.stocks.length > 0)
    {
      // set stock data from props from parent component
      // when delete button clicked, pass in stock id for stock of that row
      // paging: false => table not split into pages
      // actionsColumnIndex: -1: actions column (buttons) appears on right
      return (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable icons={TableIcons}
          columns={this.state.columns}
          data={this.props.portfolio.stocks}
          actions={[{
            icon: TableIcons.Delete,
            tooltip: 'Delete Stock',
            onClick: (event, rowData) => { 
              this.handleDeleteStock(rowData._id);
            }
          }]}
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}
          title="Stock Table"/>
        </div>
      );
    }
    else
    {
      // render nothing if no portfolio or stocks
      return (
        <div></div>
      );
    }
  }
}

export default Data;