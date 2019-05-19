<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'explore-page';

$image_array = get_field('image_gallery', $post);

shuffle($image_array);

$context['images'] = $image_array;

Timber::render( 'explore.twig' , $context );
