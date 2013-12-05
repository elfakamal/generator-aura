define(['underscore'], function (_) {
	'use strict';

	return {

		<% if( typeof type !== 'undefined' ) print('type: "' + type + '",'); %>

		initialize: function ()
		{
			this.initListeners();
			this.render();
		},

		initListeners: function()
		{
			this.$el.on('click', _.bind(this.someCoolFeature, this));
			<% if( typeof aura_listeners !== 'undefined' )
			{
				_.each(aura_listeners, function(callback, event, listeners)
				{
					print('this.sandbox.on("' + event + '", this.' + callback + ', this);\n\t\t\t');
				});
			} %>
		},

		<% if( typeof aura_listeners !== 'undefined' ) {
			_.each(aura_listeners, function(callback, event, listeners)
			{
				print(callback + ' : function() {},\n\t\t');
			});
		} %>

		render: function ()
		{
			//Place render logic here
			this.$el.html('Click me: ' + this.$el.html());
		},

		someCoolFeature: function ()
		{
			//Awesome code
			var element = this.$el;
			element.fadeOut(200, function ()
			{
				element.fadeIn(200);
			});
		}

	};

});
