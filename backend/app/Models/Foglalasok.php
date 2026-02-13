<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foglalasok extends Model
{

    use HasFactory;

    protected $table = 'foglalasoks';

    protected $fillable = [
        'helyszin_id',
        'letszam',
        'user_id',
        'aktualis_ar',
    ];

    //Kapcsolat, utazási csomagra
    public function utazasiCsomag () {
        return $this->belongsTo(UtazasiCsomagok::class, 'utazasi_csomagok_id');
    }

}
