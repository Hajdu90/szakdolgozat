<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foglalasok extends Model
{
    
    use HasFactory;
    protected $fillable = [
        'helyszin_id',
        'letszam',
        'felhasznalo_id',
        'aktualis_ar',
    ];

}
