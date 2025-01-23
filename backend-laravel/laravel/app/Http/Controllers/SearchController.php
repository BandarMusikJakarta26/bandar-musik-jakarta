<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;

class SearchController extends Controller {
    public function nullSearch(){
        return response()->json(["success"=>false], 200);
    }

    public function search(string $keyword){
        if(!$keyword) return response()->json(["success"=>false], 200);

        $produk = Produk::where("name","like","%".$keyword."%")->take(20)->orderBy('name', 'asc')->get();
        $brands = Brand::where("name","like","%".$keyword."%")->take(10)->orderBy('name', 'asc')->get();
        $kategori = Kategori::where("title","like","%".$keyword."%")->take(10)->orderBy('title', 'asc')->get();

        if(count($produk) == 0 && count($brands) == 0 && count($kategori) == 0) return response()->json(["success"=>false], 200);
        return response()->json(["success"=>true, "products"=>$produk, "brands"=>$brands, "categories"=>$kategori], 200);
    }
}
