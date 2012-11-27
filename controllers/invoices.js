var User = require('../models/users');

exports.index = function(request, response){
	if (request.session.user != null) {
        response.render('invoices/index', { title: 'Lista de recibos emitidos', username:request.session.user.name });
    }
    else
    	response.redirect('/logout');
};

exports.add = function(request, response){
	if (request.session.user != null) {
		response.render('invoices/add', { title: 'Generar nuevo Recibo', username:request.session.user.name });	
	}
    else
    	response.redirect('/logout');
}

exports.create = function(request, response){
	return response.json({
		status:400,
		message:"The server does not support the functionality required to fulfill the request."
	});
}

exports.edit = function(request, response){
	if (request.session.user != null) {
		response.render('invoices/edit', { title: 'Home', username:request.session.user.name });
	}
    else
    	response.redirect('/logout');
}

exports.update = function(request, response){
	return response.json({
		status:400,
		message:"The server does not support the functionality required to fulfill the request."
	});
}

exports.delete = function(request, response){
	return response.json({
		status:400,
		message:"The server does not support the functionality required to fulfill the request."
	});
}