// WPGear. Notice Interceptor
var Notice_Hidden = new Array ();
var Count_Notice_Hide = 0;

var Count_Notice_New = 0;
var Count_Notices = 0;
var Count_Notices_Answer = 0;

var Info_Notice_Hide = '';
var Info_Notice_New = '';
var Info_Notice_Total = '';

var Notice_Items;
var Notice_Item;

var Ajax_URL = ajaxurl;
var Ajax_Data = '';

window.addEventListener ('load', function() {
	console.log('Notice Interceptor - is loaded.'); 

    Ajax_Data = {
        'action': 'ntcintrcptr',
        'mode': 'get_notices'
        };

	jQuery.ajax({
		type:"POST",
		url: Ajax_URL,
		dataType: 'json',
		data: Ajax_Data,
		cache: false,
		success: function(jsondata) {
			var Obj_Request = jsondata;	
		
			var Status 				= Obj_Request.status;
			var Answer 				= Obj_Request.answer;
			var Notice_Class 		= Obj_Request.rules;
			
			if (Answer) { 
				var i;
				var j;	
			
				var WP_Admin_Content_Box 		= document.getElementById("wpbody-content");				
				var WP_Admin_SreenMetaLink_Box 	= document.getElementById("screen-meta-links");
				var WP_Admin_Notices_Box 		= document.createElement("div");
				
				WP_Admin_Notices_Box.setAttribute("id", "notice-interceptor_box");
				WP_Admin_Notices_Box.setAttribute("class", "notice-interceptor_box");	
								
				if (WP_Admin_SreenMetaLink_Box) {
					WP_Admin_SreenMetaLink_Box.insertAdjacentElement("afterbegin", WP_Admin_Notices_Box);
				} else {
					WP_Admin_Content_Box.insertAdjacentElement("afterbegin", WP_Admin_Notices_Box);
				}

				Info_Notice_Processing = '<span id="notice-interceptor_processing" class="notice-interceptor_processing">...loadind...</span>';
				
				Info_Notice_Hide = '<span id="notice-interceptor_info_hide" class="notice-interceptor_info_hide" style="cursor: pointer; display: none;" title="Click - to View" onclick="NtcIntrcptr_Show_Notice_Hiden();"></span>';
				
				Info_Notice_New = '<span id="notice-interceptor_info_new" class="notice-interceptor_info_new"></span>';

				WP_Admin_Notices_Box.innerHTML = '<div><span class="notice-interceptor_info_title"><a href="/wp-admin/options-general.php?page=notice-interceptor/options.php" target="_blank" title="Click to setup.">Notices Interceptor</a></span>' + Info_Notice_Processing + Info_Notice_Hide + Info_Notice_New + '</div><div id="notice-interceptor_footer" style="display: none;"><hr><div id="notice-interceptor_footer_box" class="notice-interceptor_footer_box"></div></div>';
				
                // Check Notice. New / Quarantine
				var Processing = false;				
				var Notice_Items_Array = new Array ();				
				
				for (i = 0; i < Notice_Class.length; i++) {
					var Notice_Detector = '';
					
					// Check by Class. <div class='...
					Notice_Items = document.querySelectorAll('[class$="' + Notice_Class[i] + '"]');

					if (Object.keys(Notice_Items).length > 0) {
						Notice_Detector = 'class';
						
					} else {
						// Alternative check by Class. Classes with trailing spaces.
						Notice_Items = document.querySelectorAll('[class$="' + Notice_Class[i] + ' "]');

						if (Object.keys(Notice_Items).length > 0) {
							Notice_Detector = 'class';
							
						} else {
							// Check by ID. <div id='...
							Notice_Items = document.querySelectorAll('[id$="' + Notice_Class[i] + '"]');
							
							if (Object.keys(Notice_Items).length > 0) {
								Notice_Detector = 'id';
								
							}
						}						
					}					

					if (Object.keys(Notice_Items).length > 0) {
						Processing = true;
						
						for (j = 0; j < Notice_Items.length; j++) {

							Notice_Item = Notice_Items[j].innerHTML;
							
							Count_Notice_Hide = Count_Notice_Hide + 1;
							
							Count_Notices = Count_Notices + 1;
							
							Notice_Items_Array[Count_Notice_Hide] = (Notice_Item);
							
							var Attribute_Notice_value 	= 'interceptor_id_' + Count_Notice_Hide;		
							
							Notice_Items[j].setAttribute("notice", Attribute_Notice_value);	
							Notice_Items[j].style.setProperty('display', 'none', 'important');							

							var Notice = new Array ();
							
							Notice['id'] 		= Count_Notice_Hide;
							Notice['sign'] 		= Notice_Class[i];
							Notice['content'] 	= Notice_Item;
							Notice['is_new'] 	= null;
							Notice['detector'] 	= Notice_Detector;		
							
							Notice_Hidden.push(Notice);				
						}
					}
				}

				Ajax_Data = {
					'action': 'ntcintrcptr',
					'notices': Notice_Items_Array,
					'mode': 'check_notices'
					};
	
				jQuery.ajax({
					type:"POST",
					url: Ajax_URL,
					dataType: 'json',
					data: Ajax_Data,
					cache: false,
					success: function(jsondata) {
						var Obj_Request = jsondata;						
								
						var Status 				= Obj_Request.status;
						var Answer 				= Obj_Request.answer;
						var Notices_Pack_New	= Obj_Request.notices_pack_new;

						if (Answer) {		
							for (x in Notices_Pack_New) {
								Count_Notices_Answer = Count_Notices_Answer + 1;

								if (Notices_Pack_New[x]) {
									Count_Notice_New = Count_Notice_New + 1;

									Notice_Hidden[x - 1]['is_new'] = true;
								}
							}

							document.getElementById ('notice-interceptor_processing').style.display = 'none';
							
							document.getElementById ('notice-interceptor_info_hide').style.display = 'inline-block';
							document.getElementById ('notice-interceptor_info_hide').innerHTML = 'Hide: ' + Count_Notice_Hide;

							if (Count_Notice_New > 0) {
								document.getElementById ('notice-interceptor_info_new').style.color = 'red';
								document.getElementById ('notice-interceptor_info_new').style.cursor = 'pointer';
								document.getElementById ('notice-interceptor_info_new').title = 'Click - to View';
								document.getElementById ('notice-interceptor_info_new').setAttribute("onclick","NtcIntrcptr_Show_Notice_New();");
								document.getElementById ('notice-interceptor_info_new').innerHTML = 'New: ' + Count_Notice_New;
							}
						}
					}
				});

				if (!Processing) {
					document.getElementById ('notice-interceptor_processing').style.display = 'none';						
					document.getElementById ('notice-interceptor_info_hide').innerHTML = 'Hide: ' + Count_Notice_Hide;
				}
			}
		}
	});			
});

