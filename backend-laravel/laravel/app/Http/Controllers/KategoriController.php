<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        if($request->has("limit")){
            $response = Kategori::take($request->limit)->orderBy('title', 'asc')->get();
            return response()->json(["success"=>true,"categories"=>$response], 200);
        } else {
            $response = Kategori::orderBy("title", "asc")->get();
            return response()->json([ "success"=>true, "categories"=>$response ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        try{
            $fileName = Str::random(32).".".$request->file('image')->getClientOriginalExtension();
            $kategori = Kategori::create([
                'title'=> $request->title,
                'image'=> $fileName,
            ]);
            Storage::disk('public')->put($fileName, file_get_contents($request->image));
            return response()->json(["success"=>true, $kategori]) ;
        }catch(\Exception $e){
            return response()->json(["success"=>false,"error"=>$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
