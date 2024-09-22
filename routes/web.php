<?php

use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use App\Models\Site;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    
    $sites = Site::all();

    $user = Auth::user();
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
    if ($user) {
        return inertia('Dashboard', ['packet' => $packet, 'user' => $user, 'sites' => $sites]);
    } else {
        return inertia('Home', ['packet' => $packet, 'user' => $user, 'sites' => $sites]);
    }
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
