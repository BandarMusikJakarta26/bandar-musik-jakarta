<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        $faker = \Faker\Factory::create("id_ID");
        for($i=0;$i<10;$i++){
            Produk::create([
                "id"=>$faker->uuid(),
                "name"=>$faker->name,
                "price"=>$faker->randomNumber(5, false),
                "discount"=>$faker->randomFloat(2,0,0),
                "tokopedia"=>$faker->text(50),
                "description"=>$faker->text(50)
            ]);
        }
    }
}
