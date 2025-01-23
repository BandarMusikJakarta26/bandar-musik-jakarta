<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandStoreRequest;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        if($request->has("limit")){
            $brands = Brand::take($request->limit)->select(['name', 'image'])->orderBy('name', 'asc')->get();
            return response()->json(["success"=>true,"brands"=>$brands]);
        }
        else if($request->has("name")){
            $brands = Brand::select("name")->orderBy("created_at", "desc")->get();
        }
        else{
            $brands = Brand::orderBy("name", "asc")->get();
        }
        return response()->json(["success"=>true,"brands"=>$brands]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BrandStoreRequest $request){
        try{
            $fileName = Str::random(32).".".$request->file('image')->getClientOriginalExtension();
            $brand = Brand::create([
                'name'=> $request->name,
                'description'=> $request->description,
                'image'=> $fileName,
            ]);
            Storage::disk('public')->put($fileName, file_get_contents($request->image));
            return response()->json(["success"=>true, $brand]);
        }catch(\Exception $e){
            return response()->json(["success"=>false,"error"=>$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name){
        $brand = Brand::where("name","=", $name)->first();
        return response()->json(["success"=>true,"brand"=>$brand]);
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
    public function destroy(string $name){
        $brand = Brand::where('name',$name)->get()[0];
        $brand->destroy($brand->id);
        return response()->json(['success'=>true]);
    }
}
