<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Business;
use Faker\Generator as Faker;
use App\Model\Plan;
use App\Model\BusinessType;
$factory->define(Business::class, function (Faker $faker) {
    $title = $faker->company;
    $slug = str_slug($title);
    return [
        'logo' => $faker->randomElement(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg']),
        'plan_id' => function(){
            return Plan::all()->random();
        },
        'business_type_id'=>  function(){
            return BusinessType::all()->random();
        },
        'title' => $title,
        'slug' => $slug,
        'status' => $faker->numberBetween(0, 1),
    ];
});
