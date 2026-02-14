<?php

namespace App\Http\Controllers;

use App\Models\Utazasi_mod;
use App\Http\Requests\StoreUtazasi_modRequest;
use App\Http\Requests\UpdateUtazasi_modRequest;

class UtazasiModController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Utazasi_mod::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUtazasi_modRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Utazasi_mod $utazasi_mod)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUtazasi_modRequest $request, Utazasi_mod $utazasi_mod)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utazasi_mod $utazasi_mod)
    {
        //
    }
}
