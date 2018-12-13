<?php 
if (!defined('ABSPATH')) exit(); 
// Plugin Name: GW Admin Styles 2
// Plugin URI: http://gordilsandwillis.com/
// Description: Gordils & Willis custom admin styles for the WordPress dashboard
// Version: 1.0
// Author: Gordils & Willis
// Author URI: http://gordilsandwillis.com/

function set_login_url() {
  return get_bloginfo('url');
}

function hyperstyles(){
  include(plugin_dir_path(__FILE__)."styles.php");
} 

function include_options(){
  include(plugin_dir_path(__FILE__)."settings.php");
}

function rich_text_editor_style() {
    add_editor_style( plugin_dir_url( __FILE__ ) . 'assets/css/editor.css' );
}
add_action( 'init', 'rich_text_editor_style' );

function load_scripts() {
  wp_register_script('hyper_js', plugin_dir_url( __FILE__ ) . 'assets/js/hyperpress.js', array('jquery','wp-color-picker' ), false, true);
  wp_enqueue_script('hyper_js');
  wp_enqueue_style('wp-color-picker');
}

function register_settings() {
  $fields = array('widget_links','login_logo','primary_color','darker_color');
  foreach ($fields as $name):
    register_setting('hypersettings', $name);
  endforeach;
}

function add_hypersettings() {
  // add_menu_page( 'Home', 'Home', 'edit_posts', '../', '', NULL, -1);
  // add_options_page('HyperPress Settings', 'Hyperpress', 'manage_options', 'hypersettings', 'include_options');

}

if (is_admin()):
  add_action('admin_init', 'register_settings');
  add_action('admin_menu', 'add_hypersettings');
  add_action('admin_enqueue_scripts', 'wp_enqueue_media');
  add_action('admin_enqueue_scripts', 'load_scripts');
  add_action('admin_head', 'hyperstyles');
endif;

add_action('login_head', 'hyperstyles');
add_action( 'login_headerurl', 'set_login_url'); // set Login Logo as site URL

// Thumbnails to admin post view
// Add the posts and pages columns filter. They can both use the same function.
add_filter('manage_pages_columns', 'thumbnail_column', 1);
// This theme uses post thumbnails
add_theme_support( 'post-thumbnails' );
add_image_size( 'post-thumb', 100, 100, true);

// Add the column
function add_post_thumbnail_column($cols){
  $cols['post_thumb'] = __('Featured');
  return $cols;
}

add_filter('manage_posts_columns', 'thumbnail_column');
function thumbnail_column($columns) {
  $new = array();
  foreach($columns as $key => $title) {
    if ($key=='title') // Put the Thumbnail column before the Author column
      $new['post_thumb'] = 'Thumbnail';
    $new[$key] = $title;
  }
  return $new;
}

// Hook into the posts an pages column managing. Sharing function callback again.
add_action('manage_posts_custom_column', 'display_post_thumbnail_column', 1, 2);
add_action('manage_pages_custom_column', 'display_post_thumbnail_column', 1, 2);


// Grab featured-thumbnail size post thumbnail and display it.
function display_post_thumbnail_column($col, $id){
  switch($col){
    case 'post_thumb':
      if( function_exists('the_post_thumbnail') )
        echo the_post_thumbnail( 'post-thumb' );
      else
        echo 'Not supported in theme';
      break;
  }
}

add_action( 'admin_footer', 'add_logout' );


function add_logout(){
  // echo '<a class="hyperpress-logout" href="'.wp_logout_url().'" title="Logout">Log Out</a>';
}

function remove_dashboard_meta() {
        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_primary', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');//since 3.8
}
add_action( 'admin_init', 'remove_dashboard_meta' );
/**
* Add a widget to the dashboard.
*
* This function is hooked into the 'wp_dashboard_setup' action below.
*/
function add_dashboard_widgets() {
  wp_add_dashboard_widget( 'dashboard_widget', 'Quick Links', 'dashboard_widget_function' );
  
  // Globalize the metaboxes array, this holds all the widgets for wp-admin
 
  global $wp_meta_boxes;
  
  // Get the regular dashboard widgets array 
  // (which has our new widget already but at the end)
 
  $normal_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];
  
  // Backup and delete our new dashboard widget from the end of the array
 
  $widget_backup = array( 'dashboard_widget' => $normal_dashboard['dashboard_widget'] );
  unset( $normal_dashboard['dashboard_widget'] );
 
  // Merge the two arrays together so our widget is at the beginning
 
  $sorted_dashboard = array_merge( $widget_backup, $normal_dashboard );
 
  // Save the sorted array back into the original metaboxes 
 
  $wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;
} 
add_action( 'wp_dashboard_setup', 'add_dashboard_widgets' );

/**
* Create the function to output the contents of our Dashboard Widget.
*/
function dashboard_widget_function() {
echo '<ul class="gw-quicklinks-widget">';
$links = get_field('gw_admin_quicklinks', 'option');
if ($links):
  foreach ($links as $link):
    if ($link['link_title']):
    echo '<li class="gw-quicklink"><a href="/wp-admin/'.$link['link'].'"><div class="material-icon md-24">' . $link["icon"] . '</div><span class="label">' . $link["link_title"] . '</span><div class="material-icon md-24 right">keyboard_arrow_right</div></a></li>';
    endif;
  endforeach;
endif;
echo '</ul>';
}
// Disable Admin Bar for everyone
if (!function_exists('df_disable_admin_bar')) {

	function df_disable_admin_bar() {
		
		// for the admin page
		remove_action('admin_footer', 'wp_admin_bar_render', 1000);
		// for the front-end
		remove_action('wp_footer', 'wp_admin_bar_render', 1000);
	  	
		// css override for the admin page
		function remove_admin_bar_style_backend() { 
			echo '<style>body.admin-bar #wpcontent, body.admin-bar #adminmenu { padding-top: 0px !important; }</style>';
		}	  
		add_filter('admin_head','remove_admin_bar_style_backend');
		
		// css override for the frontend
		function remove_admin_bar_style_frontend() {
			echo '<style type="text/css" media="screen">
			html { margin-top: 0px !important; }
			* html body { margin-top: 0px !important; }
			</style>';
		}
		add_filter('wp_head','remove_admin_bar_style_frontend', 99);
  	}
}
add_action('init','df_disable_admin_bar');
?>