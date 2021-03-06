<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');
/*
$cs=Yii::app()->clientScript;
$cs->scriptMap=array(
    'jquery.js'=>'assets/js/jquery-1.7.1.js',
    'jquery.ajaxqueue.js'=>'assets/js/jquery-1.7.1.min.js',
    
);
*/
// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(

	'name'=>'Novicomat',
	//'theme'=>'classic',	

	// preloading 'log' component
	
	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.models.joomla15.*',
		'application.components.*',
		'application.components.parsers.*',
		'application.vendors.*',
		'application.helpers.*',
		'application.modules.srbac.controllers.SBaseController',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		
		'srbac' => array(
			'userclass'=>'Users', //default: User
			'userid'=>'id', //default: userid
			'username'=>'username', //default:username
			'delimeter'=>'@', //default:-
			'debug'=>false, //default :false
			'pageSize'=>15, // default : 15
			'superUser' =>'admin', //default: Authorizer
			'css'=>'srbac.css', //default: srbac.css
			'layout'=>'application.views.layouts.main', //default: application.views.layouts.main,//must be an existing alias
			'notAuthorizedView'=> 'srbac.views.authitem.unauthorized', // default:
			//srbac.views.authitem.unauthorized, must be an existing alias
			'alwaysAllowed'=>array(), //default: array()
			'userActions'=>array(), //default: array()
			'listBoxNumberOfLines' => 15, //default : 10
			'imagesPath' => 'srbac.images', // default: srbac.images
			'imagesPack'=>'noia', //default: noia
			'iconText'=>false, // default : false
			'header'=>'srbac.views.authitem.header', //default : srbac.views.authitem.header,
			//must be an existing alias
			'footer'=>'srbac.views.authitem.footer', //default: srbac.views.authitem.footer,
			//must be an existing alias
			'showHeader'=>true, // default: false
			'showFooter'=>true, // default: false
			'alwaysAllowedPath'=>'srbac.components', // default: srbac.components
			// must be an existing alias
		),
		
	),
	
	
	
	// application components
	'components'=>array(
//		'user'=>array(
//			// enable cookie-based authentication
//			'allowAutoLogin'=>true,
//		),
		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName'=>true,
			'rules'=>array(
				''=>'vsebine/adminIndex',
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		
		
		// uncomment the following to use a MySQL database
		/*
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=testdrive',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
		),
		*/
		'authManager'=>array(
            'class'=>'CDbAuthManager',
            'connectionID'=>'db',
			'defaultRoles'=>array('zelnik.net-avtor'),
        ),
        
        
        
		
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	
);
