<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtazasiCsomagok extends Model
{
    /** @use HasFactory<\Database\Factories\UtazasiCsomagokFactory> */
    use HasFactory;
    protected $fillable = [
        'helyszin_id',
        'indulasi_datum',
        'visszaut_datum',
        'utazasi_mod_id',
        'lastminute',
        'letszam',
        'ar',

    ];

    //JSON-be rakja bele a szabad_helyek-et
    protected $appends = ['szabad_helyek'];

    //kapcsolat a foglalásokkal
    public function foglalasoks() {
        return $this->hasMany(Foglalasok::class, 'utazasi_csomagok_id');
    }

    //kapcsolat a helyszínnel
    public function helyszin() {
        return $this->belongsTo(Helyszin::class, 'helyszin_id');
    }

    //számítás Dinamikus
    public function getSzabadHelyekAttribute() {
        $foglalt = $this->foglalasoks()->sum('letszam');

        return $this->letszam - $foglalt;
    }
}