function NtcIntrcptr_Show_Notice_Hiden() {
	var i;
	var Notice_ID;
	var Notice_Content;
	var Notice_New;
	var Notice_Types = "'hidden'";
	var NI_Signature;
	var NI_Footer;
	
	document.getElementById ('notice-interceptor_footer_box').innerHTML = '';
	document.getElementById ('notice-interceptor_footer').style.display = 'block';
	
	document.getElementById ('notice-interceptor_info_hide').setAttribute('onclick','NtcIntrcptr_Hide_Footer()');
	document.getElementById ('notice-interceptor_info_new').setAttribute('onclick','NtcIntrcptr_Show_Notice_New()');
	
	NI_Footer = '<div class="notice-interceptor_footer_header"><div class="notice-interceptor_footer_header_label">Hidden ' + Count_Notice_Hide + ':</div><div class="notice-interceptor_footer_header_close" title="Close info Box" onclick="NtcIntrcptr_Hide_Footer();"><span class="dashicons dashicons-no"></span></div></div>';
	
	for (i = 0; i < Notice_Hidden.length; i++) {
		Notice_ID 		= Notice_Hidden[i]['id'];
		Notice_Content 	= Notice_Hidden[i]['content'];
		Notice_New 		= Notice_Hidden[i]['is_new'];
		NI_Signature = Notice_Hidden[i]['sign'];
		
		NI_Footer = NI_Footer + '<div class="notice-interceptor_footer_hidden">';
		
		if (Notice_New) {
			NI_Footer = NI_Footer + '<div class="notice-interceptor_footer_hidden_header notice-interceptor_footer_hidden_unread">* New.<span class="notice-interceptor_footer_hidden_mark_action" title="Set this Notice as Read" onclick="NtcIntrcptr_Notice_Mark_Read(' + Notice_ID + ', ' + Notice_Types + ')">Mark -> Read</span><span id="notice-interceptor_processing_id_' + Notice_ID + '" class="notice-interceptor_processing" style="display:none;">...processing...</span></div>';
		} else {
			NI_Footer = NI_Footer + '<div class="notice-interceptor_footer_hidden_header notice-interceptor_footer_hidden_read">* Quarantine.<span class="notice-interceptor_footer_hidden_mark_action" title="Set this Notice as UnRead" onclick="NtcIntrcptr_Notice_Mark_UnRead(' + Notice_ID + ', ' + Notice_Types + ')">Mark -> UnRead</span><span id="notice-interceptor_processing_id_' + Notice_ID + '" class="notice-interceptor_processing" style="display:none;">...processing...</span></div>';
		}
		
		NI_Signature_Box = '<hr><div>signature: &apos;<span class="notice-interceptor_footer_signature">' + NI_Signature + '</span>&apos;</div>';
		
		NI_Footer = NI_Footer + Notice_Content + NI_Signature_Box + '</div>';
	}

	document.getElementById ('notice-interceptor_footer_box').innerHTML = NI_Footer;
}

