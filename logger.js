exports.Logger = Logger
const fs = require('fs');
const os = require("os");

var default_options = {
	logger: {
		types: ["stats","error","info"],
		format: { 
			date: {show: false}
		},
		outputs: ["stdout"]
	}
}

function Logger(options) {
	if( options && options.logger ) {
		this.opts = options;
	} else {
		this.opts = default_options;
	}
	this.types = this.opts.logger.types;
	if ( !this.types ) {
		this.types = [];
	}
	
	var outputs = this.opts.logger.outputs;
	if ( !outputs ) {
		outputs = default_options.logger.outputs;
	}
	
	this.outStreams = [];
	for(index in outputs) {
		if (outputs[index] == "stdout") {
			this.outStreams.push(process.stdout);
		} else {
			try {
				this.outStreams.push(fs.createWriteStream(outputs[index], {flags: 'a'}));
			} catch (err) {
				console.log( err );
			}
		}
	}
}

Logger.prototype.info = function (message) {
	this.log("info", message);
}

Logger.prototype.error = function (message) {
	this.log("error", message);
}

Logger.prototype.stats = function (message) {
	this.log("stats", message);
}

Logger.prototype.debug = function (message) {
	this.log("debug", message);
}

Logger.prototype.log = function (type, message) {
	if ( this.types.indexOf( type ) > -1 ) {
		if ( this.opts.logger.format && 
			 this.opts.logger.format.date && 
			 this.opts.logger.format.date.show ) {
			var prefix = new Date().toLocaleString();
			message = prefix+" "+message;
		}
		for ( indx in this.outStreams ) {
			this.outStreams[indx].write(message+os.EOL);
		}
	}
}