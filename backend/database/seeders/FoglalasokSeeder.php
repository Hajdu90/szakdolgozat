<?php

namespace Database\Seeders;

use App\Models\Foglalasok;
use FFI;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FoglalasokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Foglalasok::factory(10)->create();

        //manuálisan:
        /*
        \App\Models\Foglalasok::create([
            'utazasi_csomagok_id' => 1, // NEM helyszin_id
            'user_id' => 1,
            'letszam' => 2,
            'aktualis_ar' => 100000
        ]);
        */
    }
}
