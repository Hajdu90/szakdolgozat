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
        Schema::create('utazasi_csomagoks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('helyszin_id')->constrained('helyszins');
            $table->date('indulasi_datum');
            $table->date('visszaut_datum');
            $table->foreignId('utazasi_mod_id')->constrained('utazasi_mods');
            $table->integer('letszam');
            $table->integer('szabad_helyek');
            $table->integer('ar');
            $table->timestamps();

        });

        DB::statement('ALTER TABLE utazasi_csomagoks
            ADD CONSTRAINT utazasi_csomagoks_letszam_check CHECK (letszam > 0)');

        DB::statement('ALTER TABLE utazasi_csomagoks
            ADD CONSTRAINT utazasi_csomagoks_szabad_helyek_check CHECK (szabad_helyek >= 0)');

        DB::statement('ALTER TABLE utazasi_csomagoks
            ADD CONSTRAINT utazasi_csomagoks_ar_check CHECK (ar >= 0)');

        DB::statement('ALTER TABLE utazasi_csomagoks
            ADD CONSTRAINT utazasi_csomagoks_visszaut_datum_check CHECK (visszaut_datum >= indulasi_datum)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utazasi_csomagoks');
    }
};
