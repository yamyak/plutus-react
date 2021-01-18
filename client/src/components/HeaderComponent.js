import React from 'react';
import { Navbar, NavbarText, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

function RenderLogin({loggedIn, toggle, logout, name}) 
{    
  if(loggedIn)
  {
    return(
      <div class="container">
        <NavItem>
          <NavbarText>Welcome, {name}!</NavbarText>
        </NavItem>
        <NavItem>
          <Button color="danger" onClick={logout}>Logout</Button>
        </NavItem>
      </div>
    )
  }
  else
  {
    return (
      <div class="container">
        <NavItem>
          <Button color="success" onClick={toggle}>Login</Button>
        </NavItem>
      </div>
    );
  }
}

class Header extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isLoggedIn: false,
      username: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleModal() 
  {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event)
  {
    this.toggleModal();
    this.setState({
      isLoggedIn: true,
      username: this.username.value
    });
    event.preventDefault();
  }

  logout()
  {
    this.setState({
      isLoggedIn: false
    });
  }

  render()
  {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand>Plutus-React</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <RenderLogin loggedIn={this.state.isLoggedIn} toggle={this.toggleModal} logout={this.logout} name={this.state.username}/>
          </Nav>
        </Navbar>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" innerRef={(input) => this.password = input}/>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;