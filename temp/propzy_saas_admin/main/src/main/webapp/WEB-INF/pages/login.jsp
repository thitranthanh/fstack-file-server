<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ESB</title>

    <link href="resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="resources/css/animate.css" rel="stylesheet">
    <link href="resources/css/style.css" rel="stylesheet">

</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">ESB</h1>

            </div>
            <h3>Welcome to ESB</h3>
            <!-- <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                Continually expanded and constantly improved Inspinia Admin Them (IN+)
            </p>
            <p>Login in. To see it in action.</p> -->
            <form  id="frmLogin" 
            	class="m-t" role="form" action="j_spring_security_check" method="POST" name="login-form">
                <div class="form-group">
                    <input id="i_username" type="text" value="superadmin"
                    	name="j_username" class="form-control" placeholder="Username or Email" required="">
                </div>
                <div class="form-group">
                    <input id="i_password" type="password" value="123456" 
                    	name="j_password" class="form-control" placeholder="Password" required="">
                </div>
                <button id="btnSubmit" type="button" class="btn btn-primary block full-width m-b">Login</button>

                <!-- <a href="#"><small>Forgot password?</small></a> -->
                <!-- <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="register.html">Create an account</a> -->
            </form>
            <!-- <p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p> -->
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="resources/js/jquery-2.1.1.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>

	<script type="text/javascript">
        $(document).ready(function() {
            var txtUserName = $("#i_username");
            var txtPassword = $("#i_password");
            var btnSubmit = $("#btnSubmit");

            txtUserName.keypress(function(e) {
                if(e.keyCode == 13) {
                    btnSubmit.click();
                }
            });
            
            txtPassword.keypress(function(e) {
                if(e.keyCode == 13) {
                    btnSubmit.click();
                }
            });
            
            btnSubmit.click(function(e) {
                var isSubmit = true;
                var userName = txtUserName.val();
                var password = txtPassword.val();
                if (userName == undefined || userName == "") {
                    isSubmit = false;
                    txtUserName.focus();
                } else {
                    /*$("#un-error-span").html("");
                    $("#fg-un").removeClass('has-error').addClass('has-success');*/
                }

                if (password == undefined || password == "") {
                    /*$("#pw-error-span").html("Thisfieldisrequired.");
                    $("#fg-pw").removeClass('has-success').addClass('has-error');*/
                    if (isSubmit) {
                        password.focus();
                    }
                    isSubmit = false;
                } else {
                    /*$("#pw-error-span").html("");
                    $("#fg-pw").removeClass('has-error').addClass('has-success');*/
                }
                if (isSubmit) {
                    /*btnSubmit.text("Signingin...");
                    btnSubmit.attr("disabled",true)*/;
                    $("#frmLogin").submit();
                }
                return false;
            });
        });
    </script>
</body>
</html>
