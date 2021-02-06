import React, { useState } from 'react';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import Data from './DataComponent';

function RenderSelection({index, portfolios}) 
{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  if(portfolios.length > 0)
  {
    const ports = portfolios.map((portfolio) => {
      return (
        <DropdownItem>{portfolio.name}</DropdownItem>
      );
    });

    // TODO: need to add dropdown selection functionality
    // TODO: need to add ids to dropdown elements
    return (
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <p className="lead">Current Portfolio: {portfolios[index].name}</p>
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
      index: 0,
      isCreateModalOpen: false,
    };

    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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
      console.log("Sending portfolio creation request");
      fetch("http://localhost:3000/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.props.user._id,
          name: this.name.value
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.success === true)
        { 
          this.props.user = res.data;
        }
      });
    }

    this.toggleCreateModal();
    event.preventDefault();
  }

  render()
  {
    if(this.props.isLoggedIn)
    {
      return (
        <div>
          <Jumbotron>
            <RenderSelection index={this.state.index} portfolios={this.props.user.portfolios}/>
            <p className="lead">
              <Button color="warning" onClick={this.toggleCreateModal}>Add New Portfolio</Button>
            </p>
          </Jumbotron>
          <Data index={this.state.index} data={this.props.user.portfolios}/>
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