<?php

namespace Database\Seeders;

use App\Models\Felhsznalo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FelhsznaloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Felhsznalo::factory()->create([
            'jelszo'=>'teszt1',
            'Teljes_nev'=>"Kis Mária",
            'email'=>'Kismaria@hotmail.com',
            'jogusultsag'=>'felhasznalo',

        ]);
        Felhsznalo::factory()->create([
            'jelszo'=>'teszt2',
            'Teljes_nev'=>"Nagy Péter",
            'email'=>'nagyPeter@hotmail.com',
            'jogusultsag'=>'felhasznalo',

        ]);
        
    }
}
