<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use Validator;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\FeatureReseource;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class FeatureController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','scope:admin'])->except(['index', 'show']);
    }

    
    public function index()
    {
        return $this->sendResponse(FeatureReseource::collection(Feature::all()), "Feature list");
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|url',
            'image' => 'required|mimes:jpg,png|max:1000',
            'show_header' => 'boolean',
            'status' => 'boolean'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();

        try {
            $input['image'] = $request->file('image')->store('upload/feature');
            $feature = Feature::create($input);
            return $this->sendResponse(new FeatureReseource($feature), 'Feature created successfully');
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }
   

    /**
     *
     * @param int $id
     */
    public function show($id)
    {
        try {
            $feature = Feature::find($id);
            if ($feature) {
                return $this->sendResponse(new FeatureReseource($feature), 'Feature information');
            }
            return $this->sendError('Not found', "Feature resource doesn't exist", 404);
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $feature = Feature::find($id);
            if ($feature) {
                $feature->delete();
                return $this->sendResponse(new FeatureReseource($feature), "Feature deleted successfully");
            }
            return $this->sendError("Feature resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
