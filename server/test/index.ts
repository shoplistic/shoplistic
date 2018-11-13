import * as assert from 'assert';
import fetch from 'node-fetch';

const creds = {
  username: 'apitests',
  password: 'apitestspassword'
}

const api = {
  protocol: 'http',
  host: 'localhost',
  port: 5000,
  version: 'v1',
  url(endpoint: string) {
    return `${this.protocol}://${this.host}:${this.port}/${this.version}/${endpoint}`
  }
}

function requestInit(method: string, data: any = null, bearer?: string | null) {

  const obj = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': bearer ? `Bearer: ${bearer}` : ''
    }
  }

  if (method.toLowerCase() === 'get' || !data) {
    delete obj.body;
  }

  return obj;

}

describe('Shopper API', () => {

  const store = {
    bearer: null
  }

  it('[GET] version', async () => {

    const res = await fetch('http://localhost:5000/version');
    const data = await res.json();

    assert.equal(typeof data.version, 'string');

  });

  it('[POST] register', async () => {

    const res = await fetch(api.url('user'), requestInit('post', {
      username: creds.username,
      password: creds.password,
      password_repeat: creds.password
    }));
    const data = await res.json();

    assert.equal(data.message, 'Created');

  });

  it('[POST] auth', async () => {

    const res = await fetch(api.url('auth'), requestInit('post', {
      username: creds.username,
      password: creds.password
    }));
    const data = await res.json();

    assert.equal(data.username, creds.username);
    store.bearer = data.bearer;

  });

  it('[GET] profile', async () => {

    const res = await fetch(api.url('profile'), requestInit('get', null, store.bearer));
    const data = await res.json();

    assert.equal(data.username, creds.username);
    assert.equal(typeof data.registerDate, 'number');

  });

  // This is the last test
  it('[DELETE] user', async () => {

    const res = await fetch(api.url('user'), requestInit('delete', null, store.bearer));
    const data = await res.json();

    assert.equal(data.message, 'Ok');

  });


});

// describe('Shopper BCDS API', () => {
// });
