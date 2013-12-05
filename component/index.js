'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = ComponentGenerator;

function ComponentGenerator(args, options, config)
{
	console.log("args : " + JSON.stringify(args));
	console.log("----");
	console.log("options : " + JSON.stringify(options));
	console.log("----");
	console.log("config : " + JSON.stringify(config));
	console.log("----");

	yeoman.generators.Base.apply(this, arguments);
	this.sourceRoot(path.join(path.dirname(__dirname), 'templates'));
	this.argument("name", {type: String, required: false});
	var componentData = args[0] || {};
	for(var key in componentData) this[key] = componentData[key];
}

util.inherits(ComponentGenerator, yeoman.generators.Base);

ComponentGenerator.prototype.createAuraComponentFiles = function createAuraComponentFiles()
{
	//component index file
	this.template('aura_components/main.js', 'app/aura_components/' + this.name + '/main.js');

	//component templates folder
	if (this.hasOwnProperty("templates"))
	{
		this.mkdir('app/aura_components/' + this.name + "/templates");
		var templates = this.templates;

		for (var i = 0; i < this.templates.length; i++)
		{
			var template = this.templates[i];
			var source = 'aura_components/templates/template.html';
			var destination = 'app/aura_components/' + this.name + '/templates/' + template + '.html';
			this.template(source, destination);
		}
	}

	//component models folder
	if (this.hasOwnProperty("models"))
	{
		this.mkdir('app/aura_components/' + this.name + "/models");
		var models = this.models;

		for (var i = 0; i < this.models.length; i++)
		{
			var model = this.models[i];
			var modelObject = {name: model, type: this.type};
			var source = 'aura_components/models/model.js';
			var destination = 'app/aura_components/' + this.name + '/models/' + model + '.js';
			this.template(source, destination, modelObject);
		}
	}

	//component collections folder
	if (this.hasOwnProperty("collections"))
	{
		this.mkdir('app/aura_components/' + this.name + "/collections");
		var collections = this.collections;

		for (var i = 0; i < this.collections.length; i++)
		{
			var collection = this.collections[i];
			collection.type = this.type;
			var source = 'aura_components/collections/collection.js';
			var destination = 'app/aura_components/' + this.name + '/collections/' + collection.name + '.js';
			this.template(source, destination, collection);
		}
	}

	//component views folder
	if (this.hasOwnProperty("views"))
	{
		this.mkdir('app/aura_components/' + this.name + "/views");
		var views = this.views;

		for (var i = 0; i < this.views.length; i++)
		{
			var view = this.views[i];
			view.type = this.type;
			var source = 'aura_components/views/view.js';
			var destination = 'app/aura_components/' + this.name + '/views/' + view.name + '.js';
			this.template(source, destination, view);
		}
	}

	// TODO: generate test

};
