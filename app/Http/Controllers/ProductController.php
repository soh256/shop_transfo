<?php

namespace App\Http\Controllers\Api\V1;

use Validator;
use Exception;
use App\Models\Brand;
use App\Models\Image;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class ProductController extends Controller
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
        $products = ProductResource::collection(Product::withoutGlobalScope('status')->orderBy('created_at', 'DESC')->get());
        return $this->sendResponse($products, 'List of Products');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        // dd($request->fails());
        if( $request->validated())
        {
            try {
                $input = $request->all();
                $images =$input['images'];
                $input['featured_image']=$input['featured_image']->store('upload/product');

                $brand = Brand::find($input['brand']);
                $category = Category::find($input['category']);


                unset($input['images']);
                unset($input['brand']);
                unset($input['category']);

                // dd($input);
                $product = new Product();
                $product->designation = $input['designation'];
                $product->price = $input['price'];
                $product->qte_stock = $input['qte_stock'];
                $product->discount = $input['discount'];
                $product->ratings = $input['ratings'];
                $product->description = $input['description'];
                $product->model = $input['model'];
                $product->featured_image = $input['featured_image'];
                if (key_exists('status',$input)) {
                    $product->status = $input['status'];
                }
                if (key_exists('in_coming',$input)) {
                    $product->in_coming = $input['in_coming'];
                }
                if (key_exists('recommend',$input)) {
                    $product->recommend = $input['recommend'];
                }
                $product->brand()->associate($brand);
                $product->category()->associate($category);
                $product->save();

                $imagesInstance = [];
                foreach ($images as $image) {
                    $url = $image->store('upload/product/images');
                    $image = new Image();
                    $image->url = $url;
                    $imagesInstance[] = $image;
                }

                $product->images()->saveMany($imagesInstance);


                $success = new ProductResource($product);
                return $this->sendResponse($success, 'Product created successfully.');
            } catch (Exception $ex) {
                return $this->sendError($ex->getMessage(), $ex->getMessage(), 500);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($designation)
    {
        try {
            $product = Product::withoutGlobalScope('status')->where('designation',$designation)->first();
            if ($product) {
                return $this->sendResponse(new ProductResource($product), 'Product information');
            }
            return $this->sendError("Product resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param $designation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, $designation)
    {
        try {
            $product = Product::withoutGlobalScope('status')->where("designation",$designation)->with('images')->first();
            if ($product) {
                $input = $request->all();
                unset($input['_method']);

                if (array_key_exists('featured_image', $input)) {
                    $this->deleteImage([$product->featured_image]);
                    $input['featured_image'] = $input['featured_image']->store('upload/product');
                }
                if (array_key_exists('category', $input)) {
                    $category = Category::find($input['category']);
                    $product->category()->associate($category);
                }
                if (array_key_exists('brand', $input)) {
                    $brand = Brand::find($input['brand']);
                    $product->brand()->associate($brand);
                }

                $product->update($input);

                return $this->sendResponse($product, 'Product updated successfully');
            }
            return $this->sendError('Product resource doesn\'t exist');
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
            $product = Product::withoutGlobalScope('status')->find($id);
            if ($product) {
                $images[] = $product->featured_image;

                foreach ($product->images as $image) {
                    $images[]=$image->url;
                }

                $this->deleteImage($images);

                $product->delete();
                return $this->sendResponse(new ProductResource($product), "Product deleted successfully");
            }
            return $this->sendError('Not found', "Product resource doesn't exist", 404);
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }

    private function deleteImage($images = [])
    {
        foreach ($images as $image) {
            if (file_exists($image)) {
                @unlink($image);
            }
        }
    }

    public function destroyImage(Product $product, Image $image)
    {
        $images = $product->images;

        foreach ($images as $img) {
            if($image->is($img))
            {
                $this->deleteImage([$image->url]);
                $image->delete();
                return $this->sendResponse($image, "Image deleted successfully");
            }
        }
        return $this->sendError($error = 'unable to delete image', $code=400);
    }

    public function addImages(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(),[
            'image'=>'required|image|max:1024'
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        try {
            $input = $request->all();
            $url = $input['image']->store('upload/product/images');

            $image = new Image();
            $image->url = $url;

            $product->images()->save($image);

            return $this->sendResponse($product, "Image added successfully");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
