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
    $csomagok = [
        // helyszin_id 1 = Magyarország
        ['helyszin_id' => 1, 'indulasi_datum' => '2026-06-10', 'visszaut_datum' => '2026-06-17', 'utazasi_mod_id' => 1, 'letszam' => 30, 'ar' => 89000],
        // helyszin_id 2 = Olaszország
        ['helyszin_id' => 2, 'indulasi_datum' => '2026-07-01', 'visszaut_datum' => '2026-07-08', 'utazasi_mod_id' => 1, 'letszam' => 45, 'ar' => 150000],
        // helyszin_id 3 = Japán
        ['helyszin_id' => 3, 'indulasi_datum' => '2026-08-15', 'visszaut_datum' => '2026-08-25', 'utazasi_mod_id' => 1, 'letszam' => 10, 'ar' => 320000],
        // helyszin_id 4 = Thaiföld
        ['helyszin_id' => 4, 'indulasi_datum' => '2026-09-05', 'visszaut_datum' => '2026-09-15', 'utazasi_mod_id' => 1, 'letszam' => 60, 'ar' => 210000],
        // helyszin_id 5 = USA
        ['helyszin_id' => 5, 'indulasi_datum' => '2026-10-10', 'visszaut_datum' => '2026-10-20', 'utazasi_mod_id' => 1, 'letszam' => 70, 'ar' => 380000],
        // helyszin_id 6 = Kanada
        ['helyszin_id' => 6, 'indulasi_datum' => '2026-11-01', 'visszaut_datum' => '2026-11-10', 'utazasi_mod_id' => 1, 'letszam' => 36, 'ar' => 290000],
        // helyszin_id 7 = Spanyolország
        ['helyszin_id' => 7, 'indulasi_datum' => '2026-05-20', 'visszaut_datum' => '2026-05-27', 'utazasi_mod_id' => 2, 'letszam' => 37, 'ar' => 180000],
        // helyszin_id 8 = Dubai
        ['helyszin_id' => 8, 'indulasi_datum' => '2026-12-01', 'visszaut_datum' => '2026-12-08', 'utazasi_mod_id' => 1, 'letszam' => 55, 'ar' => 420000],
        // helyszin_id 9 = Új-Zéland
        ['helyszin_id' => 9, 'indulasi_datum' => '2026-04-15', 'visszaut_datum' => '2026-04-25', 'utazasi_mod_id' => 1, 'letszam' => 57, 'ar' => 490000],
        // helyszin_id 10 = Svájc
        ['helyszin_id' => 10, 'indulasi_datum' => '2026-03-10', 'visszaut_datum' => '2026-03-17', 'utazasi_mod_id' => 3, 'letszam' => 57, 'ar' => 260000],
    ];

    foreach ($csomagok as $csomag) {
        UtazasiCsomagok::create($csomag);
    }
}

}
