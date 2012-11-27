var Users = require('../models/users');
var helper = require('../helpers/html_helper');

exports.index = function(request, response){
	// Verificar si las credenciales no se almacenaron en una cookie
	if (request.cookies.user == undefined || request.cookies.pass == undefined)
	{
		if (request.session.user != null){
	        response.redirect('/invoices');
	    }
	    
		response.render('site/index', { title: 'CBB Recibos', message: { type:null, description:null } });
	}
	else
	{
		Users.autoLogin(request.cookies.user, request.cookies.pass, function(usr){
			if (usr != null)
			{
			    request.session.user = usr;
				response.redirect('/invoices');
			}
			else
			{
				response.render('site/index', { title: 'CBB Recibos', message: { type:null, description:null } });
			}
		});
	}
};

exports.login = function(request, response){
	Users.manualLogin(request.param('inputemail'), request.param('inputpassword'), function(err, usr){
		if (!usr)
		{
			response.render('site/index', { title:'CBB Recibos', message: { type:'alert-error', description:err } } );
		}
		else
		{
		    request.session.user = usr;
			if (request.param('chckrememberme') == 'true')
			{
				response.cookie('user', usr.user, { maxAge: 900000 });
				response.cookie('pass', usr.pass, { maxAge: 900000 });
			}
			response.redirect('/invoices');
		}
	});
}

exports.logout = function(request, response){
	response.clearCookie('user');
	response.clearCookie('pass');
	request.session.destroy(function(e){
	    response.redirect('/');
	});
};

exports.signup = function(request, response){
	if (request.session.user == null){
        response.render('site/register', { title: 'CBB Recibos', message: { type:null, description:null } });
    }
    else {
		response.redirect('/invoices');
	}
};

exports.register = function(request, response){
	if (request.session.user != null){
        response.redirect('/invoices');
    }
    else 
    {
		Users.signup({
			name : request.param('inputname'),
			password : request.param('inputpassword'),
			email : request.param('inputemail')
		}, function(err, usr){
			if (err)
			{
				response.render('site/register', { title: 'CBB Recibos', message: { type:'alert-error', description:helper.displayErrors(err) } });
			}
			else
			{
				response.redirect('/');
			}
		});
	}
}