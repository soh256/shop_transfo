<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'description'=>'min:5',
            'paiement_method'=>'in:1,2,3',
            'paie_amount'=>'numeric',
            'custom'=>'integer',
            'status'=>'in:0,1,2',
            'products'=>'required|array',
            'products.*.product'=>'required|exists:products,id|integer',
            'products.*.qte'=>'required|integer',
        ];
    }
}
