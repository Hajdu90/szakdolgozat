<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   User::create([
        'name' => 'Admin User',
        'email' => 'admin@teszt.hu',
        'password' => Hash::make('Admin123'),
        'roles' => true,
        ]);

        User::factory(10)->create();
    }
}



