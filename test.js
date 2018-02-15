const lr = require('./logger.js')
const Logger = lr.Logger

var options = {
	logger: {
		types: ["stats","error"],
//		format: { 
//			date: {show: true}
//		},
		outputs: ["stdout", "output.log"]
	}
}

logger = new Logger(options);

logger.stats("This is stats message");
logger.info("This is info message");
logger.error("This is error message");
logger.log("debug","This is debug message");