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
            'kep_eleresi_ut'=>'/pictures/Hun/Hun1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>1,
            'kep_eleresi_ut'=>'/pictures/Hun/Hun2.jpg',

        ]);
        kepek::factory()->create([
            'utazas_id'=>1,
            'kep_eleresi_ut'=>'/pictures/Hun/Hun3.jpg',

        ]);


        kepek::factory()->create([
            'utazas_id'=>2,
            'kep_eleresi_ut'=>'/pictures/Italy/Italy1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>2,
            'kep_eleresi_ut'=>'/pictures/Italy/Italy2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>2,
            'kep_eleresi_ut'=>'/pictures/Italy/Italy3.jpg',

        ]);


         kepek::factory()->create([
            'utazas_id'=>3,
            'kep_eleresi_ut'=>'/pictures/Japan/Japan1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>3,
            'kep_eleresi_ut'=>'/pictures/Japan/Japan2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>3,
            'kep_eleresi_ut'=>'/pictures/Japan/Japan3.jpg',

        ]);



         kepek::factory()->create([
            'utazas_id'=>4,
            'kep_eleresi_ut'=>'/pictures/Thailand/Thai1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>4,
            'kep_eleresi_ut'=>'/pictures/Thailand/Thai2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>4,
            'kep_eleresi_ut'=>'/pictures/Thailand/Thai3.jpg',

        ]);



        kepek::factory()->create([
            'utazas_id'=>5,
            'kep_eleresi_ut'=>'/pictures/USA/USA1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>5,
            'kep_eleresi_ut'=>'/pictures/USA/USA2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>5,
            'kep_eleresi_ut'=>'/pictures/USA/USA3.jpg',

        ]);



         kepek::factory()->create([
            'utazas_id'=>6,
            'kep_eleresi_ut'=>'/pictures/Canada/Canada1.jpg',

        ]);
        kepek::factory()->create([
            'utazas_id'=>6,
            'kep_eleresi_ut'=>'/pictures/Canada/Canada2.jpg',

        ]);
        kepek::factory()->create([
            'utazas_id'=>6,
            'kep_eleresi_ut'=>'/pictures/Canada/Canada3.jpg',

        ]);



        kepek::factory()->create([
            'utazas_id'=>7,
            'kep_eleresi_ut'=>'/pictures/Spain/Spain1.jpg',

        ]);

         kepek::factory()->create([
            'utazas_id'=>7,
            'kep_eleresi_ut'=>'/pictures/Spain/Spain2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>7,
            'kep_eleresi_ut'=>'/pictures/Spain/Spain3.jpg',

        ]);



         kepek::factory()->create([
            'utazas_id'=>8,
            'kep_eleresi_ut'=>'/pictures/Dubai/Dubai1.jpg',

        ]);
        kepek::factory()->create([
            'utazas_id'=>8,
            'kep_eleresi_ut'=>'/pictures/Dubai/Dubai2.jpg',

        ]);
        kepek::factory()->create([
            'utazas_id'=>8,
            'kep_eleresi_ut'=>'/pictures/Dubai/Dubai3.jpg',

        ]);


        kepek::factory()->create([
            'utazas_id'=>9,
            'kep_eleresi_ut'=>'/pictures/UjZeland/UjZeland1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>9,
            'kep_eleresi_ut'=>'/pictures/UjZeland/UjZeland2.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>9,
            'kep_eleresi_ut'=>'/pictures/UjZeland/UjZeland3.jpg',

        ]);


          kepek::factory()->create([
            'utazas_id'=>10,
            'kep_eleresi_ut'=>'/pictures/Svajc/Svajc1.jpg',

        ]);
         kepek::factory()->create([
            'utazas_id'=>10,
            'kep_eleresi_ut'=>'/pictures/Svajc/Svajc2.jpg',

        ]);

         kepek::factory()->create([
            'utazas_id'=>10,
            'kep_eleresi_ut'=>'/pictures/Svajc/Svajc3.jpg',

        ]);






         


    }
}
