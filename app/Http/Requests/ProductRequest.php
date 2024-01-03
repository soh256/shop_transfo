<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "designation"=>"required|unique:products,designation",
            "model"=>"unique:products,model",
            "price"=>"required|numeric",
            "qte_stock"=>"required|integer",
            "discount"=>"numeric",
            "featured_image"=>"required|image|mimes:png,jpg|max:2048",
            "description"=>"required|min:20",
            "status"=>"boolean",
            "in_coming"=>"boolean",
            "recommend"=>"boolean",
            "brand"=>"required|exists:brands,id|integer",
            "category"=>"required|exists:categories,id|integer",
            "images"=>"required|array|min:2|max:10",
            "images.*"=>"image|mimes:png,jpg|max:2048",
        ];
    }
}
