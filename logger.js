exports.Logger = Logger
const fs = require('fs');
const os = require("os");

var default_options = {
	logger: {
		default_types: ["error","info"],
		format: { date: {show: false}, type: {show: false} },
		outputs: [{file: "stdout"}]
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
	
	this.showDate = this.opts.logger.format && 
			this.opts.logger.format.date && 
			this.opts.logger.format.date.show;
	
	this.showType = this.opts.logger.format &&
				this.opts.logger.format.type &&
				this.opts.logger.format.type.show;
	
	var outputs = this.opts.logger.outputs;
	if ( !outputs ) {
		outputs = default_options.logger.outputs;
	}

	var default_types = this.opts.logger.default_types || default_options.logger.default_types;
	for(index in outputs) {
		if (outputs[index].file == "stdout") {
			this.opts.logger.outputs[index].stream = process.stdout;
		} else {
			try {
				this.opts.logger.outputs[index].stream = fs.createWriteStream(outputs[index].file, {flags: 'a'});
			} catch (err) {
				console.log( err );
			}
		}
		if ( !this.opts.logger.outputs[index].types ) {
			this.opts.logger.outputs[index].types = default_types;
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
	message = this._getPrefix(type)+message;
	for ( index in this.opts.logger.outputs ) {
		if ( this.opts.logger.outputs[index].types.indexOf( type ) > -1 ) {
			this.opts.logger.outputs[index].stream.write(message+os.EOL);
		}
	}
}

Logger.prototype._getPrefix = function (type) {
	var prefix = "";
	if ( this.showDate ) {
		prefix = new Date().toLocaleString()+" ";
	}
	if ( this.showType ) {
		prefix = prefix+"["+type+"] ";
	}
	return prefix;
}