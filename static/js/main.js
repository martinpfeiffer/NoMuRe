require.config({
    baseUrl: '/static/js',
    paths: {
        'foundation': 'foundation.min',
        '$tmpl': 'require/$tmpl',
        '$ready': 'require/$ready',
        'jquery': 'vendor/jquery'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'foundation': {
            deps: ['jquery']
        },
        'foundation.orbit': {
            deps: ['foundation']
        }
    }
});

define([
    'jquery',
    'foundation',
    '$ready!'
], function ($) {
    $(document).foundation();
    $('.basketbutton').on('click', function (evt) {
        evt.preventDefault();
        $('.fa-shopping-cart').addClass('fa-spin');
    });
});