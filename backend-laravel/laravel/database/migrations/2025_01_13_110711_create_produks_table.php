<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->index();
            $table->string('name');
            $table->string('pricelist')->nullable(true);
            $table->string('offlinePrice')->nullable(true);
            $table->string('onlinePrice')->nullable(true);
            $table->string('namaPromo')->nullable(value: true);
            $table->string('promo')->nullable(value: true);
            $table->string('url');
            $table->string('description');
            $table->string('panjang')->nullable(true);
            $table->string('lebar')->nullable(true);
            $table->string('tinggi')->nullable(true);
            $table->string('berat')->nullable(true);
            $table->string('brandId');
            $table->string('kategoriId');
            $table->json('images')->nullable(true);
            $table->string('stock')->nullable(true);
            $table->tinyInteger('pajak');
            $table->tinyInteger('kirim');
            $table->tinyInteger('pasang');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExistcs('produk');
    }
};
