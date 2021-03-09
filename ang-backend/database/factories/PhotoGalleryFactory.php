<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Business;
use App\Model\PhotoGallery;
use App\Model\Place;
use Faker\Generator as Faker;

$factory->define(PhotoGallery::class, function (Faker $faker) {
    return [
        'imagepath' => $faker->imageUrl($width = 640, $height = 480),
        'place_id' => function(){
            return Place::all()->random();
        },
        'business_id' => function(){
            return Business::all()->random();
        },
    ];
});
