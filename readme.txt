=== Notice Interceptor ===
Contributors: WPGear
Donate link: wpgear.xyz/notice-interceptor/
Tags: notice, interceptor, dashboard, clearing, block ad, notices, dismiss, hide, license, invalid license, admin
Requires at least: 4.1
Tested up to: 6.3.1
Requires PHP: 5.4
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Stable tag: 4.24

Tool for creating a comfortable living environment in the Admin area without annoying notifications and ad units.

== Description ==

The Notice Interceptor is a development of the previous highly specialized Plugin: "Dismiss Grity Notices".

Tool for creating a comfortable living environment in the WordPress admin area without annoying notifications and ad units.

For some reason, many developers of Themes and Plugins believe that they just need to remind the Administrator of their existence every minute. Intrusive and obsessive offers to subscribe somewhere, buy something, like, poke something, etc. 
And even the presence of the "disable" button does not guarantee that after a new entrance to the Admin panel, all this jumble of information garbage will not creep out again and will not take over part of the working space of the monitor screen.

The concept of this tool is to remove all unnecessary, but give an opportunity to manage this Information Garbage. It is possible that under certain circumstances something from all this is really necessary and useful. And you just know where you have it, on which shelf. You reach out and take it, study it. And then you put it away again so it doesn't get in the way.

How it works:

There is a pre-installed set of CSS Classes of popular Notifications Blocks in the Admin Dashboard. It will be updated from time to time.
It is possible to independently supplement this set of CSS Classes without waiting for updates based on their own situations.
Both sets of CSS Classes are combined together to form the rules for blocking Information Blocks. Fixing every block.

On each of the pages of the Admin Dashboard, depending on which Information Blocks were hidden, an Indicator is formed showing the number of Hidden Information Blocks. With the ability to see these Hidden Blocks.

Each of these Information Blocks can be marked as "Viewed". In this case, in the Indicator these Blocks will be grouped as "Hide".

New UnRead Information Blocks will be grouped as "New".

Therefore, you can always easily understand that there are New Notifications that you need to familiarize yourself with. But now, it is enough to do it only once!

= Futured =
* Notice Interceptor curent version include Rules:
WP-Core

Plugins:
	All in One SEO Pack
	Coming Soon Supsystic
	Duplicator PRO
	EnvatoMarket (NinjaTeam)
	Fix Duplicates
	iThemes Security
	Gravity Forms
	GravityView
	GravityFlow 
	MetaSlider
	MonsterInsights
	My Maps	
	RSS Mailchimp
	StCR (Subscribe Reloaded)
	TablePress
	Ultimate Member
	UpdraftPlus	
	WooCommerce
	WP Google Fonts
	WP Mail SMTP
	WP to Twitter
	Yellow Pencil

Themes:
	Theme Padma


== Installation ==

1. Upload 'notice-interceptor' folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. If you have any problems - please ask for support. 

== Frequently Asked Questions ==

How to write your CSS Class Sets correctly:
* To avoid accidental erroneous actions, you should enter the full set of classes of the notification block that you want to block. For example, here is such an annoying Information Block:

&lt;div <span style="font-weight: bold;">class="<span style="color: brown;">notice notice-warning settings-error is-dismissible</span>"</span>&gt;You have a newer version WordPress 999.01 than it can be!&lt;a href="//wp-admin/update-core.php" aria-label="Please update WordPress now"&gt;Please update&lt;/a&gt;.&lt;/div&gt;

We need to take the complete line of the class attribute from this block: notice notice-warning settings-error is-dismissible

And paste into the "Custom Rules" field. Without changing anything. Leaving spaces and not changing the order of the Classes. In this case, this string will be as a signature defining a specific Information Block.

* Also, you can add ID instead of Class.
** Attention! Be careful. Should not use the "General for all" Classes. Like: "updated", "notice", "error", e.t.c.

In general, I would like to hope that in the next new version of WordPress there will be a requirement for Plugins and Themes so that Notifications are issued according to certain Rules.

== Screenshots ==
 
1. screenshot-1.png This is the Admin Dashboard with plugin "Notice Interceptor".
2. screenshot-2.png This is the "Notice Interceptor" Options page with opened Hiddens Notices.
3. screenshot-3.png This is the "Notice Interceptor" Options page.

