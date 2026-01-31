<?php

namespace Database\Seeders;

use App\Models\Helyszin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HelyszinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Helyszin::factory()->create([
            'orszag'=>'Görögország',
            'varos'=>'Athén',
            'szallashely_tipus'=>'hotel',
            'cim'=>'tesztcim utca 32',
            'ferohely'=>3,
        ]);
        Helyszin::factory()->create([
            'orszag'=>'Japán',
            'varos'=>'Kioto',
            'szallashely_tipus'=>'apartman',
            'cim'=>'japán utca 12',
            'ferohely'=>4,
        ]);
        Helyszin::factory()->create([
            'orszag'=>'Dél-Korea',
            'varos'=>'Szöul',
            'szallashely_tipus'=>'hotel',
            'cim'=>'Korea 41',
            'ferohely'=>10,
        ]);
        
    }
}
