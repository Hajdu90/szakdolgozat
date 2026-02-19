<?php

namespace Database\Seeders;

use App\Models\UtazasiCsomagok;
use App\Models\UtazasiCsomagok as ModelsUtazasiCsomagok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UtazasiCsomagokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelsUtazasiCsomagok::factory()->create([
            'helyszin_id'=>1,
            'indulasi_datum'=>'2026-11-18',
            'visszaut_datum'=>'2026-11-24',
            'utazasi_mod_id'=>1,
            'letszam'=>6,
            'szabad_helyek'=>6,
            'ar'=>50000,

        ]);

         UtazasiCsomagok::factory()->create([
            'helyszin_id'=>2,
            'indulasi_datum'=>'2026-06-18',
            'visszaut_datum'=>'2026-06-30',
            'utazasi_mod_id'=>1,
            'letszam'=>4,
            'szabad_helyek'=>8,
            'ar'=>50000,

        ]);

         UtazasiCsomagok::factory()->create([
            'helyszin_id'=>3,
            'indulasi_datum'=>'2026-12-18',
            'visszaut_datum'=>'2026-12-25',
            'utazasi_mod_id'=>3,
            'letszam'=>6,
            'szabad_helyek'=>8,
            'ar'=>70000,

        ]);

        UtazasiCsomagok::factory()->create([
            'helyszin_id'=>4,
            'indulasi_datum'=>'2025-12-18',
            'visszaut_datum'=>'2025-12-25',
            'utazasi_mod_id'=>3,
            'letszam'=>6,
            'szabad_helyek'=>2,
            'ar'=>70000,

        ]);

        UtazasiCsomagok::factory()->create([
            'helyszin_id'=>1,
            'indulasi_datum'=>'2026-02-20',
            'visszaut_datum'=>'2026-02-25',
            'utazasi_mod_id'=>2,
            'letszam'=>6,
            'szabad_helyek'=>0,
            'ar'=>50000,
            
        ]);
    }
}
