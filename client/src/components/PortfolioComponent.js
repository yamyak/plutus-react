import React, { useState } from 'react';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import Data from './DataComponent';
import { createPortfolio, getPortfolio, addStock } from '../connections/BackendConnection';

function RenderSelection({current, portfolios, select}) 
{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  if(portfolios.length > 0)
  {
    const ports = portfolios.map((portfolio) => {
      return (
        <DropdownItem onClick={() => select(portfolio._id)}>{portfolio.name}</DropdownItem>
      );
    });

    // TODO: need to add ids to dropdown elements
    return (
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <p className="lead">Current Portfolio: {current.name}</p>
          <Dropdown className="ml-auto" isOpen={dropdownOpen} toggle={toggle}>
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
    return (
      <p className="lead">You have no portfolios to view. Add one now!</p>
    );
  }
}

class Portfolio extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      isCreatePortModalOpen: false,
      isAddStockModalOpen: false
    };

    this.toggleCreatePortModal = this.toggleCreatePortModal.bind(this);
    this.handleCreatePort = this.handleCreatePort.bind(this);
    this.toggleAddStockModal = this.toggleAddStockModal.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.dropdownSelect = this.dropdownSelect.bind(this);
  }

  toggleCreatePortModal()
  {
    this.setState({
      isCreatePortModalOpen: !this.state.isCreatePortModalOpen
    });
  }

  handleCreatePort(event)
  {
    if(this.name.value)
    {
      createPortfolio(this.props.user._id, this.name.value)
      .then((res) => {
        if(res.success)
        {
          this.props.create(res.profile);
          this.toggleCreatePortModal();
        }
        else
        {
          console.log('Portfolio creation failed');  
        }
      })
      .catch(() => {
        console.log('Portfolio creation failed');
      });
    }
    else
    {
      console.log('No portfolio name provided');
    }
    event.preventDefault();
  }

  toggleAddStockModal()
  {
    this.setState({
      isAddStockModalOpen: !this.state.isAddStockModalOpen
    });
  }

  handleAddStock(event)
  {
    if(this.ticker.value)
    {
      addStock(this.props.portfolio._id, this.ticker.value)
      .then((res) => {
        if(res.success)
        {
          this.props.add(res.portfolio);
          this.toggleAddStockModal();
        }
        else
        {
          console.log('Stock addition failed');  
        }
      })
      .catch(() => {
        console.log('Stock addition failed');
      });
    }
    else
    {
      console.log('No stock ticker value provided');
    }
    event.preventDefault();
  }

  dropdownSelect(id)
  {
    getPortfolio(id).then((res) => {
      if(res.success)
      {
        this.props.set(res.portfolio);
      }
      else
      {
        console.log('Portfolio retrieval failed');  
      }
    })
    .catch(() => {
      console.log('Portfolio retrieval failed');
    });
  }

  render()
  {
    if(this.props.user)
    {
      return (
        <div>
          <Jumbotron>
            <RenderSelection current={this.props.portfolio} portfolios={this.props.user.portfolios} select={this.dropdownSelect}/>
            <p className="lead">
              <Button color="warning" onClick={this.toggleCreatePortModal}>Create New Portfolio</Button>
            </p>
          </Jumbotron>
          <Data portfolio={this.props.portfolio}/>
          {this.props.portfolio !== null && 
            <div className="padup">
              <Button color="success" onClick={this.toggleAddStockModal}>Add New Stock</Button>
            </div>
          }
          <Modal isOpen={this.state.isCreatePortModalOpen} toggle={this.toggleCreatePortModal}>
            <ModalHeader toggle={this.toggleCreatePortModal}>Create Your New Portfolio</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleCreatePort}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" innerRef={(input) => this.name = input}/>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.isAddStockModalOpen} toggle={this.toggleAddStockModal}>
            <ModalHeader toggle={this.toggleAddStockModal}>Add New Stock</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleAddStock}>
                <FormGroup>
                  <Label htmlFor="ticker">Ticker</Label>
                  <Input type="text" id="ticker" name="ticker" innerRef={(input) => this.ticker = input}/>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
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

export default Portfolio;