<?php

namespace App\Http\Controllers;

use App\Models\kepek;
use App\Http\Requests\StorekepekRequest;
use App\Http\Requests\UpdatekepekRequest;

class KepekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return kepek::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorekepekRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(kepek $kepek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatekepekRequest $request, kepek $kepek)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(kepek $kepek)
    {
        //
    }
}
