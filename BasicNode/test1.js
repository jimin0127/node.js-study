const os = require('os');
console.log('호스트이름은 ' + os.hostname() + '이다.');
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.type());