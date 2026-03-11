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
        $csomagok = \App\Models\UtazasiCsomagok::all()
        ->filter(fn ($c) => $c->szabad_helyek > 0);

        // Ha nincs szabad helyes csomag, hozz létre újat
        $csomag = $csomagok->isEmpty()
            ? \App\Models\UtazasiCsomagok::factory()->create()
            : $csomagok->random();

        $letszam = fake()->numberBetween(1, $csomag->szabad_helyek);

        return [
            'utazasi_csomagok_id' => $csomag->id,
            'user_id' => \App\Models\User::inRandomOrder()->first()->id ?? 1,
            'letszam' => $letszam,
            'aktualis_ar' => $csomag->ar * $letszam,
        ];
    }
}
