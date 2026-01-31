<?php

namespace App\Http\Controllers;

use App\Models\Felhsznalo;
use App\Http\Requests\StoreFelhsznaloRequest;
use App\Http\Requests\UpdateFelhsznaloRequest;


class FelhsznaloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Felhsznalo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFelhsznaloRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Felhsznalo $felahsznalo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFelhsznaloRequest $request, Felhsznalo $felhasznalo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Felhsznalo $felhasznalo)
    {
        //
    }
}
