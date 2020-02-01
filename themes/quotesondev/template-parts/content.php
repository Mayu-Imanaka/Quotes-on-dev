<?php

/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */
$source = get_post_meta(get_the_ID(), '_qod_quote_source', true);
$source_url = get_post_meta(get_the_ID(), '_qod_quote_source_url', true);
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->
	<div class="entry-meta">
		<div class="quote-author">－ <?php the_title() ?></div>
		<?php if ($source && $source_url) : ?>
			<span class="quote-source">, <a href="<?php echo $source_url ?>"><?php echo $source ?></a></span>
		<?php elseif ($source) : ?>
			<span class="quote-source"><?php echo $source ?></span>
		<?php else : ?>
			<span class="quote-source"><span>
				<?php endif; ?>
	</div>
</article><!-- #post-## -->
<?php if (is_home() || is_single()) : ?>
	<div class="btn">
		<button type="button" id="btn-another" class="btn-green">Show Me Another</button>
	</div>
<?php endif; ?>