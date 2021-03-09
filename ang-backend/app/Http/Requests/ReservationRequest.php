<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
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
            "business_id" => "required|exists:businesses,id",
            "venue_id" => "nullable|exists:venues,id",
            "user_id" => "required|exists:users,id",
            "date_from" => "required|date",
            "date_to" => "required|date",
            "status" => "required"
        ];
    }
}