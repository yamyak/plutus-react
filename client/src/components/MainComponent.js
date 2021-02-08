import React from 'react';
import Header from './HeaderComponent';
import Portfolio from './PortfolioComponent';
import { createUser, userLogin, userLogout, createPortfolio, getPortfolio, addStock } from '../connections/BackendConnection';

class Main extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      currentPortfolio: null
    };

    this.createAccount = this.createAccount.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.createPort = this.createPort.bind(this);
    this.setPortfolio = this.setPortfolio.bind(this);
  }

  createAccount(username, password)
  {
    createUser(username, password);
  }

  login(username, password)
  {
    userLogin(username, password, (res) => {
      if(res.success)
      {
        this.setState({
          currentUser: res.data,
          currentPortfolio: res.data2
        });
      }
    });
  }

  logout()
  {
    userLogout((res) => {
      if(res)
      {
        this.setState({
          currentUser: null
        });
      }
    });
  }

  createPort(id, name)
  {
    createPortfolio(id, name, (res) => {
      if(res.success)
      {
        const cur = res.data.portfolios.length - 1;
        this.setState({
          currentUser: res.data,
          currentPortfolio: res.data.portfolios[cur]
        });
      }
    });
  }

  setPortfolio(id)
  {
    getPortfolio(id, (res) => {
      if(res.success)
      {
        this.setState({
          currentPortfolio: res.data
        });
      }
    });
  }

  createStock(id, ticker)
  {
    addStock(id, ticker, (res) => {
      if(res.success)
      {
        console.log(res);
        this.setState({
          currentPortfolio: res.data
        });
      }
    });
  }

  render()
  {
    return (
      <div>
        <Header
          user={this.state.currentUser}
          create={this.createAccount}
          login={this.login}
          logout={this.logout}
        />
        <Portfolio
          user={this.state.currentUser} 
          portfolio={this.state.currentPortfolio}
          create={this.createPort}
          set={this.setPortfolio}
          add={this.createStock}
        />
      </div>
    );
  }
}

export default Main;