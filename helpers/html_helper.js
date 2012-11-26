var Users = require('../models/users');

stripErrors = function(mongooseErr){
    var prop, list = [];
    for( prop in mongooseErr.errors ){
        list.push( [mongooseErr.errors[prop].path, mongooseErr.errors[prop].type] )
    }
    return list;
}

exports.displayErrors = function(mongooseErr){
	var list = stripErrors(mongooseErr);
	var output = [];
	if(list.length > 0)
	{
		list.forEach(function(e,i){
			switch(e[1]){
				case('unique'):
					output.push(e[0]+" es utilizado por otro usuario.");
					break;
				case('required'):
					output.push( Users.attributes(e[0])+" es requerido.");
					break;
				case('format'):
					output.push(e[0]+" no tiene el formato correcto.");
					break;
				case('nameLength'):
					output.push("El nombre es necesario que tenga al menos 5 caracteres.");
					break;
				default:
					output.push(e[0]+": "+e[1]);
					break;
			}
		});
	}
	else
		output.push(mongooseErr);

	if(output.length){
		output = [output.join( '</li><li>\n' )];
		output.unshift('<ul><li>');
		output.push('</li><ul>');
	}
	return output.join('\n')
}