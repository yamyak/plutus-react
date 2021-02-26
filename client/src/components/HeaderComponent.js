import React from 'react';
import { Navbar, NavbarText, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { createUser, userLogin, userLogout } from '../connections/BackendConnection';

// function to render the correct buttons in navbar
function RenderLogin({user, toggleCreate, toggleLogin, logout}) 
{
  if(user)
  {
    // if user object is not null, logged in
    // display welcome banner and logout button
    // divider class is for css, adds buffer between elements
    return(
      <div className='container'>
        <NavItem>
          <NavbarText>Welcome, {user.username}!</NavbarText>
        </NavItem>
        <div className='divider'/>
        <NavItem>
          <Button color='danger' onClick={logout}>Logout</Button>
        </NavItem>
      </div>
    )
  }
  else
  {
    // if user object is null, not logged in
    // display create new account and log buttons
    return (
      <div className='container'>
        <NavItem>
          <Button color='success' onClick={toggleLogin}>Login</Button>
        </NavItem>
        <div className='divider'/>
        <NavItem>
          <Button color='success' onClick={toggleCreate}>Create Account</Button>
        </NavItem>
      </div>
    );
  }
}

// navbar header class
class Header extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: false,
      isCreateModalOpen: false,
      errorMessage: ''
    };

    this.toggleCreateModal = this.toggleCreateModal.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // toggles the create new account dialog
  toggleCreateModal()
  {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen,
      errorMessage: ''
    });
  }

  // toggles the log in dialog
  toggleLoginModal() 
  {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen,
      errorMessage: ''
    });
  }

  // called when create account dialog is submitted
  // calls backend to create and save new user account
  handleCreate(event)
  {
    this.setState({
      errorMessage: ''
    });
    // verify that needed values have been provided
    if(this.username.value !== '' && 
    this.password1.value !== '' &&
    this.password2.value !== '')
    {
      // verify that passwords provided match
      if(this.password1.value === this.password2.value)
      {
        // call backend api to create new user account
        createUser(this.username.value, this.password1.value)
        .then((res) => {
          if(res.success)
          {
            // if successful, notify user and close the dialog
            // does not set the current user and portfolio
            // user must log in after creating an account
            console.log('Account creation successful');
            // close the dialog
            this.toggleCreateModal();
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
            errorMessage: 'Account creation failed'
          });
        });
      }
      else
      {
        // if unsuccessful, notify user why in dialog
        this.setState({
          errorMessage: 'Passwords do not match'
        });
      }
    }
    else
    {
      // if unsuccessful, notify user why in dialog
      if(this.username.value === '')
      {
        this.setState({
          errorMessage: 'Please provide a username'
        });
      }
      else if(this.password1.value === '')
      {
        this.setState({
          errorMessage: 'Please provide a password'
        });
      }
      else if(this.password2.value === '')
      {
        this.setState({
          errorMessage: 'Please confirm your password'
        });
      }
    }
    event.preventDefault();
  }

  // called when login account dialog is submitted
  // calls backend to verify login credentials and return account objects
  // pass objects up to set current user and portfolio
  handleLogin(event)
  {
    this.setState({
      errorMessage: ''
    });
    // verify that needed values have been provided
    if(this.username.value !== '' && this.password.value !== '')
    {
      // call api backend to log in to account
      userLogin(this.username.value, this.password.value)
      .then((res) => {
        if(res.success)
        {
          // if successful, pass account objects to parent component
          this.props.login(res.profile, res.portfolio);
          // close the dialog
          this.toggleLoginModal();
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
          errorMessage: 'Account login failed'
        });
      });
    }
    else
    {
      // if unsuccessful, notify user why in dialog
      //console.log('Username or password not provided')
      if(this.username.value === '')
      {
        this.setState({
          errorMessage: 'Please provide a username'
        });
      }
      else if(this.password.value === '')
      {
        this.setState({
          errorMessage: 'Please provide a password'
        });
      }
    }
    event.preventDefault();
  }

  // called when logout button selected
  // calls backend to clear out authentication sessions
  // clear out current user and portfolio values
  handleLogout()
  {
    // call api backend to log out off account
    userLogout().then((res) => {
      if(res.success)
      {
        // if successful, call callback function to clear out user and portfolio values
        this.props.logout();
      }
      else
      {
        // if unsuccessful, notify user why
        console.log('Account logout failed');  
      }
    })
    .catch(() => {
      // if unsuccessful, notify user why
      console.log('Account logout failed');
    });
  }

  render()
  {
    return (
      <div>
        {/* navbar component */}
        <Navbar dark expand='md'>
          <NavbarBrand>Plutus-React</NavbarBrand>
          <Nav className='ml-auto' navbar>
            {/* dynamic rendering of login/logout/create account buttons,
                takes user to display username when logged in,
                takes callback functions for all buttons in navbar */}
            <RenderLogin 
              user={this.props.user} 
              toggleCreate={this.toggleCreateModal} 
              toggleLogin={this.toggleLoginModal} 
              logout={this.handleLogout}
            />
          </Nav>
        </Navbar>
        {/* create new account dialog */}
        <Modal isOpen={this.state.isCreateModalOpen} toggle={this.toggleCreateModal}>
          <ModalHeader toggle={this.toggleCreateModal}>Create Your Account</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreate}>
              <FormGroup>
                <Label htmlFor='username'>Username</Label>
                <Input type='text' id='username' name='username' innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password1'>Password</Label>
                <Input type='password' id='password1' name='password1' innerRef={(input) => this.password1 = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password2'>Confirm your Password</Label>
                <Input type='password' id='password2' name='password2' innerRef={(input) => this.password2 = input}/>
              </FormGroup>
              <FormGroup>
                <Label md={{ offset: 3 }} className='errorcolor' htmlFor='createerrormsg'>{this.state.errorMessage}</Label>
              </FormGroup>
              <Button type='submit' value='submit' color='primary'>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        {/* login dialog */}
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor='username'>Username</Label>
                <Input type='text' id='username' name='username' innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' id='password' name='password' innerRef={(input) => this.password = input}/>
              </FormGroup>
              <FormGroup>
                <Label md={{ offset: 3 }} className='errorcolor' htmlFor='loginerrormsg'>{this.state.errorMessage}</Label>
              </FormGroup>
              <Button type='submit' value='submit' color='primary'>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;