<?php

namespace Database\Seeders;

use App\Models\Helyszin;
use Illuminate\Database\Seeder;

class HelyszinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $helyszinek = [
            [
                'orszag' => 'Magyarország',
                'varos' => 'Budapest',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Modern hotel Budapest belvárosában.',
                'cim' => '1051 Budapest, József Attila utca 12.',
                'ferohely' => 30,
            ],
            [
                'orszag' => 'Olaszország',
                'varos' => 'Róma',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Apartman a Colosseum közelében.',
                'cim' => 'Via dei Fori Imperiali 10',
                'ferohely' => 45,
            ],
            [
                'orszag' => 'Franciaország',
                'varos' => 'Párizs',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Elegáns hotel az Eiffel-torony közelében.',
                'cim' => '25 Avenue de Tour Eiffel',
                'ferohely' => 122,
            ],
            [
                'orszag' => 'Japán',
                'varos' => 'Tokió',
                'szallashely_tipus' => 'hostel',
                'leiras' => 'Modern hostel Shibuya negyedben.',
                'cim' => '1-2-3 Shibuya',
                'ferohely' => 10,
            ],
            [
                'orszag' => 'Thaiföld',
                'varos' => 'Bangkok',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Luxus hotel a Chao Phraya folyó mellett.',
                'cim' => '88 Riverside Road',
                'ferohely' => 60,
            ],
            [
                'orszag' => 'USA',
                'varos' => 'New York',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Manhattani apartman kilátással.',
                'cim' => '350 5th Avenue',
                'ferohely' => 70,
            ],
            [
                'orszag' => 'Kanada',
                'varos' => 'Toronto',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Modern hotel a CN Tower közelében.',
                'cim' => '290 Bremner Blvd',
                'ferohely' => 36,
            ],
            [
                'orszag' => 'Spanyolország',
                'varos' => 'Ronda',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Hegyvidék, friss levegő.',
                'cim' => 'Av. Ricardo Navarrete, 9',
                'ferohely' => 37,
            ],
            [
                'orszag' => 'Argentína',
                'varos' => 'Buenos Aires',
                'szallashely_tipus' => 'panzio',
                'leiras' => 'Hangulatos panzió Palermo negyedben.',
                'cim' => 'Calle Honduras 4100',
                'ferohely' => 81,
            ],
            [
                'orszag' => 'Olaszország',
                'varos' => 'Roma',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Foglaljon jegyeket, túrákat és élményeket a világ legjobb látványosságaihoz a telefonján.',
                'cim' => 'Via del Corso 15',
                'ferohely' => 50,
            ],
            [
                'orszag' => 'Németország',
                'varos' => 'Köln',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Látogasd meg az egyik legismertebb gótikus katedrálist Európában, a UNESCO világörökségi helyszínét. A város legismertebb jelképét.',
                'cim' => 'Hohenzollernring 25',
                'ferohely' => 65,
            ],
            [
                'orszag' => 'Lengyelország',
                'varos' => 'Malburk',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'A közelben látható világ legnagyobb téglából épült vára, amelyet a Német Lovagrend épített a középkorban.',
                'cim' => 'ul. Stare Miasto 17',
                'ferohely' => 155,
            ],
            [
                'orszag' => 'Egyesült Arab Emírségek',
                'varos' => 'Dubai',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Luxus hotel a Burj Khalifa közelében.',
                'cim' => 'Sheikh Mohammed bin Rashid Blvd',
                'ferohely' => 55,
            ],
            [
                'orszag' => 'India',
                'varos' => 'Delhi',
                'szallashely_tipus' => 'panzio',
                'leiras' => 'Hagyományos indiai vendégház.',
                'cim' => 'Connaught Place 21',
                'ferohely' => 92,
            ],
            [
                'orszag' => 'Új-Zéland',
                'varos' => 'Auckland',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Tengerparti apartman.',
                'cim' => 'Queen Street 120',
                'ferohely' => 57,
            ],
        ];

        foreach ($helyszinek as $helyszin) {
            Helyszin::create($helyszin);
        }
    }
}
