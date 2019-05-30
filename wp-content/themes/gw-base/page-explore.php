<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'explore-page';

// $image_array = get_field('image_gallery', $post);
// shuffle($image_array);
// $context['images'] = $image_array;

$image_groups = get_field('image_group', $post);

$random_group = $image_groups[array_rand($image_groups)];

shuffle($random_group['image_gallery']);

$random_gallery = $random_group['image_gallery'];

$context['images'] = $random_gallery;

// echo '<pre>';
// var_dump($random_gallery);
// echo '</pre>';

Timber::render( 'explore.twig' , $context );