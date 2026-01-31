<?php

use App\Http\Controllers\FelhsznaloController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/felhsznalo',[FelhsznaloController::class,'index']);