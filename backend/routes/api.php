<?php

use App\Http\Controllers\FelhsznaloController;
use App\Http\Controllers\FoglalasokController;
use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\KepekController;
use App\Http\Controllers\LastMArController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UtazasiCsomagokController;
use App\Http\Controllers\UtazasiModController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//User
Route::get('/users', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Utazasok
Route::get('/utazasi_csomagoks',[UtazasiCsomagokController::class,'index']);
Route::post('/utazasi-csomagok', [UtazasiCsomagokController::class, 'store']);

//Foglalasok
Route::get('/foglalasok', [FoglalasokController::class, 'index']);
Route::post('/foglalasok', [FoglalasokController::class, 'store']);

//Users
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

//LastMinute-ok
Route::get('/last_m_ars', [LastMArController::class, 'index']);
Route::Post('/last_m_ars', [LastMArController::class, 'store']);

//Kepek
Route::get('/kepeks', [KepekController::class, 'index']);
Route::post('/kepeks', [KepekController::class, 'index']);

//Helyszinek
Route::get('/helyszins', [HelyszinController::class, 'index']);
Route::post('/helyszins', [HelyszinController::class, 'index']);

//Utazasi_modok
Route::get('/utazasi_mods', [UtazasiModController::class, 'index']);
Route::post('/utazasi_mods', [UtazasiModController::class, 'index']);
