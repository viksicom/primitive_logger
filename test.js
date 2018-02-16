const lr = require('./logger.js')

var options = {
	logger: {
		types: ["stats","error"],
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

logger = new lr.Logger({logger: {types: ["troubleshoot"]}});

logger.log("troubleshoot", "This is troubleshoot message. Should see it.");
logger.log("debug", "This debug message should not print");

logger.stats("This is stats message "+options);
logger.info("This is info message");
logger.error("This is error message");
logger.log("debug","This is debug message");
logger.log("debug","This is debug 2 message");
logger.debug("This is another debug message");
logger.log("whatever","This is whatever message");
