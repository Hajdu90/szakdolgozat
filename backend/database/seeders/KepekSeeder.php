<?php

namespace Database\Seeders;

use App\Models\kepek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KepekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        kepek::factory()->create([
            'utazas_id'=>1,
            'kep_eleresi_ut'=>'http/test.hu/kepek/1',

        ]);
         kepek::factory()->create([
            'utazas_id'=>2,
            'kep_eleresi_ut'=>'http/test.hu/kepek/2',

        ]);
         kepek::factory()->create([
            'utazas_id'=>3,
            'kep_eleresi_ut'=>'http/test.hu/kepek/3',

        ]);
    }
}
