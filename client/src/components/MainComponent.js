import React from 'react';
import Header from './HeaderComponent';
import Data from './DataComponent';

class Main extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

    this.toggleLoginState = this.toggleLoginState.bind(this);
  }

  toggleLoginState()
  {
    this.setState({
        isLoggedIn: !this.state.isLoggedIn
    });
  }

  render()
  {
    return (
      <div>
        <Header login={this.toggleLoginState}/>
        <Data isLoggedIn={this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default Main;