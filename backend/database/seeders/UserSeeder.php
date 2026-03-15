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

         User::create([
        'name' => 'teszt Vasarlo',
        'email' => 'tesztVasarlo@teszt.hu',
        'password' => Hash::make('password'),
        'roles' => false,
        ]);

        User::factory(10)->create();
    }
}



