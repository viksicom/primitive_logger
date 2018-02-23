# Primitive Logger

A very simple logger module intended for use by a short running utilities.

Instead of usual log levels, this logger uses message types. There is no relationship between message types, which means that you have to explicitly specify types that you want to see in the output. Also I did add few convenience functions for generic message types, there is no restriction on custom types. You can create any type that you like and, as long as it is listed in the options, logger will work with it.

Logger can write messages to the console or/and to the log file(s). To write to console, use keyword "stdout" for the filename in the list of outputs.

You can define individual list of message types for each output file. 

What this logger doesn't do at this time:
 *  If objects are included into string, it doesn't convert such objects into text.
 *  There is no provision for rotating or limiting size of the log files.
 *  There are no options to customize date and type outputs

## Usage

Install with npm

```
npm install --save primitive_logger
```

```javascript
// Example 1
const lr = require('primitive_logger')
const Logger = lr.Logger

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

logger = new Logger(options);

logger.stats("This is stats message");
logger.info("This is info message");
logger.error("This is error message");
logger.log("debug","This is debug message");
logger.debug("This is another debug message");
logger.log("whatever","This is whatever message");
```

```javascript
// Example 2. Display only custom message "troubleshoot" in console
const lr = require('primitive_logger')

logger = new lr.Logger({logger: {types: ["troubleshoot"]}});

logger.log("troubleshoot", "This is troubleshoot message. Should see it.");
logger.log("debug", "This debug message should not print");
```

## log( type, message )
log message of specified type 

* `type` string
* `message` string

## info( message )
Shortcut for messages of type "info"

* `message` string

## error( message )
Shortcut for messages of type "error"

* `message` string

## debug( message )
Shortcut for messages of type "debug"

* `message` string

## stats( message )
Shortcut for messages of type "stats"

* `message` string

## Options

* `options` The options object can be passed to the new Logger() constructor.
   * `logger` - encapsulates all logger configurations
	   * `types` - Message types to process, if they are not specified for individual outputs. This setting is optional. If not given, the fallback is ["error","info"]
	   * `format` - At the moment, the message formatting is limited to either show or hide the date/time and the type indicator. Default: false (meaning hide all)
	   * `outputs` - A list of output files. 
			* `file` - A filename for output. Keyword `"stdout"` means console output. If you provide the full path, it will be used as given, but directory should already exist. Default: `"stdout"`
			* `types` - optional list of types that will be processed for this file. If not given, default_types setting will be used.
