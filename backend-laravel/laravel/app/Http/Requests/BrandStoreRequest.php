<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array{
        return [
            'name'=>['required','string', 'min:3'], 
            'description'=>['required', 'string'],
            'image'=>['required', 'image', 'mimes:jpeg,jpg,png', 'max:3000']
        ];
    }

    public function messages(): array{
        return [
            "name.required"=>"Nama tidak valid!",
            "description.required"=> "Deksripsi tidak valid!",
            "image.required"=> "Gambar belum dimasukkan!"
        ];
    }
}
