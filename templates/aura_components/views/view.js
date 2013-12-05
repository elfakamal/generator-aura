define([<%
	print('"' + type.toLowerCase() + '"');
	if( typeof model !== 'undefined' ) print(', "../models/' + model + '"');
	if( typeof template !== 'undefined' ) print(', "text!../templates/' + template + '.html"'); %>],
function(<% print(type);
						if( typeof model !== 'undefined' ) print(", Model");
						if( typeof template !== 'undefined' ) print(', template'); %>)
{
	"use strict";

	<% if( typeof template !== 'undefined' ) print('var template = _.template(template);'); %>

	return <% print(type); %>.View.extend(
	{

		events: {
			'click': "onClick"
		},

		<% if( typeof tagName !== 'undefined' ) print('tagName: "' + tagName + '",'); %>

		initialize: function()
		{
			<% if( typeof model !== 'undefined' ) print('this.initModel();'); %>
			this.initListeners();
			this.render();
		},
		<% if( typeof model !== 'undefined' ) { %>
		initModel: function()
		{
			this.model = new Model();
		},
		<% } %>
		initListeners: function()
		{
			<% if( typeof model !== 'undefined' ) %> this.model.bind('change', this.onModelChange, this);
		},
		<% if( typeof model !== 'undefined' ) { %>
		onModelChange: function()
		{
			console.log("model change");
		},
		<% } %>
		onClick:function()
		{
			console.log("click");
		},

		render: function ()
		{
			<% if( typeof model !== 'undefined' ) { %>
			this.$el.html(template(this.model.toJSON()));
			<% } else { %>
			this.$el.html("");
			<% } %>
			return this;
		}

	});

});