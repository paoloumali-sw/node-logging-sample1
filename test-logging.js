const dotenv = require('dotenv');
const winston = require('winston');

// cp .env.example to .env and update with your port values
dotenv.config();
// console.log(`Your port is ${process.env.PT_PORT}`);
// console.log(`Your url is ${process.env.PT_URL}`);

// Requiring `winston-papertrail` will expose
// `winston.transports.Papertrail`
require('winston-papertrail').Papertrail;

const winstonPapertrail = new winston.transports.Papertrail({
  host: process.env.PT_URL,
  port: process.env.PT_PORT
})

winstonPapertrail.on('error', function(err) {
  console.log('ooops! some fault somewhere.');
  // Handle, report, or silently ignore connection errors and failures
});
winstonPapertrail.on('connect', function(suc) {
  console.log('logging seems ok.');
});

const logger = new winston.Logger({
  transports: [winstonPapertrail]
});

const json_str = '{"name": "User-A", "age": 45}';
const date = new Date();
const time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

logger.error('some error');
logger.info('time of message: '+time);
logger.info('some json: '+json_str);
logger.info('some json: '+json_str+', trailer text');