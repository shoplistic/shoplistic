// import * as assert from 'assert';
import * as fetch from 'node-fetch';

describe('Authentication', () => {

  it('should fail', async () => {

    // @ts-ignore
    const res = await fetch('http://localhost:5000/version');
    const json = res.json();
    console.log(json);

  });


});
