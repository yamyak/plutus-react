function createUser(usernameIn, passwordIn)
{
  console.log("Sending account creation request");
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
  .then((res) => res.json())
  .then((res) => {
    return res.success;
  })
  .catch(() => {
    return false;
  });
};

function userLogin(usernameIn, passwordIn, setDataFunc)
{
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
  .then((res) => res.json())
  .then((res) => {
    setDataFunc(res);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}

function userLogout(cleanUpFunc)
{
  fetch("http://localhost:3000/signout", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    credentials : "include"
  })
  .then((res) => res.json())
  .then((res) => {
    cleanUpFunc(res.success);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}

function createPortfolio(idIn, nameIn, setDataFunc)
{
  console.log("Sending portfolio creation request");
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
  .then((res) => res.json())
  .then((res) => {
    setDataFunc(res);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}

function getPortfolio(idIn, setDataFunc)
{
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
  .then((res) => res.json())
  .then((res) => {
    setDataFunc(res);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}

export { createUser, userLogin, userLogout, createPortfolio, getPortfolio };