<?php
/*
 * WPGear. Notice Interceptor
 * ajax_notice.php
 */
 
	$current_user = wp_get_current_user();	
	$user_id = $current_user->ID;
	
	$Mode 				= isset($_REQUEST['mode']) ? sanitize_text_field($_REQUEST['mode']) : null;
	$Notice_ID 			= isset($_REQUEST['id']) ? sanitize_text_field($_REQUEST['id']) : null;
	$Notice_Sign 		= isset($_REQUEST['sign']) ? sanitize_text_field($_REQUEST['sign']) : null;
	$Notice_Content 	= isset($_REQUEST['notice']) ? sanitize_text_field(wp_strip_all_tags($_REQUEST['notice'])) : null;	
	$Notice_Detector 	= isset($_REQUEST['detector']) ? sanitize_text_field($_REQUEST['detector']) : null;
	$Notices_Pack 		= isset($_REQUEST['notices']) ? ($_REQUEST['notices']) : null;	
	
	global $NI_File_AutoHideCSS_Path;	
	
	if ($Notice_Content) {
		$Notice_Content = str_replace('\\', '', $Notice_Content);
	}	
	
	$Notice_Total = null;
	$Notice_New = false;
	$Rules = null;
	$Notices_Pack_Checked = array();
	
	global $wpdb;
	$NI_usermeta_table = $wpdb->prefix .'usermeta';
	
	$Result = false;  
	
	// Get Notices
	if ($Mode == 'get_notices') {
		global $NtcIntrcptr_Rules;
		
		$Rules = $NtcIntrcptr_Rules;
		
		$Result = true;	
	}	
	
	// Check Notice
	if ($Mode == 'check_notice') {
		$Query = "
			SELECT umeta_id FROM $NI_usermeta_table 
			WHERE user_id = %d AND meta_key = 'notice-interceptor' AND meta_value = %s";
			
		$Record = $wpdb->get_var ($wpdb->prepare ($Query, $user_id, $Notice_Content));

		if (!$Record) {
			$Notice_New = true;
		}
		
		$Result = true;	
	}
	
	// Check Notices Pack. is New?
	if ($Mode == 'check_notices' && $Notices_Pack) {
		foreach ($Notices_Pack as $key => $value) {
			$Notice_Content = sanitize_text_field(wp_strip_all_tags($value));
			
			if ($Notice_Content) {
				$Notice_Content = str_replace('\\', '', $Notice_Content);
			}			
			
			if ($Notice_Content) {
				$is_Notice_New = false;
				
				$Query = "
					SELECT umeta_id FROM $NI_usermeta_table 
					WHERE user_id = %d AND meta_key = 'notice-interceptor' AND meta_value = %s";
					
				$Record = $wpdb->get_var ($wpdb->prepare ($Query, $user_id, $Notice_Content));				
				
				if (!$Record) {
					$is_Notice_New = true;
				}
		
				$Notices_Pack_Checked[$key] = $is_Notice_New;
			}
		}	
		
		$Result = true;	
	}	
	
	// Mark Read
	if ($Mode == 'mark_read') {
		$meta_key = 'notice-interceptor';
		$meta_value = $Notice_Content;
		
		add_user_meta ($user_id, $meta_key, $meta_value, false);

		// Add new CSS Rule to File: auto_hide.css
		$CSS_Rule = '';
		
		if ($Notice_Detector == 'class') {
			// Type: Class
			$Notice_Sign = str_replace(' ', '.', $Notice_Sign);
			
			$CSS_Rule = ".$Notice_Sign {display: none !important;}";
		} else if ($Notice_Detector == 'id') {
			// Type: ID
			$CSS_Rule = "#$Notice_Sign {display: none !important;}";
		} else {
			// что-то еще.
		}
		
		if ($CSS_Rule) {
			$Add_AutoHideCSS_Enable = true;
			
			if (file_exists($NI_File_AutoHideCSS_Path)) {
				// Проверяем на наличие такого Правила в файле notice_autohide.css
				$NI_AutoHideCSS = file_get_contents ($NI_File_AutoHideCSS_Path);
				
				if (str_contains ($NI_AutoHideCSS, $CSS_Rule)) {
					$Add_AutoHideCSS_Enable = false;
				}
			} 
			
			if ($Add_AutoHideCSS_Enable) {
				$CSS_Rule .= "\n";
				
				file_put_contents($NI_File_AutoHideCSS_Path, $CSS_Rule, FILE_APPEND | LOCK_EX);					
			}
		}
	
		$Result = true;
	}
	
	// Mark UnRead
	if ($Mode == 'mark_unread') {
		$Query = "
			DELETE FROM $NI_usermeta_table 
			WHERE user_id = %d AND meta_key = 'notice-interceptor' AND meta_value = %s";
	
		$Result = $wpdb->query ($wpdb->prepare ($Query, $user_id, $Notice_Content));
	}	
	
	$Obj_Request = new stdClass();
	$Obj_Request->status 				= 'OK';
	$Obj_Request->answer 				= $Result;
	$Obj_Request->notice_id 			= $Notice_ID;
	$Obj_Request->notice_new 			= $Notice_New;
	$Obj_Request->rules 				= $Rules;
	$Obj_Request->notices_pack_new 		= $Notices_Pack_Checked;

	wp_send_json($Obj_Request);    

	die; // Complete.