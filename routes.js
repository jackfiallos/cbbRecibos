var siteController = require('./controllers/site'),
	invoiceController = require('./controllers/invoices');

/**
 * Routes module definition
 */
module.exports = function(app){
	/** Site **/
	app.get('/', siteController.index);
	app.post('/', siteController.login);
	app.get('/logout', siteController.logout);

	app.get('/signup', siteController.signup);
	app.post('/signup', siteController.register);

	// app.get('/lost-password', siteController.lostPassword);
	// app.post('/lost-password', siteController.lostPasswordForm);

	// app.get('/restore-password', siteController.restorePassword);
	// app.post('/restore-password', siteController.restorePasswordForm);

	/** Invoices **/
	app.get('/invoices', invoiceController.index);
	app.get('/invoices/create', invoiceController.add);
	app.post('/invoices/create', invoiceController.create);
	app.get('/invoices/edit/:id', invoiceController.edit);
	app.put('/invoices/edit/:id', invoiceController.update);
	app.get('/invoices/delete/:id', invoiceController.delete);
};