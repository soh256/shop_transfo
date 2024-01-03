<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Image;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::Factory(100)->create()->each(function($product){
            $images = Image::Factory(rand(4,10))->make();
            $product->images()->saveMany($images);
        });
    }
}
