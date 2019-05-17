<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['body_class'] = 'contact-page';
Timber::render( 'contact.twig' , $context );
