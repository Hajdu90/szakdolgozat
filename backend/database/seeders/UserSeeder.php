<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name'=>'teszt1',
            'email'=>'kismaria@hotmail.com',
            'password'=>'teszt12345',
            'roles'=>0,
        ]);

        User::factory()->create([
            'name'=>'Juli Főnök',
            'email'=>'juliboss@hotmail.com',
            'password'=>'teszt12345',
            'roles'=>1,
        ]);
    }
}



