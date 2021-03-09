<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Business;
use App\Model\TextBox;
use Faker\Generator as Faker;

$factory->define(TextBox::class, function (Faker $faker) {
    $business = Business::all()->random();
    return [
        'title' => $business->title,
        'content' => $faker->catchPhrase,
        'business_id'=>  $business->id,
    ];
});
