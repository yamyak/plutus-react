function createAccount(usernameIn, passwordIn)
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
  .then(res => res.json())
  .then(res => {
    return res.success;
  })
  .catch(() => {
    return false;
  });
};

function accountLogOut(cleanUpFunc)
{
  fetch("http://localhost:3000/signout", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    credentials : "include"
  })
  .then(res => res.json())
  .then(res => {
    cleanUpFunc(res.success);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}

function accountLogIn(usernameIn, passwordIn, setDataFunc)
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
  .then(res => res.json())
  .then(res => {
    setDataFunc(res);
    return res.success;
  })
  .catch(() => {
    return false;
  });
}


export { createAccount, accountLogOut, accountLogIn };