<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
    public function store(Request $request){
        $produk = Produk::create($request->all());
        return response()->json([ "success"=>true,"data"=>$produk ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $params): JsonResponse{
        $responseByName = Produk::where("name",$params)->get();
        if( $responseByName->count() > 0){ 
            return response()->json([ "success"=>true,"data"=>$responseByName ],200);
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
