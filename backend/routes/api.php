<?php

use App\Http\Controllers\FoglalasokController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//Bejelentkezett user korábbi foglalás lekérdezés végpont
Route::middleware('auth:sanctum')->get('/foglalasaim/korabbi', [FoglalasokController::class, 'korabbiFoglalasok']);

//admin végpontok
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin-test', function () {
        return response()->json(['ok' => true]);
    });
});
