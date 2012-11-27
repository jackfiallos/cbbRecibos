exports.index = function(request, response){
	if (request.session.user != null) {
        response.render('clients/index', { title: 'Administrar Clientes', username:request.session.user.name });
    }
    else
    	response.redirect('/logout');
};

exports.add = function(request, response){
	if (request.session.user != null) {
		response.render('clients/add', { title: 'Generar nuevo Cliente', username:request.session.user.name });	
	}
    else
    	response.redirect('/logout');
}

exports.create = function(request, response){
	if (request.session.user != null) {
		return response.json({
			status:400,
			message:"The server does not support the functionality required to fulfill the request."
		});
	}
    else
    	response.redirect('/logout');
}