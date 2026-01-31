<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utazasi_mod extends Model
{
    /** @use HasFactory<\Database\Factories\UtazasiModFactory> */
    use HasFactory;
    protected $fillable = [
        'tipus',
    ];
}
