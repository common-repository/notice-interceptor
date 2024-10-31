<?php
/*
 * WPGear. Notice Interceptor
 * options.php
 */
	
	$NI_Action 			= isset($_REQUEST['action']) ? sanitize_text_field ($_REQUEST['action']) : null;
	$NI_Custom_Rules 	= isset($_REQUEST['notice-interceptor_option_customrules']) ? sanitize_textarea_field ($_REQUEST['notice-interceptor_option_customrules']) : null;
	$NI_Setup_AdminOnly = (isset($_REQUEST['notice-interceptor_option_adminonly'])) ? 1 : 0;	
	
	if ($NI_Action == 'Update') {
		$NI_Custom_Rules = NtcIntrcptr_Prepare_Rules ($NI_Custom_Rules);
		
		update_option('notice-interceptor_rules_custom', $NI_Custom_Rules);			
		update_option('notice-interceptor_option_adminonly', $NI_Setup_AdminOnly);
	} else {
		$NI_Custom_Rules = get_option('notice-interceptor_rules_custom', array());
		$NI_Setup_AdminOnly = get_option('notice-interceptor_option_adminonly', 1);
	}	
	
	if ($NI_Setup_AdminOnly) {
		if (!current_user_can('edit_dashboard')) {
			?>
			<div class="notice-interceptor_warning" style="margin: 40px;">
				Sorry, you are not allowed to view this page.
			</div>
			<?php
			
			return;
		}		
	}
	
	$NI_Custom_Rules_txt = '';
	
	foreach ($NI_Custom_Rules as $NI_Custom_Rule) {
		$NI_Custom_Rules_txt .= "$NI_Custom_Rule\r\n";
	}
	
	?>
	<div class="wrap">
		<h2>Notice Interceptor.</h2>
		<hr>
		
		<div class="notice-interceptor_options_box">
			<form name="form_NI_Options" method="post" style="margin-top: 20px;">
				<div style="margin-top: 10px;">
					<label for="notice-interceptor_option_adminonly" title="On/Off">
					Enable this Page for Admin only
					</label>
					<input id="notice-interceptor_option_adminonly" name="notice-interceptor_option_adminonly" type="checkbox" <?php if($NI_Setup_AdminOnly) {echo 'checked';} ?>>
				</div>				
				
				<div style="margin-top: 10px;">
					<label for="notice-interceptor_option_customrules" title="one rule per line">Custom Rules (<?php echo count($NI_Custom_Rules); ?>): </label>
					<textarea id="notice-interceptor_option_customrules" name="notice-interceptor_option_customrules" rows="4" class="notice-interceptor_option_customrules"><?php echo $NI_Custom_Rules_txt; ?></textarea>					
				</div>
				<div style="margin-left: 20px;">
					<p>* To avoid processing errors, you should include the complete set of notification block classes that you want to block. For example:</p>
					<p class="notice-interceptor_option_customrules_sample">&lt;div <span style="font-weight: bold;">class="<span style="color: brown;">notice notice-warning settings-error is-dismissible</span>"</span>&gt;You have a newer version WordPress 999.01 than it can be!&lt;a href="//wp-admin/update-core.php" aria-label="Please update WordPress now"&gt;Please update&lt;/a&gt;.&lt;/div&gt;</p>
					<p>We need to take from this block the complete line of the class attribute:</p>
					<p style="font-weight: bold; color: brown;">notice notice-warning settings-error is-dismissible</p>
					<p>and insert into the: "Custom Rules".</p>
					<p>* Also, you can add ID instead of Class.</p>
				</div>

				<hr>
				<div style="margin-top: 10px; margin-bottom: 5px; text-align: right;">
					<input id="notice-interceptor_btn_options_save" type="submit" class="button button-primary" style="margin-right: 5px;" value="Save">
				</div>
				<input id="action" name="action" type="hidden" value="Update">
			</form>
		</div>			
	</div>
