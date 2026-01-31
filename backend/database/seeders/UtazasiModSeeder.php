<?php

namespace Database\Seeders;

use App\Models\Utazasi_mod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UtazasiModSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Utazasi_mod::factory()->create([
            'tipus' => 'repülő',

        ]);

        Utazasi_mod::factory()->create([
            'tipus' => 'busz',

        ]);
        Utazasi_mod::factory()->create([
            'tipus' => 'vonat',

        ]);
    }
}
