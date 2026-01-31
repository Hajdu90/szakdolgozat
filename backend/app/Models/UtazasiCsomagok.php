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
        'szabad_helyek',
        'ar',

    ];
}
