import React from 'react';
import { Navbar, NavbarText, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

function RenderLogin({user, toggleCreate, toggleLogin, logout}) 
{    
  if(user)
  {
    return(
      <div className="container">
        <NavItem>
          <NavbarText>Welcome, {user.username}!</NavbarText>
        </NavItem>
        <div className="divider"/>
        <NavItem>
          <Button color="danger" onClick={logout}>Logout</Button>
        </NavItem>
      </div>
    )
  }
  else
  {
    return (
      <div className="container">
        <NavItem>
          <Button color="success" onClick={toggleLogin}>Login</Button>
        </NavItem>
        <div className="divider"/>
        <NavItem>
          <Button color="success" onClick={toggleCreate}>Create Account</Button>
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
      isLoginModalOpen: false,
      isCreateModalOpen: false
    };

    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleCreateModal()
  {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen
    });
  }

  toggleLoginModal() 
  {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  handleCreate(event)
  {
    if(this.password1.value === this.password2.value)
    {
      this.props.create(this.username.value, this.password1.value);
    }

    this.toggleCreateModal();
    event.preventDefault();
  }

  handleLogin(event)
  {
    this.props.login(this.username.value, this.password.value);

    this.toggleLoginModal();
    event.preventDefault();
  }

  render()
  {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand>Plutus-React</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <RenderLogin 
              user={this.props.user} 
              toggleCreate={this.toggleCreateModal} 
              toggleLogin={this.toggleLoginModal} 
              logout={this.props.logout}
            />
          </Nav>
        </Navbar>
        <Modal isOpen={this.state.isCreateModalOpen} toggle={this.toggleCreateModal}>
          <ModalHeader>Create Your Account</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreate}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password1">Password</Label>
                <Input type="password" id="password1" name="password1" innerRef={(input) => this.password1 = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password2">Confirm your Password</Label>
                <Input type="password" id="password2" name="password2" innerRef={(input) => this.password2 = input}/>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
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