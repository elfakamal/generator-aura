'use strict';
var path = require('path');
var shell = require('shelljs');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SchemeGenerator = module.exports = function SchemeGenerator(args, options, config)
{
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);
	console.log(this.yeoman);

	this.sourceRoot(path.dirname(__dirname));

	var rawSchemeString = this.readFileAsString(path.join(__dirname, './scheme.json'));

	this.scheme = JSON.parse(rawSchemeString);
	var currentVersion = +this.scheme.version;
	var components = this.scheme.components;

	var nextScheme = JSON.parse(rawSchemeString);
	var nextVersion = currentVersion + 1;
	nextScheme.version = nextVersion;
	var nextRawSchemeString = JSON.stringify(nextScheme, null, '\t');
	this.writeFileFromString(nextRawSchemeString, path.join(__dirname, './scheme.json'))

	this.mkdir("app/schemes/aura_scheme-" + currentVersion);

	//copy all existing components to a new location.
	console.info(chalk.bold.blue('recovering existant components.'));
	shell.mv("app/aura_components/*", "app/schemes/aura_scheme-" + currentVersion + "/");

	for(var i = 0; i < components.length; i++)
	{
		//this.hookFor('aura:component', {args: [components[i]]});
		this._createAuraSchemeComponents(components[i]);
	}

	this.on('end', function()
	{
		console.info(chalk.bold.green('Great !! you just created an awesome scheme.'));
	});
};

util.inherits(SchemeGenerator, yeoman.generators.NamedBase);

SchemeGenerator.prototype._createAuraSchemeComponents = function (component)
{
	console.info(chalk.bold.green('Component ' + component.name));

	//component index file
	this.template('templates/aura_components/main.js', 'app/aura_components/' + component.name + '/main.js');

	//component templates folder
	if (component.hasOwnProperty("templates"))
	{
		this.mkdir('app/aura_components/' + component.name + "/templates");
		var templates = component.templates;

		for (var i = 0; i < templates.length; i++)
		{
			var template = templates[i];
			var source = 'templates/aura_components/templates/template.html';
			var destination = 'app/aura_components/' + component.name + '/templates/' + template + '.html';
			this.template(source, destination);
		}
	}

	//component models folder
	if (component.hasOwnProperty("models"))
	{
		this.mkdir('app/aura_components/' + component.name + "/models");
		var models = component.models;

		for (var i = 0; i < models.length; i++)
		{
			var model = models[i];
			var modelObject = {name: model, type: component.type};
			var source = 'templates/aura_components/models/model.js';
			var destination = 'app/aura_components/' + component.name + '/models/' + model + '.js';
			this.template(source, destination, modelObject);
		}
	}

	//component collections folder
	if (component.hasOwnProperty("collections"))
	{
		this.mkdir('app/aura_components/' + component.name + "/collections");
		var collections = component.collections;

		for (var i = 0; i < collections.length; i++)
		{
			var collection = collections[i];
			collection.type = component.type;
			var source = 'templates/aura_components/collections/collection.js';
			var destination = 'app/aura_components/' + component.name + '/collections/' + collection.name + '.js';
			this.template(source, destination, collection);
		}
	}

	//component views folder
	if (component.hasOwnProperty("views"))
	{
		this.mkdir('app/aura_components/' + component.name + "/views");
		var views = component.views;

		for (var i = 0; i < views.length; i++)
		{
			var view = views[i];
			view.type = component.type;
			var source = 'templates/aura_components/views/view.js';
			var destination = 'app/aura_components/' + component.name + '/views/' + view.name + '.js';
			this.template(source, destination, view);
		}
	}

}

SchemeGenerator.prototype.createAuraScheme = function createAuraScheme()
{

};


