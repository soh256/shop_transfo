<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

/**
 * display helpers for orders
 */
class OrderHelpers
{
	

	public static function calculate_total_amount(array $data):float
	{
		$total = 0;
		foreach ($data as $item) {
			$price =  DB::table('products')->where('id', $item["product"])->value('price');
			$qte = $item["qte"];
			$total += (float) $price * $qte;
		}
		return $total;
	}
	
	public static function calculate_total_discount(array $data):float
	{
		$discount = 0;
		foreach ($data as $item) {
			$d =  DB::table('products')->where('id', $item["product"])->select('price', 'discount')->get();
			$productDiscount = ($d[0]->price * $d[0]->discount) / 100;
			$qte = $item["qte"];
			$discount += (float) $productDiscount * $qte;
		}
		
		return $discount;
	}

	public static function generateOrderNumber($orderId):string
	{
		return "CMD" . strtoupper(substr(md5(microtime()), 0, 7)) . $orderId;;
	}
}