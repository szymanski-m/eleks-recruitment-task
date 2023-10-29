const superagent = require('superagent');

superagent
  .post('http://localhost:3000/rest/user/login')
  .send({
    "email": "b@b.b",
    "password": "test1"
    })
  .set('accept', 'application/json, text/plain, */*')
  .end((err, res) => {
    if(err) {
        console.log('undefined error during test')
    } else {
        console.log(res)
        const test = res.text
    
        console.log(test)
        if(res.text.authentication) {
            console.log('Test passed, user authorized successfully')
        } else {
            console.log('There is a trouble with autorizing user:')
            console.log('Expected response to contain authentication value, instead it is: ')
            console.log(res.text)
        }
    }
});
