import React from 'react';
import { Navbar, NavbarText, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

function RenderLogin({loggedIn, toggleLogin, toggleCreate, logout, name}) 
{    
  if(loggedIn)
  {
    return(
      <div className="container">
        <NavItem>
          <NavbarText>Welcome, {name}!</NavbarText>
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
      isCreateModalOpen: false,
      isLoggedIn: false,
      username: ""
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleLoginModal() 
  {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  toggleCreateModal()
  {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen
    });
  }

  handleLogin(event)
  {
    fetch("http://localhost:3000/signin", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username.value,
          password: this.password.value
        }),
        credentials : "include"
      })
    .then(res => res.json())
    .then(res => {
      if(res.success === true)
      {
        this.setState({
          isLoggedIn: true,
          username: res.data.username
        });
        this.props.login(res.data);
      }
    });

    this.toggleLoginModal();
    event.preventDefault();
  }

  handleCreate(event)
  {
    if(this.password1.value === this.password2.value)
    {
      console.log("Sending account creation request");
      fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username.value,
          password: this.password1.value
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
    }

    this.toggleCreateModal();
    event.preventDefault();
  }

  logout()
  {
    fetch("http://localhost:3000/signout", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials : "include"
      })
    .then(res => res.json())
    .then(res => {
      if(res.success === true)
      {
        this.setState({
          isLoggedIn: false,
          username: null
        });
    
        this.props.login(null);
      }
    });
  }

  render()
  {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand>Plutus-React</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <RenderLogin loggedIn={this.state.isLoggedIn} toggleLogin={this.toggleLoginModal} toggleCreate={this.toggleCreateModal} logout={this.logout} name={this.state.username}/>
          </Nav>
        </Navbar>
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
      </div>
    );
  }
}

export default Header;