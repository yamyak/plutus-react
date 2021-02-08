import React from 'react';
import MaterialTable from 'material-table';
import { TableIcons } from '../shared/material-icons';

class Data extends React.Component
{
  render()
  {
    if(this.props.portfolio)
    {
      return (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable icons={TableIcons}
          columns={[
            {title: "Name", field: "name"},
            {title: "Ticker", field: "ticker"},
            {title: "Industry", field: "industry"},
            {title: "Sector", field: "sector"},
            {title: "Price", field: "price", type: "numeric"},
            {title: "PE Ratio", field: "peratio", type: "numeric"},
            {title: "Dividend", field: "dividend", type: "numeric"},
            {title: "Score", field: "score", type: "numeric"}
          ]}
          data={this.props.portfolio.stocks}
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