<?php
/*
	Notice Interceptor
*/

	// if uninstall.php is not called by WordPress, die
	if (!defined('WP_UNINSTALL_PLUGIN')) {
		die;
	}
	
	global $wpdb;
	
	$NI_options_table = $wpdb->prefix .'options';
	$NI_usermeta_table = $wpdb->prefix .'usermeta';
	
	// Удаляем Options Плагина
	$Query = "DELETE FROM $NI_options_table WHERE option_name LIKE 'notice-interceptor%'";		
	$wpdb->query($Query);

	// Удаляем UserMeta Плагина	
	$Query = "DELETE FROM $NI_usermeta_table WHERE meta_key = 'notice-interceptor'";		
	$wpdb->query($Query);
	
	// Удаляем AutoHideCSS
	$NI_File_AutoHideCSS_Path = ABSPATH .'notice_autohide.css';

	if (file_exists($NI_File_AutoHideCSS_Path)) {
		unlink($NI_File_AutoHideCSS_Path);		
	}	