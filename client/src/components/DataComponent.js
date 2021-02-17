import React from 'react';
import MaterialTable from 'material-table';
import { TableIcons } from '../shared/material-icons';
import { deleteStock } from '../connections/BackendConnection';

class Data extends React.Component
{
  constructor(props) {
    super(props);

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

  handleDeleteStock(stockId)
  {
    deleteStock(stockId, this.props.portfolio._id)
    .then((res) => {
      if(res.success)
      {
        this.props.set(res.portfolio);
      }
      else
      {
        console.log('Stock deletion failed');  
      }
    })
    .catch(() => {
      console.log('Stock deletion failed');
    });
  }

  render()
  {
    if(this.props.portfolio !== null && this.props.portfolio.stocks.length > 0)
    {
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
      return (
        <div></div>
      );
    }
  }
}

export default Data;