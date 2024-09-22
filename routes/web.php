<?php

use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $packet = [
        'packet_name' => 'Promo Merdeka',
        'detail' => [
            ['speed' => 10, 'price' => 150000],
            ['speed' => 15, 'price' => 160000],
            ['speed' => 20, 'price' => 185000],
            ['speed' => 30, 'price' => 200000],
            ['speed' => 50, 'price' => 250000],
        ]
    ];
    return inertia('Home', ['packet' => $packet]);
});

Route::resource('request', RequestController::class);

Route::get('/crud', function () {
    return inertia('Crud');
});

Route::get('/leaflet', function () {
    return inertia('Leaflet');
});

Route::get('/register-req', function () {
    return inertia('Registration');
});
Route::get('/tryosm', function () {
    return inertia('Osm');
});
Route::get('/circle', function () {
    return inertia('TryCircle');
});

Route::post('login/sent', [UserController::class, 'login']);

Route::get('login', [UserController::class, 'showlogin']);

Route::post('/regis/sent', [UserController::class, 'register']);

Route::get('register', [UserController::class, 'showreg']);
