<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class UtazasiCsomagok extends Model
{
    /** @use HasFactory<\Database\Factories\UtazasiCsomagokFactory> */
    use HasFactory;

    protected $table = 'utazasi_csomagoks';//a tábla nevézt megadjuk biztos ami biztos

    //automatikusan kitölthető táblák
    protected $fillable = [
        'helyszin_id',
        'indulasi_datum',
        'visszaut_datum',
        'utazasi_mod_id',
        'letszam',
        'ar',

    ];

    //JSON-be rakja bele a szabad_helyek-et és az akciós árakat
    protected $appends = ['szabad_helyek','is_lastminute', 'akcios_ar'];

    //kapcsolat a foglalásokkal
    public function foglalasoks() {
        return $this->hasMany(Foglalasok::class, 'utazasi_csomagok_id');
    }

    //kapcsolat a helyszínnel
    public function helyszin() {
        return $this->belongsTo(Helyszin::class, 'helyszin_id');
    }

    //kapcsolat utazasi móddal
    public function utazasiMod() {
        return $this->belongsTo(Utazasi_mod::class,'utazasi_mod_id');
    }

    //képek kapcsolat
    public function kepek() {
        return $this->hasMany(kepek::class, 'utazas_id');
    }

    //számítás szabad helyek
    public function getSzabadHelyekAttribute(): int
    {
        $foglalt = (int) $this->foglalasoks()->sum('letszam');
        return (int) $this->letszam - $foglalt;
    }

    //Lastminute számítás
    public function getIsLastminuteAttribute(): bool
    {
        if (!$this->indulasi_datum) {
            return false;
        }

        return Carbon::today()->gte(
            Carbon::parse($this->indulasi_datum)->subDays(7)
        );
    }

    //Akciós ár számítás
    public function getAkciosArAttribute(): int
    {
        return $this->is_lastminute
            ? (int) round($this->ar * 0.8) // 20% kedvezmény
            : (int) $this->ar;
    }



}
