'use strict';
var path = require('path');
var shell = require('shelljs');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SchemeGenerator = module.exports = function SchemeGenerator(args, options, config)
{
	//nasty way to avoid the required name argument error.
	args.push("");

	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);
//	console.log(this.yeoman);
	this.sourceRoot(path.dirname(__dirname));

	this.on('end', function()
	{
		console.info(chalk.bold.green('Great !! you just created an awesome scheme.'));
	});
};

util.inherits(SchemeGenerator, yeoman.generators.NamedBase);

SchemeGenerator.prototype.createAuraScheme = function createAuraScheme()
{
	//creating the schemes backup folder.
	this.mkdir("app/aura_schemes/");

	var rawSchemeString = this.readFileAsString('app/scheme.json');
//	var rawSchemeString = this.readFileAsString(path.join(__dirname, './scheme.json'));
	this.scheme = JSON.parse(rawSchemeString);
	var currentVersion = +this.scheme.version;
	var components = this.scheme.components;

	var list = shell.ls("app/aura_components/");

	if (list.length > 0)
	{
		var nextScheme = JSON.parse(rawSchemeString);
		var nextVersion = currentVersion + 1;
		nextScheme.version = nextVersion;
		var nextRawSchemeString = JSON.stringify(nextScheme, null, '\t');
//		this.writeFileFromString(nextRawSchemeString, path.join(__dirname, './scheme.json'));
		this.writeFileFromString(nextRawSchemeString, 'app/scheme.json');

		this.mkdir("app/aura_schemes/aura_scheme_" + currentVersion);

		//copy all existing components to a new location.
		var backupLocation = "app/aura_schemes/aura_scheme_" + currentVersion + "/";
		console.info(chalk.bold.blue('recovering existant components to this location : ' + backupLocation));

		shell.mv("app/aura_components/*", backupLocation);
	}

	for (var i = 0; i < components.length; i++)
	{
		console.info(chalk.bold.green('Component ' + components[i].name));
		this.invoke("aura:component", {args: [components[i]]});
	}

};