function NtcIntrcptr_Show_Notice_New() {
	var i;
	var Notice_ID;
	var Notice_Content;
	var Notice_New;
	var Notice_Types = "'new'";
	var NI_Signature;
	var NI_Footer;
	
	document.getElementById ('notice-interceptor_footer_box').innerHTML = '';
	document.getElementById ('notice-interceptor_footer').style.display = 'block';
	
	document.getElementById ('notice-interceptor_info_hide').setAttribute('onclick','NtcIntrcptr_Show_Notice_Hiden()');
	document.getElementById ('notice-interceptor_info_new').setAttribute('onclick','NtcIntrcptr_Hide_Footer()');
	
	NI_Footer = '<div class="notice-interceptor_footer_header"><div class="notice-interceptor_footer_header_label">New ' + Count_Notice_New + ':</div><div class="notice-interceptor_footer_header_close" title="Close info Box" onclick="NtcIntrcptr_Hide_Footer();"><span class="dashicons dashicons-no"></span></div></div>';
	
	for (i = 0; i < Notice_Hidden.length; i++) {
		Notice_ID 		= Notice_Hidden[i]['id'];
		Notice_Content 	= Notice_Hidden[i]['content'];
		Notice_New 		= Notice_Hidden[i]['is_new'];
		NI_Signature = Notice_Hidden[i]['sign'];	
		
		if (Notice_New) {
			NI_Footer = NI_Footer + '<div class="notice-interceptor_footer_hidden">';
			
			NI_Footer = NI_Footer + '<div class="notice-interceptor_footer_hidden_header notice-interceptor_footer_hidden_unread">* New.<span class="notice-interceptor_footer_hidden_mark_action" title="Set this Notice as Read" onclick="NtcIntrcptr_Notice_Mark_Read(' + Notice_ID + ', ' + Notice_Types + ')">Mark -> Read</span><span id="notice-interceptor_processing_id_' + Notice_ID + '" class="notice-interceptor_processing" style="display:none;">...processing...</span></div>';
			
			NI_Signature_Box = '<hr><div>signature: &apos;<span class="notice-interceptor_footer_signature">' + NI_Signature + '</span>&apos;</div>';
			
			NI_Footer = NI_Footer + Notice_Content + NI_Signature_Box + '</div>';			
		} 		
	}

	document.getElementById ('notice-interceptor_footer_box').innerHTML = NI_Footer;	
}

