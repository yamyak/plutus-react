import React from 'react';
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
import MaterialTable from 'material-table';
import { TableIcons } from '../shared/material-icons';
import { deleteStock } from '../connections/BackendConnection';

// function to render the detailed panel component
function RenderDetailedData({stockData, dataMap})
{
  // create an array of all field names in rowData passed in
  var keys = [];
  for(var key in stockData)
  {
    // do not include useless info like id or fields already displayed in main row like ticker
    if(key !== '_id' && key !== 'tableData' && key !== 'name' &&
        key !== 'ticker' && key !== 'price' && key !== 'score')
    {
      keys.push(key);
    }
  }

  // map rowData fields (and their values) to rows in the detail panel
  // all input fields are disabled, only for display
  const rows = keys.map((key) => {
    return (
      <FormGroup row>
        <Label  for={key} sm={2}>{dataMap[key]}</Label>
        <Col sm={3}>
          <Input type='text' name={key} id={key} placeholder={stockData[key]} disabled/>
        </Col>
      </FormGroup>
    );
  })

  // return form displayed in detail panel
  // detailed class is for css, puts margin at top and left
  return (
    <Form className='detailed'>
      {rows}
    </Form>
  );
}

// portfolio table class
class Data extends React.Component
{
  constructor(props) {
    super(props);

    // set the columns to display in table
    // create the detail panel field title map
    // maps rowData object field names to displays titles in detail panel
    this.state = {
      columns: [
        {title: 'Name', field: 'name'},
        {title: 'Ticker', field: 'ticker'},
        {title: 'Price', field: 'price', type: 'numeric'},
        {title: 'Score', field: 'score', type: 'numeric'}
      ],
      detailMap: {
        'industry': 'Company Industry',
        'sector': 'Company Sector',
        'peratio': 'PE Ratio',
        'dividend': 'Dividend',
        'profit': 'Profit',
        'revenue': 'Revenue',
        'debt': 'Debt',
        'marketcap': 'Market Cap',
        'payoutratio': 'Payout Ratio',
        'pbratio': 'PB Ratio',
        'currentratio': 'Current Ratio',
        'quickratio': 'Quick Ratio',
        'grossmargin': 'Gross Margin',
        'operatingmargin': 'Operating Margin',
        'debttoequity': 'Debt to Equity',
        'debtratio': 'Debt Ratio',
        'netmargin': 'Net Margin',
        'receivablesturnover': 'Receivables Turnover',
        'assetturnover': 'Asset Turnover',
        'returnonequity': 'Return on Equity'
      }
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
      // detailPanel: describes when is rendered when detail panel is revealed
      return (
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable 
            icons={TableIcons}
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
            title='Stock Table'
            detailPanel={rowData => {
              return (
                <RenderDetailedData stockData={rowData} dataMap={this.state.detailMap}/>
              );
            }}
          />
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