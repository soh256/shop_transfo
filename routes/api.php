<?php

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\BrandController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\ForgotController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Http\Controllers\Api\V1\FeatureController;
use App\Http\Controllers\Api\V1\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        route::post('login', [LoginController::class, 'login'])->name('login');
        route::post('register', [RegisterController::class, 'register'])->name('register');
        route::post('forgot', [ForgotController::class, 'forgot'])->name('forgot');
        route::post('reset', [ForgotController::class, 'reset'])->name('reset');
//        route::post('password/reset/check/{token}', [ForgotController::class, 'check'])->name('check');
    });

    // Route::apiResource('brands', BrandController::class);
    Route::get('brands', [BrandController::class, 'index']);
    Route::post('brands', [BrandController::class, 'store']);
    Route::get('brands/{id}', [BrandController::class, 'show']);
    Route::post('brands/{id}', [BrandController::class, 'update']);
    Route::delete('brands/{id}', [BrandController::class, 'destroy']);

    // Route::apiResource('categories', CategoryController::class);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::get('categories/{id}', [CategoryController::class, 'show']);
    Route::post('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    // Route::apiResource('products', ProductController::class);
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{designation}', [ProductController::class, 'show']);
    Route::post('/products/{designation}', [ProductController::class, 'update']);
    Route::delete('/products/{designation}', [ProductController::class, 'destroy']);
    Route::delete('products/{product}/images/{image}',[ProductController::class, 'destroyImage']);
    Route::post('products/{product}/images',[ProductController::class, 'addImages']);

    Route::apiResource('orders', OrderController::class);

    Route::get('orders', [OrderController::class,'index']);
    Route::post('orders', [OrderController::class,'store']);
    Route::get('orders/{order}', [OrderController::class,'show']);
    Route::post('orders/{order}', [OrderController::class,'update']);
    Route::delete('orders/{order}', [OrderController::class,'destroy']);

    Route::put('orders/{order}/status', [OrderController::class,'updateStatus']);
    Route::put('orders/{order}/canceled', [OrderController::class,'canceled']);
    Route::delete('orders/{orderId}/product/{productId}/delete', [OrderController::class,'deleteOrderProduct']);

    Route::apiResource('features', FeatureController::class);

    Route::get('users',[UserController::class,'index']);
    Route::get('users/current',[UserController::class,'current']);
    Route::get('users/{user}',[UserController::class,'show']);
    Route::put('users/{user}/edit',[UserController::class,'updateAdmin']);
    Route::put('users/edit',[UserController::class,'update']);
    Route::post('users/create',[UserController::class,'create']);
});
