<?php

namespace App\Http\Controllers;

use App\Models\UtazasiCsomagok;
use App\Http\Requests\StoreUtazasiCsomagokRequest;
use App\Http\Requests\UpdateUtazasiCsomagokRequest;
use App\Models\Helyszin;
use Illuminate\Http\Request;

class UtazasiCsomagokController extends Controller
{
   
    public function index()
    {
        return UtazasiCsomagok::with(['helyszin','utazasiMod'])->get();
    }

    public function store(Request $request)
    {
        //Validálás
        $request->validate([
            'helyszin_id' => 'required|exists:helyszins,id',
            'ar' => 'required|numeric',
            'indulasi_datum' => 'required|date',
            'visszaut_datum' => 'required|date',
        ]);

        $helyszin = Helyszin::findOrFail($request->helyszin_id);

        $csomag = UtazasiCsomagok::create([
            'helyszin_id' => $helyszin->id,
            'letszam' => $helyszin->ferohely, // ÁTVÉTEL: A helyszín férőhelye lesz a csomag kerete
            'ar' => $request->ar,
            'indulasi_datum' => $request->indulasi_datum,
            'visszaut_datum' => $request->visszaut_datum,
            'utazasi_mod_id' => $request->utazasi_mod_id,
        ]);

        return response()->json($csomag);
    }

   
    public function show($id)
{
    return UtazasiCsomagok::with(['helyszin','utazasiMod'])->findOrFail($id);
}

    public function update(Request $request, $id)
    {
        $csomag = UtazasiCsomagok::findOrFail($id);
        $csomag->update($request->all());
        return response()->json($csomag);
    }

 
   public function destroy($id)
    {
        $csomag = UtazasiCsomagok::findOrFail($id);
        $csomag->delete();
        return response()->json(['message' => 'Sikeres törlés']);
    }
}
