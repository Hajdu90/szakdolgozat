<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Foglalasok extends Model
{

    use HasFactory;

    protected $table = 'foglalasoks';

    protected $fillable = [
        'utazasi_csomagok_id',
        'letszam',
        'user_id',
        'aktualis_ar',
    ];

    //Kapcsolat, utazási csomagra
    public function utazasiCsomag () {
        return $this->belongsTo(UtazasiCsomagok::class, 'utazasi_csomagok_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
