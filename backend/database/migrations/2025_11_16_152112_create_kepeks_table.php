<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kepeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utazas_id')->constrained('utazasi_csomagoks');
            $table->string('kep_eleresi_ut',50);
            $table->timestamps();
            
            $table->unique('kep_eleresi_ut');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepeks');
    }
};
