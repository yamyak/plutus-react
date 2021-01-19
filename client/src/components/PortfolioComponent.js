import React, { useState } from 'react';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Data from './DataComponent';

function RenderSelection({found, portfolios}) 
{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  if(found)
  {
    const ports = portfolios.map((portfolio) => {
      return (
        <DropdownItem>{portfolio}</DropdownItem>
      );
    });

    // TODO: need to add dropdown selection functionality
    // TODO: need to add ids to dropdown elements
    return (
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <p className="lead">Current Portfolio: </p>
          <Dropdown className="ml-auto" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Pick a Portfolio</DropdownToggle>
            <DropdownMenu>
              {ports}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <p className="lead">You have no portfolios to view. Add one now!</p>
    );
  }
}

class Portfolio extends React.Component
{
  render()
  {
    if(this.props.isLoggedIn)
    {
      // TODO: need to retrieve portfolio data here
      const found = true;
      const list = ['PORT1', 'PORT2', 'PORT3', 'PORT4' ];

      return (
        <div>
          <Jumbotron>
            <RenderSelection found={found} portfolios={list}/>
            <p className="lead">
              <Button color="warning">Add New Portfolio</Button>
            </p>
          </Jumbotron>
          <Data isLoggedIn={this.props.isLoggedIn}/>
        </div>
      );
    }
    else
    {
      return (
        <div></div>
      );
    }
  }
}

export default Portfolio;