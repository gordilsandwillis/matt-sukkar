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
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
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
		return $twig;
	}
}

// Change Featured Image Crop
function get_image_src( $object, $field_name, $request ) {
    $size = 'gw-sm'; // Change this to the size you want | 'medium' / 'large'
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], $size, true);
    return $feat_img_array[0];
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

new GW();
