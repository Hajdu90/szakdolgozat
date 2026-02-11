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
        Helyszin::factory(50)->create();
    }
}
