function LoginController()
{
	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });
}