function NtcIntrcptr_Notice_Mark_Read (Notice_ID, Notice_Types) {
	// Ставим метку: Read.	
	var Notice_Content;
	var Notice_Sign;
	var Notice_Detector;
	
	document.getElementById ('notice-interceptor_processing_id_' + Notice_ID).style.display = 'inline-block';
	
	Notice_Content 	= Notice_Hidden[Notice_ID - 1]['content'];
	Notice_Sign 	= Notice_Hidden[Notice_ID - 1]['sign'];
	Notice_Detector = Notice_Hidden[Notice_ID - 1]['detector'];

    Ajax_Data = {
        'action': 'ntcintrcptr',
        'id': Notice_ID,
        'notice': Notice_Content,
        'sign': Notice_Sign,
        'mode': 'mark_read',
		'detector': Notice_Detector
        };

	jQuery.ajax({
		type:"POST",
		url: Ajax_URL,
		dataType: 'json',
		data: Ajax_Data,
		cache: false,
		success: function(jsondata) {
			var Obj_Request = jsondata;						
					
			var Status 				= Obj_Request.status;
			var Answer 				= Obj_Request.answer;										
			var Notice_ID 			= Obj_Request.notice_id;

			if (Answer) {
				Notice_Hidden[Notice_ID - 1]['is_new'] = null;
				
				Count_Notice_New = Count_Notice_New - 1;
				
				document.getElementById ('notice-interceptor_info_new').innerHTML = 'New: ' + Count_Notice_New;
				
				if (Count_Notice_New == 0) {
					document.getElementById ('notice-interceptor_info_new').style.color = 'black';
					document.getElementById ('notice-interceptor_info_new').style.cursor = 'default';
					document.getElementById ('notice-interceptor_info_new').title = '';
					document.getElementById ('notice-interceptor_info_new').removeAttribute("onclick");
					
					NtcIntrcptr_Hide_Footer();
				}
				
				if (Notice_Types == 'hidden') {
					NtcIntrcptr_Show_Notice_Hiden();
				} else {
					NtcIntrcptr_Show_Notice_New();
				}
			}
		}
	});		
}

function NtcIntrcptr_Notice_Mark_UnRead (Notice_ID, Notice_Types) {
	// Ставим метку: UnRead.	
	var Notice_Content;
	var Notice_Sign;
	
	document.getElementById ('notice-interceptor_processing_id_' + Notice_ID).style.display = 'inline-block';
	
	Notice_Content 	= Notice_Hidden[Notice_ID - 1]['content'];
	Notice_Sign 	= Notice_Hidden[Notice_ID - 1]['sign'];

    Ajax_Data = {
        'action': 'ntcintrcptr',
        'id': Notice_ID,
        'notice': Notice_Content,
        'sign': Notice_Sign,
        'mode': 'mark_unread'
        };

	jQuery.ajax({
		type:"POST",
		url: Ajax_URL,
		dataType: 'json',
		data: Ajax_Data,
		cache: false,
		success: function(jsondata) {
			var Obj_Request = jsondata;						
					
			var Status 				= Obj_Request.status;
			var Answer 				= Obj_Request.answer;										
			var Notice_ID 			= Obj_Request.notice_id;

			if (Answer) {
				Notice_Hidden[Notice_ID - 1]['is_new'] = true;
				
				Count_Notice_New = Count_Notice_New + 1;
				
				if (Count_Notice_New == 1) {
					document.getElementById ('notice-interceptor_info_new').style.color = 'red';
					document.getElementById ('notice-interceptor_info_new').style.cursor = 'pointer';
					document.getElementById ('notice-interceptor_info_new').title = 'Click - to View';
					document.getElementById ('notice-interceptor_info_new').setAttribute("onclick","NtcIntrcptr_Show_Notice_New();");
				}				
				
				document.getElementById ('notice-interceptor_info_new').innerHTML = 'New: ' + Count_Notice_New;
				
				if (Notice_Types == 'hidden') {
					NtcIntrcptr_Show_Notice_Hiden();
				} else {
					NtcIntrcptr_Show_Notice_New();
				}
			}
		}
	});		
}

function NtcIntrcptr_Hide_Footer() {	
	document.getElementById ('notice-interceptor_info_hide').setAttribute('onclick','NtcIntrcptr_Show_Notice_Hiden()');
	document.getElementById ('notice-interceptor_info_new').setAttribute('onclick','NtcIntrcptr_Show_Notice_New()');
	
	document.getElementById ('notice-interceptor_footer').style.display = 'none';
}