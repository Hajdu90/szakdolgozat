<?php

namespace App\Http\Controllers;

use App\Models\kepek;
use App\Http\Requests\StorekepekRequest;
use App\Http\Requests\UpdatekepekRequest;
use App\Models\UtazasiCsomagok;
use Illuminate\Http\Request;

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


    public function kepFeltoltes(Request $request, $id)
{
    $request->validate([
        'kep' => 'required|image|max:2048'
    ]);

    $csomag = UtazasiCsomagok::findOrFail($id);
    $path = $request->file('kep')->store('kepek', 'public');

    $kep = $csomag->kepek()->create(['kep_eleresi_ut' => $path]);

    return response()->json($kep);
}



}
