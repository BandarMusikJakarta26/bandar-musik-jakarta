<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;

class SearchController extends Controller {
    public function search(Request $request){
        $keyword = trim($request->input("keyword"));
        if(!$keyword) return response()->json(["success"=>false], 200);

        $produk = Produk::where("name","like","%".$keyword."%")->first();
        $brands = Brand::where("name","like","%".$keyword."%")->first();
        $kategori = Kategori::where("name","like","%".$keyword."%")->first();

        if(count($produk) == 0 && count($brands) == 0 && count($kategori) == 0) return response()->json(["success"=>false], 200);
        return response()->json(["success"=>true, "products"=>$produk, "brands"=>$brands, "categories"=>$kategori], 200);
    }
}
