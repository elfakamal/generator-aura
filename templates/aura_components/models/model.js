define([ <% print('"' + type.toLowerCase() + '"'); %> ], function(<% print(type); %>)
{
	"use strict";

	return <% print(type); %>.Model.extend(
	{
		defaults:
		{

		}
	});

});