<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $table = "produk";
    protected $fillable = ['name', 'pricelist', 'offlinePrice', 'onlinePrice','promo', 'description', 'panjang', 'lebar', 'tinggi', 'berat', 'url','brandId', 'kategoriId', 'images', 'stock'];
    protected $casts = [ 'images' => 'array' ];
    protected function images(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    } 
}
