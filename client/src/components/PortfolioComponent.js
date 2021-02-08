import React, { useState } from 'react';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import Data from './DataComponent';

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
      isCreateModalOpen: false,
      isAddModalOpen: false
    };

    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.dropdownSelect = this.dropdownSelect.bind(this);
  }

  toggleCreateModal()
  {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen
    });
  }

  handleCreate(event)
  {
    if(this.name.value)
    {
      this.props.create(this.props.user._id, this.name.value);
    }

    this.toggleCreateModal();
    event.preventDefault();
  }

  toggleAddModal()
  {
    this.setState({
      isAddModalOpen: !this.state.isAddModalOpen
    });
  }

  handleAdd(event)
  {
    if(this.ticker.value)
    {
      this.props.add(this.props.portfolio._id, this.ticker.value);
    }

    this.toggleAddModal();
    event.preventDefault();
  }

  dropdownSelect(id)
  {
    this.props.set(id);
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
              <Button color="warning" onClick={this.toggleCreateModal}>Create New Portfolio</Button>
            </p>
          </Jumbotron>
          <Data portfolio={this.props.portfolio}/>
          {this.props.portfolio !== null && 
            <div className="padup">
              <Button color="success" onClick={this.toggleAddModal}>Add New Stock</Button>
            </div>
          }
          <Modal isOpen={this.state.isCreateModalOpen} toggle={this.toggleCreateModal}>
            <ModalHeader>Create Your New Portfolio</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleCreate}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" innerRef={(input) => this.name = input}/>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.isAddModalOpen} toggle={this.toggleAddModal}>
            <ModalHeader>Add New Stock</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleAdd}>
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