== Changelog ==
= 4.24 =
	2023.09.11
	* Tested WP up to: 6.3.1
	* Tested PHP up to: 7.4.3
	* Fixed "Custom Rules"
	* Fixed Admin Style/Script Loader
	
= 4.23 =
	2022.06.17
	* Fixed JS Warning:  document.createAttribute() is deprecated. Use element.setAttribute() instead.
	* Fixed JS Warning:  setAttributeNode() is deprecated. Use setAttribute() instead.
	
= 4.22 =
	2022.06.16
	* Tested WP up to: 6.0
	* Tested PHP up to: 7.4
	* Fixed PHP Warning:  Invalid argument supplied for foreach()	
	
= 4.21 =
	2021.04.16
	* "Hide" & "New" clicks now toggle show / hide.
	* Fixed changing the width of the indicator panel during initialization.
	
= 4.20 =
	2021.04.14
	* Internal scripts rewritten. Instead of a series of single queries, only one is now executed. The processing speed has increased many times over. This is especially noticeable on "long lists" such as the Plugins page.
	* On those Admin pages where the top Panel "screen-meta-links" is displayed, the "Notice Interceptor" tab is also displayed in this Panel. Now, such pages don't "twitch" at all!
	* Update Rules for WP-Core
	* Update Rules for Plagins: GravityView, MonsterInsights
	* Add Rules for Plagins: Coming Soon Supsystic
	
= 3.19 =
	2021.04.11
	* Remove AutoHideCSS after uninstalling a plugin.
	
= 3.18 =
	2021.04.07
	* Fix check if exist notice_autohide.css.
	
= 3.17 =
	2021.04.07
	* Rules marked as Read are added to the notice_autohide.css file. Such Notifications are hidden completely. Become really comfortable.
	* Update Rules for WP-Core
	* Set absolute Version numeration.
	
= 2.5 =
	2021.04.07
	* Update Rules for Plagins: RSS Mailchimp 
	
= 2.4 =
	2021.04.07
	* Added handling of especially harmful notifications.
	* Add Rules for Plagins: RSS Mailchimp, Fix Duplicates, StCR (Subscribe Reloaded), TablePress, MetaSlider
	
= 2.3 =
	2021.04.05
	* Remove Debuggin cod.
	
= 2.2 =
	2021.04.05
	* Fix Global JS conflict with WooCommerce.
	* Add Rules for Plagins: WooCommerce, EnvatoMarket (NinjaTeam)
	* Update Rules for Plagins: All in One SEO Pack, MonsterInsights, Gravity Forms	
	
= 2.1 =
	2021.04.02
	* Change plugin description.
	
= 2.0 =
	2021.04.02
	* Now, you can add not only the Class, but also the ID of the Notification Blocks.
	* Add Rules for Plagins: WP Google Fonts, UpdraftPlus
	* Remove Debuggin cod.
	
= 1.8 =
	2021.04.01
	* Fix slashes handling.
	
= 1.7 =
	2021.03.29
	* Add Rules for Plagins: Duplicator PRO
	* Updates Rules for: WP-Core
	* Updates Rules for Plagins: Yellow Pencil, Gravity Forms
	* Delete Rules for Plagins: GravityView
	
= 1.6 =
	2021.03.28
	* Add option "Enable this Page for Admin only". (Setup Page).	
	
= 1.5 =
	2021.03.27
	* Add Rules for Plagins: All in One SEO Pack, iThemes Security, MonsterInsights, My Maps, WP Mail SMTP, WP to Twitter, Gravity Forms
	* Fix Intercepting for Classes with trailing spaces. Like: Class="somthing ";
	
= 1.4 =
	2021.03.26
	* Slight improvement in internal structure.
	* Fixed errors of functioning, after correcting the requirements of the publication.
	
= 1.3 =
	2021.03.26
	* Corrected for the requirements of the Plugin.
	
= 1.2 =
	2021.03.25
	* Corrected for the requirements of the Plugin.
	
= 1.1 =
	2021.03.25
	* Corrected for the requirements of the Plugin.
	
= 1.0 =
	2021.03.23
	* Initial release
	
	
== Upgrade Notice ==
= 4.20 =
	*Strong recommend!

= 2.2 =
	*Strong recommend!