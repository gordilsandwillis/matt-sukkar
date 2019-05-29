<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'explore-page';

$image_array = get_field('image_gallery', $post);

shuffle($image_array);

// $first_twenty = array_slice($image_array, 0, 20);
// shuffle($first_twenty);
// $context['images'] = $first_twenty;


$context['images'] = $image_array;

// $chunk = array_chunk($image_array, 10);

// foreach($chunk as $chunk_array) {
// 	shuffle($chunk_array);
// }

// $context['images'] = array_merge(...$chunk);

Timber::render( 'explore.twig' , $context );