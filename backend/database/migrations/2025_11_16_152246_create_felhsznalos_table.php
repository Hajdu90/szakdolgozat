<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('felhsznalos', function (Blueprint $table) {
            $table->id();
            $table->string('jelszo',30);
            $table->string('Teljes_nev',100);
            $table->string('email',100);
            $table->string('jogusultsag',20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhsznalos');
    }
};
