<?php

namespace Database\Seeders;

use App\Models\LastMAr;
use Database\Factories\LastMArFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Symfony\Component\Clock\now;

class LastMArSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $utazasIds = \App\Models\UtazasiCsomagok::query()
       ->where('lastminute',true)
       ->pluck('id');

       foreach ($utazasIds as $i => $utazasiId) {
            \App\Models\LastMAr::factory()->create([
                'utazasi_id' => $utazasiId,
                'datum' => now()->modify("+{$i} days")->format('Y-m-d'), // unique datum
            ]);
        }

    }
}
