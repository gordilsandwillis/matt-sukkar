<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'explore-page';

// $image_array = get_field('image_gallery', $post);
// shuffle($image_array);
// $context['images'] = $image_array;

// $image_groups = get_field('image_group', $post);

// $random_group = $image_groups[array_rand($image_groups)];

// shuffle($random_group['image_gallery']);

// $random_gallery = $random_group['image_gallery'];

// $context['images'] = $random_gallery;



// $random_index = mt_rand(0,8);

// $group_field_object = get_field_object('image_group');

// $random_group_gallery = $group_field_object['value'][$random_index]['image_gallery'];

// shuffle($random_group_gallery);

// $random_gallery = $random_group_gallery;


// $random_index = mt_rand(1,10);

// $random_field = 'image_group_'.$random_index;
// $random_gallery = get_field($random_field, $post);
// shuffle($random_gallery);



// COOOKIES 

if (isset($_COOKIE["explore_cook"]) && count(json_decode($_COOKIE['explore_cook'])) == 10){
	$random_index = mt_rand(1,10);
  $init_value = array($random_index);
  $init_value = json_encode($init_value, true);
  setcookie('explore_cook', $init_value, time()+3600);
} else {

	if (!isset($_COOKIE["explore_cook"]) ) {
	  // Set cookie to current value

		$random_index = mt_rand(1,10);
	  $init_value = array($random_index);
	  $init_value = json_encode($init_value, true);
	  setcookie('explore_cook', $init_value, time()+3600);

	} else {
	  // Get cookie value
	  $prev_value = $_COOKIE["explore_cook"];
	  $prev_value = stripslashes($prev_value);
	  $prev_value = json_decode($prev_value, true);

	  // Add truly random value to array and set cookie again
	  $blacklist = $prev_value;
		$range = range(1, 10);
		$randomArray = array_diff($range, $blacklist);
		$random_index = $randomArray[array_rand($randomArray, 1)];

		array_push($prev_value, $random_index);

	  $new_value = json_encode($prev_value, true);
	  setcookie('explore_cook', $new_value, time()+3600);

	  if ( count($prev_value) == 10 ){
  		$context['explore_finish'] = true;
  		// setcookie('explore_cook', '', time() - 3600);
  	}

	}
}

$random_field = 'image_group_'.$random_index;
$random_gallery = get_field($random_field, $post);
shuffle($random_gallery);


// $blacklist = $_SESSION['explore_index'];
// $range = range(1, 10);
// $randomArray = array_diff($range, $blacklist);
// $random_index = $randomArray[array_rand($randomArray, 1)];

// array_push($_SESSION['explore_index'], $random_index);
// $random_field = 'image_group_'.$random_index;
// $random_gallery = get_field($random_field, $post);
// shuffle($random_gallery);

// if (count(json_decode($_COOKIE["explore_cook"])) == 10) {
// 	$context['explore_finish'] = true;
// }

$context['explore_finish_text'] = get_field('explore_page_message', $post);

$context['images'] = $random_gallery;


Timber::render( 'explore.twig' , $context );