function ready() {
};
const client_id = 'GOOGLE_CLIENT_ID';
const client_secret = 'GOOGLE_CLIENT_SECRET';
const scope = 'https://www.googleapis.com/auth/plus.login';

const applicationKey = 'YOUR_APPLICATION_KEY';
const clientKey = 'YOUR_CLIENT_KEY';
const ncmb = new NCMB(applicationKey, clientKey);

document.querySelector('#auth').onclick = async (e) => {
  gapi.client.setApiKey(client_secret);
  const token = await auth();
  gapi.auth.setToken(token);
  await load();
  const result = await gapi.client.plus.people.get({
      "userId": "me"
  });
  const authInfo = {
    id: result.result.id,
    access_token: token.access_token
  };
  const user = new ncmb.User;
  await user.signUpWith('google', authInfo);
  await ncmb.User.loginWith('google', authInfo);
  document.querySelector('#userName').innerHTML = user.userName;
}

document.querySelector('#logout').onclick = async (e) => {
  await ncmb.User.logout();
  document.querySelector('#userName').innerHTML = '';
}

const load = () => {
  return new Promise((res, rej) => {
    gapi.client.load('plus','v1', res);
  });
}
const auth = () => {
  return new Promise((res, rej) => {
    gapi.auth.authorize({
      client_id: client_id,
      scope: scope,
      immediate: true
    }, res);
  })
}