
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var moment = require('moment');
var S = require('string');

var UsersSchema = new Schema({
	id: ObjectId,
	name: { type:String, required:true, allowNull:false, unique:true, set: toLower },
	email: { type:String, required:true, allowNull:false, unique:true, trim:true, lowercase:true },
	password: { type:String, required:true, allowNull:false, trim:true },
	active: { type:Boolean, required:true, default:true },
	modified: { type:Date, default:Date.now }
});

UsersSchema.path('name').validate(function(value){
    return value.length > 4;
}, 'nameLength');

UsersSchema.path('email').validate(function(value){
	return (/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i).test(value);
}, 'format');

function toLower (v) {
    return v.toLowerCase();
}

var Users = mongoose.model('Users', UsersSchema);

Users.attributes = function(key){
	var elements = new Array();
	elements['name'] = 'Nombre de usuario';
	elements['email'] = 'Email';
	elements['password'] = 'Clave de acceso';
	return elements[key];
}

Users.autoLogin = function(user, pass, callback)
{
	Users.findOne({name:user}, function(err, usr) 
	{
		if (usr)
		{
			usr.pass == pass ? callback(usr) : callback(null);
		}
		else
		{
			callback(null);
		}
	});
}

Users.manualLogin = function(user, pass, callback)
{
	Users.findOne({name:user}, function(err, usr) {
		if (usr == null)
		{
			callback('Nombre de usuario desconocido.', null);
		}
		else
		{
			bcrypt.compare(pass, usr.password, function(err, success) 
			{
				if (success)
				{
					callback(null, usr);
				}
				else
				{
					callback('Clave de acceso incorrecta.', null);
				}
			});
		}
	});
}

Users.signup = function(newData, callback)
{
	Users.findOne({name:newData.name}, function(err, usr) {
		if (usr)
		{
			callback('El nombre de usuario ya ha sido utilizado.');
		}
		else
		{
			Users.findOne({email:newData.email}, function(err, usr) {
				if (usr)
				{
					callback('La direccion de correo ya ha sido utilizada.');
				}
				else
				{
					if(newData.password.length > 0)
					{
						if(newData.password.length > 5)
						{
							Users.saltAndHash(S(newData.password).trim().s, function(hash){
								newData.password = hash;
								newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
								new Users(newData).save(function(err, usr){
									if(err)
									{
										callback(err);
									}
									else
										callback(null);
								});
							});
						}
						else
							callback('La clave es necesario que tenga al menos 6 caracteres.');
					}
					else
						callback('Clave de acceso requerida.');
				}
			});
		}
	});
}

Users.saltAndHash = function(pass, callback)
{
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		bcrypt.hash(pass, salt, function(err, hash) {
			callback(hash);
		});
	});
}

module.exports = Users;