<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Last_m_ar>
 */
class LastMArFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'utazasi_id' => \App\Models\UtazasiCsomagok::inRandomOrder()->value('id') ?? 1,
            'datum' => $this->faker->date(),
            'szazalek' => $this->faker->numberBetween(20,40),
        ];
    }
}
