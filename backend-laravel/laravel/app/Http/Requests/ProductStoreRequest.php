<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name"=>["required", "string"],
            "pricelist"=>["nullable","string"],
            "onlinePrice"=>["nullable","string"],
            "offlinePrice"=>["nullable","string"],
            "promo"=>["nullable", "string"],
            "brand"=>["required","string"],
            "kategori"=>["required","string"],
            "url"=>["required","string"],
            "description"=>["required","string"],
            "panjang"=>["nullable", "string"],
            "lebar"=>["nullable", "string"],
            "tinggi"=>["nullable", "string"],
            "berat"=>["nullable", "string"],
            "images.*"=>["required", "image", "mimes:jpg,jpeg,png", "max:3000"],
            "stock"=>["nullable","string"]
        ];
    }
}
