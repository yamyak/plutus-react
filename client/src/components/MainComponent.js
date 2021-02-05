import React from 'react';
import Header from './HeaderComponent';
import Portfolio from './PortfolioComponent';

class Main extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: null
    };

    this.setLoginState = this.setLoginState.bind(this);
  }

  setLoginState(user)
  {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      currentUser: user
    });
  }

  render()
  {
    return (
      <div>
        <Header login={this.setLoginState}/>
        <Portfolio isLoggedIn={this.state.isLoggedIn} user={this.state.currentUser}/>
      </div>
    );
  }
}

export default Main;