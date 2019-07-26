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

// $_SESSION['explore_index'] = array();

// $random_index = mt_rand(1,10);

// if (in_array($random_index, $_SESSION['explore_index'])) {
// 	$random_index = mt_rand(1,10);
// }


// do {
// 	$random_index = mt_rand(1,10);
// } while (in_array($random_index, $_SESSION['explore_index']));
// $_SESSION['explore_index'] = array();


$blacklist = $_SESSION['explore_index'];
$range = range(1, 10);
$randomArray = array_diff($range, $blacklist);
$random_index = $randomArray[array_rand($randomArray, 1)];

array_push($_SESSION['explore_index'], $random_index);
$random_field = 'image_group_'.$random_index;
$random_gallery = get_field($random_field, $post);
shuffle($random_gallery);



// while (!in_array($random_index, $_SESSION['explore_index'])){
// 	array_push($_SESSION['explore_index'], $random_index);
//   $random_field = 'image_group_'.$random_index;
// 	$random_gallery = get_field($random_field, $post);
// 	shuffle($random_gallery);
// }

// if ( in_array($random_index, $_SESSION['explore_index'])){
// 	$random_index = mt_rand(1,10);
// } else {
// 	array_push($_SESSION['explore_index'], $random_index);
// 	$random_field = 'image_group_'.$random_index;
// 	$random_gallery = get_field($random_field, $post);
// 	shuffle($random_gallery);
// }

// $key = true;

// while($key){
//     // Do stuff
// 	array_push($_SESSION['explore_index'], $random_index);
//   $random_field = 'image_group_'.$random_index;
// 	$random_gallery = get_field($random_field, $post);
// 	shuffle($random_gallery);
  
//   if(in_array($random_index, $_SESSION['explore_index'])) {
//   	$key = false;
//   }
// }
if (count($_SESSION['explore_index']) == 10) {
	$context['explore_finish'] = true;
}

$context['images'] = $random_gallery;

// if (count($_SESSION['explore_index']) == 10) {
// 	$_SESSION['explore_index'] = array();
// }

echo '<pre>';
// var_dump($random_index);
// var_dump($_SESSION['explore_index']);
var_dump(count($_SESSION['explore_index']));
// var_dump($group_field_object['value'][$random_index]);
// var_dump($random_index);
echo '</pre>';

Timber::render( 'explore.twig' , $context );