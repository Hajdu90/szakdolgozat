<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Helyszin>
 */
class HelyszinFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipusok = ['hotel', 'apartman', 'hostel', 'panzio', 'vendeghaz'];

        return [
            'orszag' => $this->faker->country(),
            'varos' => $this->faker->city(),
            'szallashely_tipus' => $this->faker->randomElement($tipusok),
            'cim' => $this->faker->streetAddress(),
            'ferohely' => $this->faker->numberBetween(1, 20), // CHECK miatt >0
        ];
    }
}
