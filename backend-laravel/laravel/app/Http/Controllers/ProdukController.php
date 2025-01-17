<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse{
        $response = Produk::orderBy("created_at", "desc")->get();
        return response()->json([ "success"=>true, "data"=>$response ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request){
        $body = $request->validated();

        $imageData = [];
        if($files = $request->file('images')){
            foreach( $files as $file ){
                $fileName = Str::random(32).".".$file->getClientOriginalExtension();
                $imageData[] = [ $fileName ];
                // GambarProduk::create(["produkId"=>$produk->id, "image"=>$fileName]);
                Storage::disk('public')->put($fileName, file_get_contents($file));
            }
        };
        // GambarProduk::insert($imageData);
        $produk = Produk::create([
            'name'=>$body["name"],
            'price'=>$body["price"],
            'discount'=>$body["discount"],
            'tokopedia'=>$body["tokopedia"],
            'description'=>$body["description"],
            'brandId'=>$body["brand"],
            'kategoriId'=>$body["kategori"],
            'images'=>json_encode($imageData)
        ]);

        return response()->json([ "success"=>true, "images"=>$imageData],200);
    }

    public function showByBrand(string $brandName){
        $productsByBrand = Produk::where("brandId", $brandName)->orderBy("name", "asc")->get();
        for($i=0;$i<count($productsByBrand); $i++){
            $productsByBrand[$i]["images"] = json_decode($productsByBrand[$i]["images"], true);
        }
        return response()->json(["success"=>true, "produk"=>$productsByBrand], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $params): JsonResponse{
        $responseByName = Produk::where("name",$params)->orderBy("name", "asc")->get()[0];
        if( $responseByName->count() > 0){ 
            $responseByName["images"] = json_decode($responseByName["images"], true);
            return response()->json([ "success"=>true,"produk"=>$responseByName ],200);
        };
        $responseBySearch = Produk::where("name", "LIKE", '%'.$params.'%')->get();
        return response()->json([ "success"=>true,"data"=>$responseBySearch ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
