<?php

/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

</div><!-- #content -->

<footer id="colophon" class="site-footer footer" role="contentinfo">
	<nav class="footer__nav">
		<a href="<?php echo esc_url(home_url('/')); ?>about" class="footer__item">About</a>
		<a href="<?php echo esc_url(home_url('/')); ?>" class="footer__item">Archives</a>
		<a href="<?php echo esc_url(home_url('/')); ?>submit" class="footer__item">Submit a Quote</a>
		<p class="footer__item">Brought to you by <a href="">RED Academy</a></p>
	</nav>
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>