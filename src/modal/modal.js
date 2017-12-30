/**
 * Created by vd on 30/12/17.
 */
'use strict';
;$(function () {
    'use strict';
    $('.modal-close').click(function () {
        $('.modal').removeClass('is-active');
    });

    $('.modal-button').click(function () {
        $('.modal').addClass('is-active');
    });
});