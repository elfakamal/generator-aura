define([
	<% print('"' + type.toLowerCase() + '",'); %>
	<% if( typeof model !== 'undefined' ) print('"../models/' + model + '"'); %>],
function(<% print(type + ','); %> <% if( typeof model !== 'undefined' ) print('Model'); %>)
{
	"use strict";

	return <% print(type); %>.Collection.extend(
	{
		<% if( typeof model !== 'undefined' ) print('model: Model,'); %>
		url : <% print('"' + name + 's"'); %>
	});

});