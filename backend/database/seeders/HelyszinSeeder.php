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
                'leiras' => 'Magyarország Közép-Európában található, gazdag történelemmel és változatos kulturális örökséggel rendelkező ország. Fővárosa Budapest, amely híres gyönyörű építészetéről és a Duna-parti látványosságairól. Az ország termálfürdőiről, finom ételeiről és vendégszeretetéről is ismert, így ideális úti cél a kikapcsolódásra és felfedezésre.',
                'cim' => '1051 Budapest, József Attila utca 12.',
                'ferohely' => 30,
            ],
            [
                'orszag' => 'Olaszország',
                'varos' => 'Róma',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Olaszország tökéletes választás, ha napsütéses kikapcsolódásra és felejthetetlen élményekre vágysz. Fedezd fel a hangulatos városokat, élvezd a mediterrán tengerpartot, és kóstold meg az autentikus olasz konyha ízeit. Legyen szó romantikus utazásról vagy családi nyaralásról, itt minden adott a gondtalan pihenéshez.',
                'cim' => 'Via dei Fori Imperiali 10',
                'ferohely' => 45,
            ],
            [
                'orszag' => 'Japán',
                'varos' => 'Tokió',
                'szallashely_tipus' => 'hostel',
                'leiras' => 'Japán egyedülálló úti cél, ahol a modern városi élet és a hagyományos kultúra különleges harmóniában találkozik. Fedezd fel Tokió nyüzsgő utcáit, pihenj ősi templomok csendjében, és élvezd a lenyűgöző természeti tájakat. Ideális választás, ha különleges élményekre és emlékezetes utazásra vágysz.',
                'cim' => '1-2-3 Shibuya',
                'ferohely' => 10,
            ],
            [
                'orszag' => 'Thaiföld',
                'varos' => 'Bangkok',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Thaiföld tökéletes választás, ha egzotikus kikapcsolódásra vágysz kristálytiszta tengerpartokkal és trópusi hangulattal. Fedezd fel a nyüzsgő piacokat, a lenyűgöző templomokat és élvezd a világhírű thai konyha ízeit. Ideális úti cél pihenéshez, kalandhoz vagy akár egy romantikus utazáshoz is.',
                'cim' => '88 Riverside Road',
                'ferohely' => 60,
            ],
            [
                'orszag' => 'USA',
                'varos' => 'New York',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Az Egyesült Államok változatos úti cél, ahol mindenki megtalálja a számára tökéletes élményt. Fedezd fel a nyüzsgő nagyvárosokat, a lenyűgöző nemzeti parkokat és a híres látványosságokat. Ideális választás kalandvágyóknak, városnézéshez vagy akár egy hosszabb, élményekkel teli utazáshoz.',
                'cim' => '350 5th Avenue',
                'ferohely' => 70,
            ],
            [
                'orszag' => 'Kanada',
                'varos' => 'Toronto',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Kanada tökéletes úti cél, ha lenyűgöző természeti tájakra és nyugodt kikapcsolódásra vágysz. Fedezd fel a hatalmas erdőket, kristálytiszta tavakat és a látványos hegyvidékeket, miközben modern, barátságos városok várnak. Ideális választás kalandhoz, feltöltődéshez vagy egy különleges utazási élményhez.',
                'cim' => '290 Bremner Blvd',
                'ferohely' => 36,
            ],
            [
                'orszag' => 'Spanyolország',
                'varos' => 'Ronda',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Spanyolország tökéletes választás, ha napsütéses pihenésre és pezsgő hangulatra vágysz. Élvezd a gyönyörű tengerpartokat, fedezd fel a történelmi városokat, és kóstold meg a híres spanyol ételeket. Ideális úti cél kikapcsolódáshoz, városnézéshez vagy egy élményekkel teli nyaraláshoz.',
                'cim' => 'Av. Ricardo Navarrete, 9',
                'ferohely' => 37,
            ],
            [
                'orszag' => 'Egyesült Arab Emírségek',
                'varos' => 'Dubai',
                'szallashely_tipus' => 'hotel',
                'leiras' => 'Dubai tökéletes választás, ha luxusra és különleges élményekre vágysz. Fedezd fel a modern felhőkarcolókat, élvezd a homokos tengerpartokat, és próbáld ki az egyedi sivatagi programokat. Ideális úti cél exkluzív pihenéshez és felejthetetlen kalandokhoz.',
                'cim' => 'Sheikh Mohammed bin Rashid Blvd',
                'ferohely' => 55,
            ],
            [
                'orszag' => 'Új-Zéland',
                'varos' => 'Auckland',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Új-Zéland lenyűgöző úti cél, ahol drámai hegyek, zöldellő tájak és kristálytiszta tavak várnak. A természet szerelmeseinek igazi paradicsom, rengeteg túraútvonallal és különleges panorámákkal. Ideális hely aktív kikapcsolódáshoz és egy igazán emlékezetes utazáshoz.',
                'cim' => 'Queen Street 120',
                'ferohely' => 57,
            ],

             [
                'orszag' => 'Svájc',
                'varos' => 'Interlaken',
                'szallashely_tipus' => 'apartman',
                'leiras' => 'Svájc híres lenyűgöző alpesi tájairól, kristálytiszta tavairól és rendezett, nyugodt városairól. A természet és a precíz svájci életstílus különleges egyensúlyt teremt, ami minden utazót elvarázsol. Tökéletes választás hegyi kirándulásokhoz, pihenéshez és minőségi élményekhez.',
                'cim' => 'Lakvagen Street 10',
                'ferohely' => 57,
            ],


        ];

        foreach ($helyszinek as $helyszin) {
            Helyszin::create($helyszin);
        }
    }
}
