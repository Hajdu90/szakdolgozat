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
        Schema::create('helyszins', function (Blueprint $table) {
            $table->id();
            $table->string('orszag',100);
            $table->string('varos',100);
            $table->string('szallashely_tipus',20);
            $table->string('cim',150);
            $table->integer('ferohely');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE helyszins
        ADD CONSTRAINT helyszins_ferohely_check CHECK (ferohely > 0)');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('helyszins');
    }
};
