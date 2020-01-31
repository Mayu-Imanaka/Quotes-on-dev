<?php

/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
<?php if (is_home() || is_single()) : ?>
	<div class="btn">
		<button type="button" id="btn-another" class="btn-green">Show Me Another</button>
	</div>
<?php endif; ?>