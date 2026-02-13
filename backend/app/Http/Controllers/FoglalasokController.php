<?php

namespace App\Http\Controllers;

use App\Models\Foglalasok;
use App\Http\Requests\StoreFoglalasokRequest;
use App\Http\Requests\UpdateFoglalasokRequest;
use App\Models\UtazasiCsomagok;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FoglalasokController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Foglalasok::with('utazasiCsomag')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Alapvető validáció
        $request->validate([
            'utazasi_csomagok_id' => 'required|exists:utazasi_csomagoks,id',
            'letszam' => 'required|integer|min:1',
        ]);

        //Csomag lekérése a szabad helyek ellenőrzéséhez
        $csomag = UtazasiCsomagok::findOrFail($request->utazasi_csomagok_id);

        //Egyedi validáció a szabad helyekre
        if ($request->letszam > $csomag->szabad_helyek) {
            return response()->json([
                'message' => "Nincs elég szabad hely! Jelenleg elérhető: {$csomag->szabad_helyek}"
            ], 422);
        }

        // Mentés a Foglalasok modell használatával
        $foglalas = Foglalasok::create([
            'utazasi_csomagok_id' => $csomag->id,
            'user_id' => Auth::id() ?? 1, // Ha nincs login, alapértelmezett 1-es ID
            'letszam' => $request->letszam,
            'aktualis_ar' => $csomag->ar * $request->letszam
        ]);

        return response()->json([
            'message' => 'Sikeres foglalás!',
            'data' => $foglalas
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Foglalasok $foglalasok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoglalasokRequest $request, Foglalasok $foglalasok)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Foglalasok $foglalasok)
    {
        //
    }
}
