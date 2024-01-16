<?php
header("Access-Control-Allow-Origin: *");

if(isset($_GET['get_file']) && isset($_GET['package'])) {
	$packageName = htmlentities($_GET['package']);
	$packageFolder = htmlentities($_GET['get_file']);

	$fileOpen = dirname(__FILE__)."/".$packageName."/".$packageFolder."/";
} else {
	echo 'Error Not existe';
	die();
}

$opendConfigFile = file_get_contents($fileOpen."min.json");
if(!$opendConfigFile) {
	echo 'ERROR NOT FUND';
	die();
}
$configJson = json_decode($opendConfigFile, true);
if(!$configJson) {
	var_dump($opendConfigFile);

	echo 'ERROR CONFIG';
	die();
}
$reponse = "";
$mime = 'text/javascript';
if(isset($configJson['config'])) {
	$config = $configJson['config'];
	$var_type = $config['var_type'];
	unset($config['var_type']);

	foreach($config as $k => $v) {
		$reponse .= "const {$var_type}_{$k} = '{$v}';\n";
	}
}

if(isset($configJson['package@script'])):
	$mime = 'text/javascript';

	foreach ($configJson['package@script'] as $key => $value) {
		$reponse .= open_file($value);
	}
endif;
if(isset($configJson['package@stylesheet'])):
	$mime = 'text/javascript';

	foreach ($configJson['package@stylesheet'] as $key => $value) {
		$reponse .= open_file($value);
	}
endif;

if(isset($configJson['script'])):
	$mime = 'text/javascript';

	foreach ($configJson['script'] as $key => $value) {
		$reponse .= open_file($value.'.js', $fileOpen);
	}
endif;
if(isset($configJson['stylesheet'])):
	$mime = 'text/css';

	foreach ($configJson['stylesheet'] as $key => $value) {
		$reponse .= open_file($value.'.css', $fileOpen);
	}
endif;
header('Content-Type: '.$mime.'; charset=utf-8');
echo $reponse;
/*
switch($packageName) {
	case 'kernelEvent':
		header('Content-Type: text/javascript; charset=utf-8');

		echo $html;

		foreach ($configJson['files'] as $key => $value) {
			open_file($value, $fileOpen);
		}
		break;
		
	case 'player':
		header('Content-Type: text/javascript; charset=utf-8');

		if(isset($configJson['package'])):
			foreach ($configJson['package'] as $key => $value) {
				open_file($value);
			}
		endif;

		foreach ($configJson['files'] as $key => $value) {
			open_file($value, $fileOpen);
		}
		break;

	case 'stylesheet':
		header('Content-Type: text/css; charset=utf-8');
		foreach ($configJson['files'] as $key => $value) {
			open_file($value, $fileOpen);
		}
		break;
}
*/
function open_file($string, $url = 'http://127.0.0.1/butterfly-api/package/') {
	$stringFile = $url . $string;
	$openFile = file_get_contents( $stringFile );
	if(!$openFile) {
		echo 'not opened :'.$stringFile;
		die();
		return false;
	}

	return $openFile."\n\n";
}