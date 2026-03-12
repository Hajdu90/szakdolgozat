<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class UtazasiCsomagokFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $helyszin = \App\Models\Helyszin::inRandomOrder()->first();

        $indulasi = Carbon::instance(fake()->dateTimeBetween('now', '+1 year'))->startOfDay();
        $visszaut = (clone $indulasi)->addDays(fake()->numberBetween(3, 14));

        return [
            'helyszin_id' => $helyszin->id,
            'indulasi_datum' => $indulasi->toDateString(),
            'visszaut_datum' => $visszaut->toDateString(),
            'utazasi_mod_id' => \App\Models\Utazasi_mod::inRandomOrder()->first()->id ?? 1,
            'letszam' => $helyszin->ferohely,
            'ar' => fake()->numberBetween(30000, 120000),
        ];
    }
}
