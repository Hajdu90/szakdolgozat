<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Helyszin extends Model
{
    /** @use HasFactory<\Database\Factories\HelyszinFactory> */
    use HasFactory;
     protected $fillable = [
        'orszag',
        'varos',
        'szallashely_tipus',
        'cim',
        'ferohely',
    ];
}

