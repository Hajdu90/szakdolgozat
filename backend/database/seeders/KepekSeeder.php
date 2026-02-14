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
            'kep_eleresi_ut'=>'https://picsum.photos/200',

        ]);
         kepek::factory()->create([
            'utazas_id'=>2,
            'kep_eleresi_ut'=>'https://picsum.photos/300',

        ]);
         kepek::factory()->create([
            'utazas_id'=>3,
            'kep_eleresi_ut'=>'https://picsum.photos/400',

        ]);
    }
}
