import React from 'react';
import MaterialTable from 'material-table';
import { TableIcons } from '../shared/material-icons';

class Data extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      data: [{name: "Apple", ticker: "APL", price: 8.52, score: 8.52}]
    };
  }

  render()
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
        data={this.state.data}
        title="Stock Table"/>
      </div>
    );
  }
}

export default Data;