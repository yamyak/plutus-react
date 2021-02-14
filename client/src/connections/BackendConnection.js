function createUser(usernameIn, passwordIn)
{
  console.log("Sending account creation request");
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameIn,
        password: passwordIn
      })
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

function userLogin(usernameIn, passwordIn)
{
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameIn,
        password: passwordIn
      }),
      credentials : "include"
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  }); 
}

function userLogout()
{
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/signout", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials : "include"
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

function createPortfolio(idIn, nameIn)
{
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/create", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: idIn,
        name: nameIn
      })
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  }); 
}

function getPortfolio(idIn)
{
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/get", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: idIn
      }),
      credentials : "include"
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

function addStock(idIn, tickerIn)
{
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/add", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: idIn,
        ticker: tickerIn
      })
    })
    .then((res) => resolve(res.json()))
    .catch(() => {
      reject({
        success: false
      });
    });
  });
}

export { createUser, userLogin, userLogout, createPortfolio, getPortfolio, addStock };