<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use Validator;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','scope:admin'])->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return $this->sendResponse(CategoryResource::collection($categories), 'Categories List');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'unique:categories,name',
            'image' => 'required|mimes:png|max:1000'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $req->all();
        unset($input['_method']);
        try {
            $input['image'] = $req->file('image')->store('upload/category');
            $category = Category::create($input);
            return $this->sendResponse(new CategoryResource($category), 'Category created successfully');
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $category = Category::find($id);
            if ($category) {
                return $this->sendResponse(new CategoryResource($category), 'Category information');
            }
            return $this->sendError('Not found', "Category resource doesn't exist", 404);
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $req
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'unique:categories,name',
            'image' => 'mimes:png|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input = $req->all();
        try {
            $category = Category::find($id);
            if ($category) {

                if (array_key_exists('image', $input)) {
                    @unlink($category->image);
                    $input['image'] = $input['image']->store('upload/category');
                }
                $category->update($input);
                $category->save();
                return $this->sendResponse(new CategoryResource($category), 'Category updated successfully');
            }
            return $this->sendError('Not found', "Category resource doesn't exist", 404);
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $category = Category::find($id);
            if ($category) {
                $category->delete();
                return $this->sendResponse(new CategoryResource($category), "Category deleted successfully");
            }
            return $this->sendError("Category resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
