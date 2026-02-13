<?php

use App\Http\Controllers\FelhsznaloController;
use App\Http\Controllers\FoglalasokController;
use App\Http\Controllers\UtazasiCsomagokController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//User
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Utazasok
Route::get('/utazasi_csomagoks',[UtazasiCsomagokController::class,'index']);
Route::post('/utazasi-csomagok', [UtazasiCsomagokController::class, 'store']);

//Foglalasok
Route::get('/foglalasok', [FoglalasokController::class, 'index']);
Route::post('/foglalasok', [FoglalasokController::class, 'store']);
