<?php

return [

    'enabled' => true,

    'resources' => [
        'collections' => ['blog'],
        'taxonomies' => ['category'],
    ],

    'route' => 'api',

    'middleware' => 'api',

    'pagination_size' => 50,

    'cache' => [
        'expiry' => 60,
    ],

    'excluded_keys' => [],
];
