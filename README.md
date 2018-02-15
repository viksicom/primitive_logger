# Primitive Logger

A very simple logger module. 

Will output messages only if their types are listed in the options. There is no any relationship between any message types. 

Can write messages to the console or/and to the log file(s).


## Usage

Install with npm

```
npm install --save primitive_logger
```

```javascript
const lr = require('./logger.js')
const Logger = lr.Logger

var options = {
	logger: {
		types: ["stats","error"],
		format: { 
			date: {show: true}
		},
		outputs: ["stdout", "output.log"]
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
	   * `types` - tbd
	   * `format` - tbd
	   * `outputs` - tbd

