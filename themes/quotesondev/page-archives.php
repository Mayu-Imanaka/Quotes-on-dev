<?php

/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */
$all_posts = new WP_Query(array('post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1));
get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main archives" role="main">
        <header class="entry-header">
            <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
        </header><!-- .entry-header -->
        <h3>Quote Authors</h3>
        <ul class="archives__list">
            <?php while ($all_posts->have_posts()) : $all_posts->the_post(); ?>
                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
            <?php endwhile; ?>
        </ul>

        <h3>Categories</h3>
        <ul class="archives__list">
            <?php
            $args = array(
                'orderby' => 'name',
                'order' => 'ASC'
            );
            $categories = get_categories($args);

            foreach ($categories as $category) {
                echo '<li><a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a> </li> ';
            }
            ?>
            <?php wp_list_categories('title_li=') ?>
        </ul>

        <h3>Tags</h3>
        <ul class="archives__list">
            <?php
            $args = array(
                'orderby' => 'name',
                'order' => 'ASC'
            );
            $posttags = get_tags($args);

            if ($posttags) {
                foreach ($posttags as $tag) {
                    echo '<li><a href="' . get_tag_link($tag->term_id) . '">' . $tag->name . '</a></li>';
                }
            }
            ?>
        </ul>


    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>