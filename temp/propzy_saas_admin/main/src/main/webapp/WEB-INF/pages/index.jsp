<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ESB</title>

    <link href="resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/font-awesome/css/font-awesome.css" rel="stylesheet">

	<link href="resources/css/plugins/dataTables/datatables.min.css" rel="stylesheet">

	<!-- Toastr -->
    <link href="resources/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    
    <!-- icheck -->
    <link href="resources/css/plugins/iCheck/custom.css" rel="stylesheet">
    
    <link href="resources/css/animate.css" rel="stylesheet">
    <link href="resources/css/style.css" rel="stylesheet">

	<!-- Select2 -->
	<link href="resources/css/plugins/select2/select2.min.css" rel="stylesheet">
	
	<!-- Ladda style -->
    <link href="resources/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    
    
</head>

<body class="top-navigation">

    <div id="wrapper">
        <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom white-bg">
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-header">
                <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                    <i class="fa fa-reorder"></i>
                </button>
                <a href="index#services" class="navbar-brand">ESB</a>
            </div>
            <div class="navbar-collapse collapse" id="navbar">
                <ul class="nav navbar-nav">
                    <!-- <li class="active">
                        <a aria-expanded="false" role="button" href="layouts.html"> Back to main Layout page</a>
                    </li> -->
                    <li class="dropdown" id="menuServices" style="display: none">
                        <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Management <span class="caret"></span></a>
                        <ul role="menu" class="dropdown-menu">
                            <li id="menuHost" style="display: none"><a href="index#hosts">Host Management</a></li>
                            <li id="menuService" style="display: none"><a href="index#services">Service Management</a></li>
                            <li id="menuRouting" style="display: none"><a href="index#routings">Mapping Management</a></li>
                        </ul>
                    </li>
                    <li class="dropdown" id="menuAdministrators" style="display: none">
                        <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Administrators <span class="caret"></span></a>
                        <ul role="menu" class="dropdown-menu">
                            <li id="menuUser" style="display: none"><a href="index#users">User Management</a></li>
                            <li id="menuGroup" style="display: none"><a href="index#groups">Group Management</a></li>
                            <li id="menuRole" style="display: none"><a href="index#roles">Role Management</a></li>
                            <li id="menuMyProfile" style="display: block"><a href="index#my-profile">My Profile</a></li>
                            <li id="menuActionLog" style="display: none"><a href="index#action-logs">Action Log Management</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <a onclick="InspiniaCommonUtil.handleLogout()" href="#logout">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="row wrapper border-bottom white-bg page-heading">
               <div id="breadcrumb" class="col-sm-12">
                   <!-- <h2>This is main title</h2>
                   <ol class="breadcrumb">
                       <li>
                           <a href="index.html">This is</a>
                       </li>
                       <li class="active">
                           <strong>Breadcrumb</strong>
                       </li>
                   </ol> -->
               </div>
               <!-- <div class="col-sm-8">
                   <div class="title-action">
                       <a href="" class="btn btn-primary">This is action area</a>
                   </div>
               </div> -->
           </div>
        </div>
        <div class="wrapper wrapper-content">
            <div id="ajax-content" class="container">

            </div>
        </div>
        <div class="footer">
            <div class="pull-right">
            </div>
            <div>
            </div>
        </div>

        </div>
        </div>

    <!-- Mainly scripts -->
    <script src="resources/js/jquery-2.1.1.js"></script>
    <script src="resources/js/plugins/jquery-ui/jquery-ui.min.js"></script>
    
    <script src="resources/js/bootstrap.min.js"></script>
    <script src="resources/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="resources/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

	<script src="resources/js/plugins/dataTables/datatables.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="resources/js/inspinia.js"></script>
    <script src="resources/js/plugins/pace/pace.min.js"></script>

	<!-- Select2 -->
	<script type="text/javascript" src="resources/js/plugins/select2/select2.full.min.js"></script>

	<!-- Ladda -->
    <script type="text/javascript" src="resources/js/plugins/ladda/spin.min.js"></script>
    <script type="text/javascript" src="resources/js/plugins/ladda/ladda.min.js"></script>
    <script type="text/javascript" src="resources/js/plugins/ladda/ladda.jquery.min.js"></script>
    
    <!-- Toastr script -->
    <script type="text/javascript" src="resources/js/plugins/toastr/toastr.min.js"></script>
    
    <!-- Bootbox -->
	<script type="text/javascript" src="resources/js/plugins/bootbox/bootbox.min.js"></script>
	
	<!-- BlockUI -->
	<script type="text/javascript" src="resources/js/plugins/jQuery-BlockUI/jquery.blockUI.js"></script>
	
    <!-- iCheck -->
    <script type="text/javascript" src="resources/js/plugins/iCheck/icheck.min.js"></script>
    
	<!-- Backbone script -->
	<script type="text/javascript" src="resources/js/backbone/libs/underscore-min.js"></script>
	<script type="text/javascript" src="resources/js/backbone/libs/backbone.js"></script>
	<script data-main="resources/js/backbone/main" src="resources/js/backbone/libs/require.js"></script>
	<script type="text/javascript" src="resources/js/backbone/utils/ajax_wrapper.js"></script>
	<script type="text/javascript" src="resources/js/inspinia-util.js"></script>
	
	
</body>
</html>
