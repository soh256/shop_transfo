<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Image;
use App\Models\Order;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'designation',
        'price',
        'model',
        'qte_stock',
        'discount',
        'featured_image',
        'description',
        'in_coming',
        'recommend',
        'status',
    ];

    public static function booted()
    {
        static::addGlobalScope('status', function(Builder $builder){
            $builder->where('status',true);
        });
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }


}
