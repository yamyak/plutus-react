// backend api call to create a new user account
function createUser(usernameIn, passwordIn)
{
  console.log('Sending account creation request');
  return new Promise((resolve, reject) => {
    // POST request to create new account
    // username and password are passed in
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameIn,
        password: passwordIn
      })
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

// backend api call to log in to user account
function userLogin(usernameIn, passwordIn)
{
  return new Promise((resolve, reject) => {
    // POST request to log in to account
    // username and password are passed in
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameIn,
        password: passwordIn
      }),
      credentials : 'include'
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  }); 
}

// backend api call to log out of user account
function userLogout()
{
  // GET request to log out of account
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/signout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials : 'include'
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

// backend api call to create a new portfolio
function createPortfolio(idIn, nameIn)
{
  return new Promise((resolve, reject) => {
    // POST request to create new portfolio
    // user id and portfolio name are passed in
    fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        id: idIn,
        name: nameIn
      })
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  }); 
}

// backend api call to get portfolio
function getPortfolio(idIn)
{
  return new Promise((resolve, reject) => {
    // POST request to get portfolio
    // portfolio id is passed in
    fetch('http://localhost:3000/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idIn
      }),
      credentials : 'include'
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

// backend api call to add stock
function addStock(idIn, tickerIn)
{
  return new Promise((resolve, reject) => {
    // POST request to add stock
    // portfolio id and ticker name are passed in
    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        id: idIn,
        ticker: tickerIn
      })
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

// backend api call to delete stock
function deleteStock(stockIdIn, portIdIn)
{
  return new Promise((resolve, reject) => {
    // POST request to add stock
    // portfolio id and stock id are passed in
    fetch('http://localhost:3000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        stockId: stockIdIn,
        portId: portIdIn
      })
    })
    // resolve the result 
    // success flag set in backend
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

export { createUser, userLogin, userLogout, createPortfolio, getPortfolio, addStock, deleteStock };