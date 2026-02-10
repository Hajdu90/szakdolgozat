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
        Schema::create('foglalasoks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('helyszin_id')->constrained('helyszins');
            $table->foreignId('user_id')->constrained('users');
            $table->integer('letszam');
            $table->integer('aktualis_ar');
            $table->timestamps();

        });

        DB::statement('ALTER TABLE foglalasoks
            ADD CONSTRAINT foglalasoks_letszam_check CHECK (letszam > 0)');

        DB::statement('ALTER TABLE foglalasoks
            ADD CONSTRAINT foglalasoks_ar_check CHECK (aktualis_ar >= 0)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foglalasoks');
    }
};
