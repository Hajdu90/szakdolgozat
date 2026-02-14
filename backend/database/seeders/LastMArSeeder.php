<?php

namespace Database\Seeders;

use App\Models\LastMAr;
use Database\Factories\LastMArFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LastMArSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       LastMAr::factory(1)->create();
    }
}
