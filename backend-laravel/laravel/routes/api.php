<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
    
});

Route::get('/brand', [BrandController::class, 'index']);
Route::get('/brand/{name}', [BrandController::class, 'show']);

Route::get('/kategori', [KategoriController::class, 'index']);

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/url/{url}', [ProdukController::class, 'showByUrl']);
Route::get('/produk/{params}', [ProdukController::class, 'show']);
Route::get('/produk/brand/{brandName}', [ProdukController::class, 'showByBrand']);
Route::get('/produk/kategori/{kategoriName}', [ProdukController::class, 'show']);

Route::get('/search', [SearchController::class, 'nullSearch']);
Route::get('/search/{keyword}', [SearchController::class, 'search']);

// Route::post('/register', [RegisterController::class, 'store']);

Route::controller(\App\Http\Controllers\API\AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    
    Route::get('/get-cookie', 'getCookie');
    Route::get('/cookie/{token}', 'setCookie');
    Route::get('/logout', 'logout');
});

Route::post('/tambah/brand', [BrandController::class, 'store']);
Route::post('/tambah/produk', [ProdukController::class, 'store']);
Route::post('/tambah/kategori', [KategoriController::class, 'store']);
// Route::post('/tambah/terbaru', [TerbaruController::class, 'store']);

Route::post('/update/produk', [ProdukController::class, 'update']);

Route::get('/hapus/brand/{name}', [BrandController::class, 'destroy']);