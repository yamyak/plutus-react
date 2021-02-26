import React, { useState } from 'react';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import Data from './DataComponent';
import { createPortfolio, getPortfolio, addStock } from '../connections/BackendConnection';

// function to render the dropdown selection component
function RenderSelection({current, portfolios, select}) 
{
  // set dropdown state variable and function
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  // verify that portfolios exist
  if(portfolios.length > 0)
  {
    // map portfolio names to dropdown items
    const ports = portfolios.map((portfolio) => {
      return (
        <DropdownItem onClick={() => select(portfolio._id)}>{portfolio.name}</DropdownItem>
      );
    });

    // TODO: need to add ids to dropdown elements
    // create current portfolio label and dropdown element
    return (
      <div className='container' style={{ maxWidth: '100%' }}>
        <div className='row'>
          <p className='lead'>Current Portfolio: {current.name}</p>
          <Dropdown className='ml-auto' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Pick a Portfolio</DropdownToggle>
            <DropdownMenu>
              {ports}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
  else
  {
    // if no portfolios, do not display dropdown
    return (
      <p className='lead'>You have no portfolios to view. Add one now!</p>
    );
  }
}

// user account banner and portfolio table class
class Portfolio extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      isCreatePortModalOpen: false,
      isAddStockModalOpen: false,
      errorMessage: ''
    };

    this.toggleCreatePortModal = this.toggleCreatePortModal.bind(this);
    this.handleCreatePort = this.handleCreatePort.bind(this);
    this.toggleAddStockModal = this.toggleAddStockModal.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.dropdownSelect = this.dropdownSelect.bind(this);
  }

  // toggles the create portfolio dialog
  toggleCreatePortModal()
  {
    this.setState({
      isCreatePortModalOpen: !this.state.isCreatePortModalOpen,
      errorMessage: ''
    });
  }

  // called when create portfolio dialog is submitted
  // calls backend to create and save new portfolio
  handleCreatePort(event)
  {
    this.setState({
      errorMessage: ''
    });
    // verify that needed values have been provided
    if(this.name.value && this.name.value !== '')
    {
      // check if user account has portfolio with same name
      var found = this.props.user.portfolios.find((port) => {
        return port.name === this.name.value;
      });

      // verify that portfolio with provided name does not exist
      if(!found)
      {
        // call backend api to create new portfolio
        // pass in current user account id and name for new portfolio
        createPortfolio(this.props.user._id, this.name.value)
        .then((res) => {
          if(res.success)
          {
            // if successful, pass portfolio object to parent component
            this.props.create(res.profile);
            // close the dialog
            this.toggleCreatePortModal();
          }
          else
          {
            // if unsuccessful, notify user why in dialog
            this.setState({
              errorMessage: res.error
            });
          }
        })
        .catch(() => {
          // if unsuccessful, notify user why in dialog
          this.setState({
            errorMessage: 'Portfolio creation failed'
          });
        });
      }
      else
      {
        // if unsuccessful, notify user why in dialog
        const msg = 'Portfolio ' + this.name.value + ' already exists';
        this.setState({
          errorMessage: msg
        });
      }
    }
    else
    {
      // if unsuccessful, notify user why in dialog
      this.setState({
        errorMessage: 'Please provide a portfolio name'
      });
    }
    event.preventDefault();
  }

  // toggles the add new stock dialog
  toggleAddStockModal()
  {
    this.setState({
      isAddStockModalOpen: !this.state.isAddStockModalOpen,
      errorMessage: ''
    });
  }

  // called when add new stock dialog is submitted
  // calls backend to create and save new stock
  handleAddStock(event)
  {
    this.setState({
      errorMessage: ''
    });
    // verify that needed values have been provided
    if(this.ticker.value && this.ticker.value !== '')
    {
      // check if current portfolio has stock with same ticker
      var found = this.props.portfolio.stocks.find((stock) => {
        return stock.ticker === this.ticker.value;
      });

      // verify that stock with provided ticker does not exist in current portfolio
      if(!found)
      {
        // call backend api to add new stock
        // pass in current portfolio id and ticker value for new stock
        addStock(this.props.portfolio._id, this.ticker.value)
        .then((res) => {
          if(res.success)
          {
            // if successful, pass portfolio object to parent component
            this.props.set(res.portfolio);
            // close the dialog
            this.toggleAddStockModal();
          }
          else
          {
            // if unsuccessful, notify user why in dialog
            this.setState({
              errorMessage: res.error
            });
          }
        })
        .catch(() => {
          // if unsuccessful, notify user why in dialog
          this.setState({
            errorMessage: 'Stock addition failed'
          });
        });
      }
      else
      {
        // if unsuccessful, notify user why in dialog
        const msg = this.ticker.value + ' is already in your portfolio';
        this.setState({
          errorMessage: msg
        });
      }
    }
    else
    {
      // if unsuccessful, notify user why in dialog
      this.setState({
        errorMessage: 'Please provide a ticker value'
      });
    }
    event.preventDefault();
  }

  // called when portfolio dropdown is used to select portfolio
  // calls backend to get selected portfolio data
  dropdownSelect(id)
  {
    // call backend api to get portfolio
    // pass in portfolio id
    getPortfolio(id).then((res) => {
      if(res.success)
      {
        // if successful, pass portfolio object to parent component
        this.props.set(res.portfolio);
      }
      else
      {
        // if unsuccessful, notify user why
        console.log('Portfolio retrieval failed');  
      }
    })
    .catch(() => {
      // if unsuccessful, notify user why
      console.log('Portfolio retrieval failed');
    });
  }

  render()
  {
    // verify that user value has been set in parent (only set on login)
    if(this.props.user)
    {
      // only render banner and table if user set
      return (
        <div>
          {/* portfolio banner component */}
          <Jumbotron>
            {/* render dropdown selection component with portfolio name */}
            <RenderSelection current={this.props.portfolio} portfolios={this.props.user.portfolios} select={this.dropdownSelect}/>
            <p className='lead'>
              <Button color='warning' onClick={this.toggleCreatePortModal}>Create New Portfolio</Button>
            </p>
          </Jumbotron>
          {/* portfolio data table component */}
          <Data portfolio={this.props.portfolio} set={this.props.set}/>
          {/* only display add new stock button if there is a current portfolio set in parent component */}
          {/* padup class is for css, adds margin above button, between table and button */}
          {this.props.portfolio !== null && 
            <div className='padup'>
              <Button color='success' onClick={this.toggleAddStockModal}>Add New Stock</Button>
            </div>
          }
          {/* create new portfolio dialog */}
          <Modal isOpen={this.state.isCreatePortModalOpen} toggle={this.toggleCreatePortModal}>
            <ModalHeader toggle={this.toggleCreatePortModal}>Create Your New Portfolio</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleCreatePort}>
                <FormGroup>
                  <Label htmlFor='name'>Name</Label>
                  <Input type='text' id='name' name='name' innerRef={(input) => this.name = input}/>
                </FormGroup>
                <FormGroup>
                  <Label md={{ offset: 3 }} className='errorcolor' htmlFor='porterrormsg'>{this.state.errorMessage}</Label>
                </FormGroup>
                <Button type='submit' value='submit' color='primary'>Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
          {/* add new stock dialog */}
          <Modal isOpen={this.state.isAddStockModalOpen} toggle={this.toggleAddStockModal}>
            <ModalHeader toggle={this.toggleAddStockModal}>Add New Stock</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleAddStock}>
                <FormGroup>
                  <Label htmlFor='ticker'>Ticker</Label>
                  <Input type='text' id='ticker' name='ticker' innerRef={(input) => this.ticker = input}/>
                </FormGroup>
                <FormGroup>
                  <Label md={{ offset: 3 }} className='errorcolor' htmlFor='stockerrormsg'>{this.state.errorMessage}</Label>
                </FormGroup>
                <Button type='submit' value='submit' color='primary'>Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    else
    {
      // display nothing if user not set/not logged in
      return (
        <div></div>
      );
    }
  }
}

export default Portfolio;