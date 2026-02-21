<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kepek extends Model
{
    /** @use HasFactory<\Database\Factories\KepekFactory> */
    use HasFactory;
     protected $fillable = [
        'utazas_id',
        'kep_eleresi_ut',
    ];

    public function utazasiCsomago() {
        return $this->belongsTo(UtazasiCsomagok::class, 'utazas_id');
    }
}
