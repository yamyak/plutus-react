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
      /*{
        username: "User Name", 
        password: "password",
        portfolios: [
          {
            name: "First Portfolio",
            stocks: [
              {
                name: "Apple",
                ticker: "APL",
                industry: "Test Industry",
                sector: "Test Sector",
                price: 100,
                peratio: 20,
                dividend: 5,
                score: 34
              },
              {
                name: "Microsfot",
                ticker: "MSFT",
                industry: "Test Industry 2",
                sector: "Test Sector 2",
                price: 50,
                peratio: 10,
                dividend: 17,
                score: 21
              },
              {
                name: "Butts",
                ticker: "BU",
                industry: "Test Industry 3",
                sector: "Test Sector 3",
                price: 80,
                peratio: 50,
                dividend: 8,
                score: 95
              }
            ]
          }
        ]
      }*/
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