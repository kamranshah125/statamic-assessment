<?php

use Illuminate\Support\Facades\Route;
Route::view('/blog', 'blog');
use Statamic\Facades\Entry;

Route::get('/debug-blog', function () {
    return Entry::query()
        ->where('collection', 'blog')
        ->where('published', true)
        ->get()
        ->map(function ($entry) {
            return [
                'title' => $entry->get('title'),
                'slug' => $entry->slug(),
                'date' => $entry->date()?->toDateString(),
                'published' => $entry->published(),
            ];
        });
});


// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);
