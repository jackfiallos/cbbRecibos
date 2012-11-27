exports.preferences = function(request, response){
	response.render('user/preferences', { title: 'Preferencias de Usuario', username:request.session.user.name });
};