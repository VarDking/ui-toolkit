/**
 * Created by vd on 12/12/17.
 */
;$(function () {
    'use strict';
    $('.navbar-nav li').click(function () {
        $('.active').not($(this)).removeClass('active');
        $(this).toggleClass('active');
        event.stopPropagation();
    });

    // Mobile navigation
    $('.nav-trigger').on('click', function () {
        var nav     = $('.nav-group');
        var trigger = $('.nav-trigger');

        trigger.toggleClass('active');
        nav.toggleClass('active');
    });
});