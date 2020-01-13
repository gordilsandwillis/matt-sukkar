<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'photography-page';
$image_array = get_field('image_gallery', $post);

Timber::render( 'photography.twig' , $context );