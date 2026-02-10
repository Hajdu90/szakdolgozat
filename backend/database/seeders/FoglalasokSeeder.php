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
        Foglalasok::factory()->create([
            'helyszin_id'=>1,
            'letszam'=>2,
            'user_id'=>1,
            'aktualis_ar'=>50000,
        ]);
         Foglalasok::factory()->create([
            'helyszin_id'=>3,
            'letszam'=>4,
            'user_id'=>2,
            'aktualis_ar'=>70000,
        ]);

    }
}
