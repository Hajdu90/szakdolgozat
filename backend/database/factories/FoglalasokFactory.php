<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Foglalasok>
 */
class FoglalasokFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'utazasi_csomagok_id' => \App\Models\UtazasiCsomagok::inRandomOrder()->first()->id ?? 1,
            'user_id' => \App\Models\User::inRandomOrder()->first()->id ?? 1,
            'letszam' => fake()->numberBetween(1, 5),
            'aktualis_ar' => fake()->numberBetween(10000, 100000),
        ];
    }
}
