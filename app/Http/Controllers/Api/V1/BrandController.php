<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use Validator;
use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\BaseController as Controller;
use App\Http\Resources\BrandResource;

class BrandController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','scope:admin'])->except(['index', 'show']);
    }

    /**
     *
     * Display a listing of the brand.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = BrandResource::collection(Brand::all());
        return $this->sendResponse($brands, 'Brans List');
    }

    /**
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        // dd($req->all());
        $validator = Validator::make($req->all(), [
            'name' => 'required|unique:brands,name',
            'logo' => 'required|mimes:png|max:1000'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $req->all();
        try {
            $name = $req->input('name');
            $filePath = $req->file('logo')->store('upload/brand');
            $brand = new Brand();

            $brand->name = $name;
            $brand->logo = $filePath;
            $brand->save();

            return $this->sendResponse(new BrandResource($brand), 'Brand created successfully');
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     *
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $brand = Brand::find($id);
            if ($brand) {
                return $this->sendResponse(new BrandResource($brand), 'Brand information');
            }
            return $this->sendError("Brand resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     *
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $req
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'unique:brands,name',
            'logo' => 'mimes:png|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        try {
            $brand = Brand::find($id);
            if ($brand) {
                $filePath = $req->file('logo') ? $req->file('logo')->store('upload/brand') : null;
                // dd(file_exists($brand->logo) && !is_null($filePath));
                /**
                 * check if file image of logo exist
                 * delete it if exist
                 */
                if (file_exists($brand->logo) && !is_null($filePath)) {
                    @unlink($brand->logo);
                }

                $brand->name = is_null($req->input('name')) ? $brand->name : $req->input('name');
                $brand->logo = is_null($filePath) ? $brand->logo : $filePath;
                $brand->save();
                return $this->sendResponse(new BrandResource($brand), 'Brand updated successfully');
            }
            return $this->sendError("Brand resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     *
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $brand = Brand::find($id);

            if ($brand) {

                /**
                 * check if file image of logo exist
                 * delete it if exist
                 */
                if (file_exists($brand->logo)) {
                    @unlink($brand->logo);
                }

                /**
                 * after logo file deleted then delete brand
                 */
                $brand->delete();
                return $this->sendResponse(new BrandResource($brand), "Brand deleted successfully");
            }
            return $this->sendError("Brand resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
