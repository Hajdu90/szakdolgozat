<?php

namespace Database\Seeders;

use App\Models\Felhsznalo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UtazasiModSeeder::class);
        $this->call(HelyszinSeeder::class);
        $this->call(UtazasiCsomagokSeeder::class);
        $this->call(KepekSeeder::class);
        $this->call(LastMArSeeder::class);
        $this->call(FelhsznaloSeeder::class);
        $this->call(FoglalasokSeeder::class);

        
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
