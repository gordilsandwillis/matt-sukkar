<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['work_page'] = new TimberPost(9);
$context['body_class'] = 'home-page';
$high = array(
	'post_type' => 'projects',
	'posts_per_page' => -1,
	'orderby' => 'menu_order',
	'order' => 'ASC',
	'post__not_in' => array($post_id)
);
$context['projects'] = Timber::get_posts($high);
Timber::render( 'home.twig' , $context );
