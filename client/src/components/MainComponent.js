import React from 'react';
import Header from './HeaderComponent';
import Portfolio from './PortfolioComponent';

class Main extends React.Component
{
  constructor(props) {
    super(props);

    // initialize the current user and portfolio
    this.state = {
      currentUser: null,
      currentPortfolio: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.createPortfolio = this.createPortfolio.bind(this);
    this.setPortfolio = this.setPortfolio.bind(this);
  }

  // login callback function
  // sets the current user and portfolio to display
  login(user, portfolio)
  {
    this.setState({
      currentUser: user,
      currentPortfolio: portfolio
    });
  }

  // logout callback function
  // clears the current user and portfolio
  logout()
  {
    this.setState({
      currentUser: null,
      currentPortfolio: null
    });
  }

  // create new portfolio callback function
  // sets the current user
  // sets the current portfolio to the one just created
  createPortfolio(user)
  {
    // takes the last portfolio (should be the one created most recently)
    // works because new portfolio has no stocks within it
    const cur = user.portfolios.length - 1;
    this.setState({
      currentUser: user,
      currentPortfolio: user.portfolios[cur]
    });
  }

  // set current portfolio callback function
  // sets the current portfolio to the one provided
  setPortfolio(portfolio)
  {
    this.setState({
      currentPortfolio: portfolio
    });
  }

  render()
  {
    // renders two components: navbar header and the portfolio table
    return (
      <div>
        {/* render navbar header 
            passed the current user to display name */}
        <Header
          user={this.state.currentUser}
          login={this.login}
          logout={this.logout}
        />
        {/* render portfolio banner and portfolio table,
            passed the current user and the current portfolio to display */}
        <Portfolio
          user={this.state.currentUser} 
          portfolio={this.state.currentPortfolio}
          create={this.createPortfolio}
          set={this.setPortfolio}
        />
      </div>
    );
  }
}

export default Main;