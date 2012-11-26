var User = require('../models/users');
var brand = 'Bootstrap for Jade';

exports.index = function(request, response){
	response.render('invoices/index', { title: 'Home', id: 'home', brand: brand });
};

exports.add = function(request, response){
	response.render('invoices/add', { title: 'Home', id: 'home', brand: brand });	
}

exports.create = function(request, response){
	return response.json({
		status:404,
		message:"The server does not support the functionality required to fulfill the request."
	});
}

exports.edit = function(request, response){
	response.render('invoices/edit', { title: 'Home', id: 'home', brand: brand });	
}

exports.update = function(request, response){
	return response.json({
		status:404,
		message:"The server does not support the functionality required to fulfill the request."
	});
}

exports.delete = function(request, response){
	return response.json({
		status:404,
		message:"The server does not support the functionality required to fulfill the request."
	});
}