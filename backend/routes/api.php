<?php

use App\Http\Controllers\FelhsznaloController;
use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\KepekController;
use App\Http\Controllers\LastMArController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UtazasiCsomagokController;
use App\Http\Controllers\UtazasiModController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\FoglalasokController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


//Publikus végpontok
//Utazasok
Route::get('/utazasi_csomagoks',[UtazasiCsomagokController::class,'index']);
//Route::post('/utazasi-csomagok', [UtazasiCsomagokController::class, 'store']);
Route::get('/utazasi_csomagoks/{id}', [UtazasiCsomagokController::class,'show']);


//Foglalasok
Route::get('/foglalasok', [FoglalasokController::class, 'index']);
Route::post('/foglalasok', [FoglalasokController::class, 'store']);

//Users
//Route::get('/users', [UserController::class, 'index']);
//Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);

//Kepek
Route::get('/kepeks', [KepekController::class, 'index']);
Route::post('/kepeks', [KepekController::class, 'index']);

//Helyszinek
Route::get('/helyszins', [HelyszinController::class, 'index']);
Route::post('/helyszins', [HelyszinController::class, 'index']);

//Utazasi_modok
Route::get('/utazasi_mods', [UtazasiModController::class, 'index']);
Route::post('/utazasi_mods', [UtazasiModController::class, 'index']);


//admin végpontok
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin-test', function () {
        return response()->json(['ok' => true]);
    });
    Route::post('/utazasi-csomagok', [UtazasiCsomagokController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
    Route::patch('/users/{user}/role', [UserController::class, 'updateRole']);


    //edithez: 
     Route::put('/utazasi_csomagoks/{id}', [UtazasiCsomagokController::class, 'update']);
});

//Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');

//Bejelentkezett user korábbi foglalás lekérdezés végpont
Route::middleware('auth:sanctum')->get('/foglalasaim', [FoglalasokController::class, 'sajatFoglalasok']);

//fizeteshez
Route::middleware('auth:sanctum')->post('/foglalasok/checkout', [FoglalasokController::class, 'checkout']);

//UtazasaimListahoz:
Route::middleware('auth:sanctum')->get('/utazasaim', [FoglalasokController::class, 'utazasaim']);


