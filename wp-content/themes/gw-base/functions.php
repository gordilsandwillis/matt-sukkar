<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class GW extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support('thumbnail');
		add_theme_support( 'post-thumbnails' );
			// General Sizes
			add_image_size( 'gw-sm', 750 );
      add_image_size( 'gw-1000', 1000 );
      add_image_size( 'gw-md', 1200 );
      add_image_size( 'gw-lg', 1500 );
      add_image_size( 'gw-xlg', 2000 );
      	// 3:2 Crops
				add_image_size( 'gw-sm-3-2', 750, 500, true );
				add_image_size( 'gw-md-3-2', 1200, 800, true );
				add_image_size( 'gw-lg-3-2', 1500, 1000, true );
				add_image_size( 'gw-xlg-3-2', 2001, 1334, true );
				// 2:3 Crops
				add_image_size( 'gw-sm-2-3', 750, 1125, true );
				add_image_size( 'gw-md-2-3', 1000, 1500, true );
				add_image_size( 'gw-lg-2-3', 1200, 1800, true );
				add_image_size( 'gw-xlg-2-3', 1334, 2001, true );
				// 16:9 Crops
				add_image_size( 'gw-sm-16-9', 400, 225, true );
				add_image_size( 'gw-md-16-9', 800, 450, true );
				add_image_size( 'gw-lg-16-9', 1200, 675, true );
				add_image_size( 'gw-xlg-16-9', 1600, 900, true );
				// Square Crops
				add_image_size( 'gw-sm-sq', 750, 750, true );
				add_image_size( 'gw-md-sq', 1000, 1000, true );
				add_image_size( 'gw-lg-sq', 1200, 1200, true );
				add_image_size( 'gw-xlg-sq', 1500, 1500, true );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		parent::__construct();
	}

	function add_to_context( $context ) {
		$context['main_navigation'] = new TimberMenu('main-navigation');
		$context['header_menu'] = new TimberMenu('header-menu');
    $context['footer_menu'] = new TimberMenu('footer-menu');

		$context['site'] = $this;
		$context['td'] = get_template_directory_uri();
		$context['options'] = get_fields('options');
		$context['request'] = $_REQUEST;
		$context['globals'] = array(
      // 'siteTitle' => 'The Site Title',
    );
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));

		$get_instagrams = new Twig_SimpleFunction('get_instagrams', function () {
      $access_token = '516151050.2a52133.7181358f4ab44e4790c70cef53bb12ad';
      $user_id = '516151050';
      $count = 8;
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "https://api.instagram.com/v1/users/$user_id/media/recent?access_token=$access_token&count=$count");
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      $data = curl_exec($ch);
      curl_close($ch);
      return json_decode($data)->data;
      // Getting Access Token
      // instagram.com/developer. Manage Clients > Register a New Client
      // OAuth redirect_uri : http://localhost
      // uncheck Disable implicit OAuth
      // go to: https://instagram.com/oauth/authorize/?client_id=[CLIENT_ID_HERE]&redirect_uri=http://localhost&response_type=token
		});
    $twig->addFunction($get_instagrams);

		return $twig;
	}
}

// Change Featured Image Crop
function get_image_src( $object, $field_name, $request ) {
    $size = 'gw-sm'; // Change this to the size you want | 'medium' / 'large'
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], $size, true);
    return $feat_img_array[0];
}

// Add Options Page
if (function_exists('acf_add_options_page')) {
  acf_add_options_page('Options');
  acf_add_options_page('Admin Options');
}

//Add Featured Image to Rest API
function add_thumbnail_to_JSON() {
register_rest_field( 'post',
    'featured_image_src', //NAME OF THE NEW FIELD TO BE ADDED - you can call this anything
    array(
        'get_callback'    => 'get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}
add_action( 'rest_api_init', 'add_thumbnail_to_JSON' );

function default_attachment_display_settings() {
  update_option( 'image_default_align', 'right' );
  update_option( 'image_default_link_type', 'attachment page' );
  update_option( 'image_default_size', 'full' );
}
add_action( 'after_setup_theme', 'default_attachment_display_settings' );

new GW();
