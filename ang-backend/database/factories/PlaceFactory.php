<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Place;
use App\Model\Location;
use App\Model\Business;
use Faker\Generator as Faker;

$factory->define(Place::class, function (Faker $faker) {
    $title = $faker->companySuffix;
    $slug = str_slug($title);
    return [
        'location_id' => function(){
            return Location::all()->random();
        },
        'business_id'=>  function(){
            return Business::all()->random();
        },
        'title' => $title,
        'slug' => $slug,
        'address' => $faker->streetAddress,

    ];
});
