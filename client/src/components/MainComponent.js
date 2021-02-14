import React from 'react';
import Header from './HeaderComponent';
import Portfolio from './PortfolioComponent';

class Main extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      currentPortfolio: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.createPortfolio = this.createPortfolio.bind(this);
    this.setPortfolio = this.setPortfolio.bind(this);
  }

  login(user, portfolio)
  {
    this.setState({
      currentUser: user,
      currentPortfolio: portfolio
    });
  }

  logout()
  {
    this.setState({
      currentUser: null,
      currentPortfolio: null
    });
  }

  createPortfolio(user)
  {
    const cur = user.portfolios.length - 1;
    this.setState({
      currentUser: user,
      currentPortfolio: user.portfolios[cur]
    });
  }

  setPortfolio(portfolio)
  {
    this.setState({
      currentPortfolio: portfolio
    });
  }

  render()
  {
    return (
      <div>
        <Header
          user={this.state.currentUser}
          login={this.login}
          logout={this.logout}
        />
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