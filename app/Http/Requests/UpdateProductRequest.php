<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            "designation"=>"unique:products,designation",
            "price"=>"numeric",
            "qte_stock"=>"integer",
            "discount"=>"numeric",
            "featured_image"=>"image|mimes:png|max:2048",
            "description"=>"min:20",
            "status"=>"boolean",
            "in_coming"=>"boolean",
            "recommend"=>"boolean",
            "brand"=>"exists:brands,id|integer",
            "category"=>"exists:categories,id|integer",
        ];
    }
}
