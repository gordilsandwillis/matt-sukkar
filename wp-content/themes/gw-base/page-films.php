<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['is_front_page'] = 'true';
$context['body_class'] = 'films-page';

$video_array = get_field('videos', $post);
$video_categories = array();
$all_categories = array();

foreach ( $video_array as $v) {
	$category = $v['category'];
	array_push($video_categories, $category);
}

foreach ( $video_categories as $cat) {
	if (is_array($cat)){
		foreach ( $cat as $c ){
			if (isset($c->term_id)){
				$catego = array("id"=> $c->term_id, "name"=> $c->name);
				array_push($all_categories, $catego);
			}
		}
	} else {
		if (isset($cat->term_id)){
			$gories = array("id"=> $cat->term_id, "name"=>$cat->name);
			array_push($all_categories, $gories);
		}
	}
}
$context['all_categories'] = array_unique($all_categories, SORT_REGULAR);
// $context['all_categories'] = $all_categories;

// echo '<pre>';
// var_dump($video_array);
// // // var_dump($video_categories);
// // var_dump($all_categories);
// echo '</pre>';

Timber::render( 'films.twig' , $context );
