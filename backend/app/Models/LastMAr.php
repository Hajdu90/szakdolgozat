<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LastMAr extends Model
{
    /** @use HasFactory<\Database\Factories\LastMArFactory> */
    use HasFactory;
     protected $fillable = [
        'utazasi_id',
        'datum',
        'szazalek',
    ];
}
