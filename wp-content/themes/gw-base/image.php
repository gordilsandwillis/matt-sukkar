<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
// $context['img_src'] = $post->custom['_wp_attached_file'];
$context['img_src'] = $post->guid;
$context['img_title'] = $post->post_title;
$context['img_caption'] = $post->post_excerpt;
$context['img_description'] = $post->post_content;

Timber::render( 'image.twig', $context );
