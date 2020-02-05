<?php

/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<header class="entry-header">
				<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
			</header><!-- .entry-header -->
			<?php if (is_user_logged_in()) : ?>
				<div class="entry-content">
					<?php echo do_shortcode('[contact-form-7 id="214" title="Submit a quote"]'); ?>
				</div><!-- .entry-content -->
			<?php else : ?>
				<p>Sorry, you must be logged in to submit a quote!</p>
				<a href="<?php echo esc_url(home_url('/')); ?>admin">Click here to login.</a>
			<?php endif; ?>
		</article><!-- #post-## -->


	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>