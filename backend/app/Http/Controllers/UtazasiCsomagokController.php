<?php

namespace App\Http\Controllers;

use App\Models\UtazasiCsomagok;
use App\Http\Requests\StoreUtazasiCsomagokRequest;
use App\Http\Requests\UpdateUtazasiCsomagokRequest;

class UtazasiCsomagokController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UtazasiCsomagok::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUtazasi_csomagokRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Utazasi_csomagok $utazasi_csomagok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUtazasi_csomagokRequest $request, Utazasi_csomagok $utazasi_csomagok)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utazasi_csomagok $utazasi_csomagok)
    {
        //
    }
}
