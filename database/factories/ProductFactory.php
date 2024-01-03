<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "designation"=>$this->faker->sentence(5),
            "price"=>$this->faker->numberBetween(500,10000),
            "qte_stock"=>$this->faker->numberBetween(10,100),
            "discount"=>0,
            "featured_image"=>"http://lorempixel.com/400/200/technics/",
            "description"=>$this->faker->realText(rand(20,200)),
             "brand_id"=>function(){
                 return Brand::inRandomOrder()->first()->id;
             },
            "category_id"=>function(){
                return Category::inRandomOrder()->first()->id;
            },
            "status"=>$this->faker->boolean() ,
        ];
    }
}
