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
    this.updateData = this.updateData.bind(this);
  }

  setLoginState(user)
  {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      currentUser: user
    });
  }

  updateData(user)
  {
    this.setState({
      currentUser: user
    });
  }

  render()
  {
    return (
      <div>
        <Header login={this.setLoginState}/>
        <Portfolio setData={this.updateData} isLoggedIn={this.state.isLoggedIn} user={this.state.currentUser}/>
      </div>
    );
  }
}

export default Main;