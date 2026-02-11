<?php

namespace Database\Seeders;

use App\Models\LastMAr;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LastMArSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LastMAr::factory()->create([
        'utazasi_id'=>1,
        'datum'=>'2026-11-15',
        'szazalek'=>30,
        ]);

         LastMAr::factory()->create([
        'utazasi_id'=>2,
        'datum'=>'2026-12-15',
        'szazalek'=>30,
        ]);
    }
}
