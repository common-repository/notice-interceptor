<?php
/*
Plugin Name: Notice Interceptor
Plugin URI: wpgear.xyz/notice-interceptor/
Description: Tool for creating a comfortable living environment in the Admin area without annoying notifications and ad units.
Version: 4.24
Author: WPGear
Author URI: http://wpgear.xyz
License: GPLv2
*/

	$NtcIntrcptr_plugin_url 	= plugin_dir_url( __FILE__); 	// со слэшем на конце
	$NtcIntrcptr_plugin_dir 	= plugin_dir_path( __FILE__);	// со слэшем на конце

	$NtcIntrcptr_Rules = array();
		
	$NI_File_AutoHideRules_Path 		= $NtcIntrcptr_plugin_dir  .'includes/autohide.txt';
	$NI_File_AutoHideCSS_Path 			= ABSPATH .'notice_autohide.css';	

	if (file_exists($NI_File_AutoHideRules_Path)) {
		// Get Rules. Global.
		$NI_File_AutoHideRules_Stat = stat($NI_File_AutoHideRules_Path);		
		$NI_File_AutoHideRules_ChangeTime = $NI_File_AutoHideRules_Stat["mtime"];
		
		$NI_File_AutoHideRules_LasTime = get_option('notice-interceptor_autohide', false);

		if ($NI_File_AutoHideRules_LasTime) {
			// Check Updates.
			if ($NI_File_AutoHideRules_LasTime == $NI_File_AutoHideRules_ChangeTime) {
				// Get Rules.
				$NtcIntrcptr_Rules = get_option('notice-interceptor_rules', array());				
			} else {
				// Update Rules. 
				$NtcIntrcptr_Rules = NtcIntrcptr_Get_Rules ($NI_File_AutoHideRules_ChangeTime);				
			}
		} else {
			// Load Rules default.
			$NtcIntrcptr_Rules = NtcIntrcptr_Get_Rules ($NI_File_AutoHideRules_ChangeTime);
		}
	}
	
	// Get Rules. Customs.
	$NI_Custom_Rules = get_option('notice-interceptor_rules_custom', array());
		
	// Merge Rules. Global + Customs.
	if ($NtcIntrcptr_Rules) {
		if ($NI_Custom_Rules) {
			$NtcIntrcptr_Rules = array_merge ($NtcIntrcptr_Rules, $NI_Custom_Rules);
			$NtcIntrcptr_Rules = array_unique ($NtcIntrcptr_Rules);
		}
	} else {
		if ($NI_Custom_Rules) {
			$NtcIntrcptr_Rules = $NI_Custom_Rules;
		}		
	}
	
	$NtcIntrcptr_Rules = array_values ($NtcIntrcptr_Rules);
	
	// Read Rules. Global.
	function NtcIntrcptr_Get_Rules ($NI_File_AutoHideRules_ChangeTime) {
		global $NI_File_AutoHideRules_Path;
		
		$NI_Rules = array();
		
		if (file_exists($NI_File_AutoHideRules_Path)) {		
			$NI_Rules = file_get_contents($NI_File_AutoHideRules_Path);

			$NI_Rules = NtcIntrcptr_Prepare_Rules ($NI_Rules);

			update_option('notice-interceptor_rules', $NI_Rules);
			update_option('notice-interceptor_autohide', $NI_File_AutoHideRules_ChangeTime);	
		}	
		
		return $NI_Rules;
	}

	// Prepare Rules
	function NtcIntrcptr_Prepare_Rules ($NI_Rules) {
		$NI_Rules = explode(PHP_EOL, $NI_Rules);

		foreach ($NI_Rules as $key => &$value) {
			$value = sanitize_text_field($value);
			$value = preg_replace('/[^A-Za-z0-9\-_# `~]/', '', $value);

			if ($value) {
				if (preg_match("/#/", $value)) {
					unset($NI_Rules[$key]);
				}
			} else {
				unset($NI_Rules[$key]);
			}
		}

		$NI_Rules = array_unique ($NI_Rules);
		$NI_Rules = array_values ($NI_Rules); 

		return $NI_Rules;
	}

	/* Admin Console - Styles.
	----------------------------------------------------------------- */
	add_action ('admin_enqueue_scripts', 'NtcIntrcptr_admin_style', 999999);	
	function NtcIntrcptr_admin_style ($hook) {
		global $NtcIntrcptr_plugin_url;		
		global $NtcIntrcptr_plugin_dir;
		global $NI_File_AutoHideCSS_Path;
	
		// Styles: Admin
		$NI_Style_URL = $NtcIntrcptr_plugin_url .'admin-style.css';
		
		wp_register_style ('notice_interceptor', $NI_Style_URL, false);
		wp_enqueue_style ('notice_interceptor');
		
		// Styles: AutoHide
		if (file_exists ($NI_File_AutoHideCSS_Path)) {
			$Site_URL = get_site_url();
			
			$NI_Style_AutoHide_URL = $Site_URL .'/notice_autohide.css';

			wp_register_style ('notice_interceptor_autohide', $NI_Style_AutoHide_URL, false);
			wp_enqueue_style ('notice_interceptor_autohide');	
		}	

		// Script
		$NI_Script_URL = $NtcIntrcptr_plugin_url .'includes/notice-interceptor.js';			
		wp_enqueue_script ('notice_interceptor', $NI_Script_URL, array());
	}	
	
	/* Create plugin SubMenu
	----------------------------------------------------------------- */		
	function NtcIntrcptr_create_menu() {
		add_options_page(
			__( 'Notice Interceptor', 'textdomain' ),
			__( 'Notice Interceptor', 'textdomain' ),
			'publish_posts',
			'notice-interceptor/options.php',
			''
		);
	}
	add_action('admin_menu', 'NtcIntrcptr_create_menu');

	/* AJAX Processing
	----------------------------------------------------------------- */
    add_action( 'wp_ajax_ntcintrcptr', 'NtcIntrcptr_Ajax' );
    function NtcIntrcptr_Ajax(){
		include_once ('includes/ajax_notice.php');
    }
	
	/* Function str_contains for PHP < 8
	----------------------------------------------------------------- */	
	if (! function_exists('str_contains')) {
		function str_contains($haystack, $needle) {
			return $needle !== '' && mb_strpos($haystack, $needle) !== false;
		}
	}	