<?php

namespace App\Http\Controllers\Api\V1;

use DB;
use Exception;
use OrderHelpers;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->except('updateStatus');
        $this->middleware(['auth:api','scope:admin'])->except(['show', 'store', 'updateStatus']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::with('user')->get();
        /*dd($orders[4]->pivot()->quantity);*/
        return $this->sendResponse(OrderResource::collection($orders), 'List of Orders');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderRequest $request)
    {
        if($request->validated())
        {
            try {
                //code...
                $input = $request->all();
                $user = auth()->user();

                if ($request->has('custom')) {
                    $user = User::find($input['custom']);
                }
                
                $order = new Order();
                $order->order_number = OrderHelpers::generateOrderNumber($order->id);
                $order->total_amount = OrderHelpers::calculate_total_amount($input['products']);
                $order->total_discount = OrderHelpers::calculate_total_discount($input['products']);
                $order->nap = OrderHelpers::calculate_total_amount($input['products']) - OrderHelpers::calculate_total_discount($input['products']);
                if ($request->has('description')) {
                    $order->description = $input['description'];
                }
                if ($request->has('paiement_method')) {
                    $order->paiement_method = $input['paiement_method'];
                } else {
                     $order->paiement_method = 1;
                }

                // $items= [];

                if ($order = $user->orders()->save($order)->latest()->first()) {
                    foreach ($input['products'] as $item) {
                        $product = Product::find($item['product']);
                        if ($product->qte_stock >= $item['qte']) {
                            $order->products()->attach($item['product'],['quantity'=>$item['qte']]);
                            $product->qte_stock -= $item['qte'];
                            $product->update();
                        }else{
                            $order->delete();
                            return $this->sendError($error = 'Invalid Quantity',$code = 422);
                        }
                        // $items[]=["product"=>$product, "quantity"=> $item['qte']];
                    }
                    
                    $order->save();
                    return $this->sendResponse($order,'Order created successfully');
                }
                // dd($order->with('user','products.quantity'));
            } catch (Exception $ex) {
                return $this->sendError($ex->getMessage(), [], $ex->getCode());
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  Int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        try {
            $order = Order::with('user', 'products')->find($id);
            if ($order) {
                return $this->sendResponse($order, 'Order information');
            }
            return $this->sendError("Order resource doesn't exist");
        } catch (Exception $ex) {
            return $this->sendError('Server Error', $ex->getMessage(), $ex->getCode());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        
        $validator = Validator::make($request->all(), [
            'product' => 'required|exists:products,id|integer',
            'qte' => 'required|integer',
        ]);
        
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        try {
            foreach ($order->products()->get() as $product) {
                if($product->id === $input['product']){
                    $difference = $input['qte'] - $product->pivot->quantity;

                    ($difference < 0) ? $product->qte_stock += abs($difference) : $product->qte_stock -= abs($difference);

                    $product->update();

                    $order->products()->updateExistingPivot($product->id, ['quantity' => $input['qte']]);

                    $order->total_amount = OrderHelpers::calculate_total_amount([$input]);
                    $order->total_discount = OrderHelpers::calculate_total_discount([$input]);
            
                    $order->nap = $order->total_amount - $order->total_discount;

                    $order->update();
                    // traitement
                    return $this->sendResponse($order, "Order updated successfully", 204);
                }else {
                    return $this->sendError('Error.', "Product doesn't not exist in the specific order", 404);
                }
            }
        } catch (Exception $ex) {
            return $this->sendError('Error.', $ex->getMessage(), $ex->getCode());
        }
    }

    /**
     * Update the status of specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validator = $request->validate([
            'status' => 'required|in:0,1,2'
        ], $request->all());
        $input = $request->all();
        try {
            if($order->status !=  $input['status']){
                $order->status =  $input['status'];
                $order->update();
                return $this->sendResponse($order,'Order status change successfully');
            }
            return $this->sendError('Reset Content','Order status can be change', 205);
        } catch (Exception $ex) {
            return $this->sendError('Error', $ex->getMessage(), $ex->getCode());
        }
        
    }

    /**
     * Canceled  the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function canceled(Request $request, Order $order)
    { 
        try {
            if($order->canceled !=  true){
                $order->canceled =  true;
                $order->update();
                return $this->sendResponse($order,'Order canceled successfully');
            }
            return $this->sendError('Canceled Error','Order can be canceled', 205);
        } catch (Exception $ex) {
            return $this->sendError('Error', $ex->getMessage(), $ex->getCode());
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        if ($order->delete()) {
            return $this->sendResponse($order, "Order deleted successfully");
        }
    }

    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function deleteOrderProduct(Request $request, int $orderId, int $productId)
    {
        try {
            $productOrderData = DB::table('order_product')
                        ->where('order_id', $orderId)
                        ->where('product_id', $productId)
                        ->first();

            $order = Order::findOrFail($orderId);
            if ($productOrderData !== null) {
                $product = Product::find($productId);
                $product->qte_stock += $productOrderData->quantity;
                $product->update();
            

                
                DB::table('order_product')
                            ->where('order_id', $orderId)
                            ->where('product_id', $productId)
                            ->delete();

                
                if ($order !== null) {
                    $order->total_amount -= OrderHelpers::calculate_total_amount([["product" => $productOrderData->product_id,"qte" => $productOrderData->quantity]]);
                    $order->total_discount -= OrderHelpers::calculate_total_discount([["product" => $productOrderData->product_id,"qte" => $productOrderData->quantity]]);
                    $order->nap -= OrderHelpers::calculate_total_amount([["product" => $productOrderData->product_id,"qte" => $productOrderData->quantity]])
                                 - OrderHelpers::calculate_total_discount([["product" => $productOrderData->product_id,"qte" => $productOrderData->quantity]]);
                    $order->update();
                    
                    if (!count($order->products()->get()) > 0) {    
                        $order->delete();
                    }
                }
            }
            return $this->sendResponse($order, "order line deleted successfully");
        } catch (Exception $ex) {
            return $this->sendError('Error', $ex->getMessage(), $ex->getCode());
        }
    }
}
