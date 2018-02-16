const lr = require('./logger.js')
const Logger = lr.Logger

var options = {
	logger: {
		default_types: ["stats","error"],
		format: { 
			date: {show: true},
			type: {show: true}
		},
		outputs: [
			{	file: "stdout",
				types: ["error","stats"]
			},
			{	file: "output.log", 
				types: ["stats","error","info","debug"]
			}
		]
	}
}

logger = new Logger(options);

logger.stats("This is stats message "+options);
logger.info("This is info message");
logger.error("This is error message");
logger.log("debug","This is debug message");
logger.log("debug","This is debug 2 message");
logger.debug("This is another debug message");
logger.log("whatever","This is whatever message");
