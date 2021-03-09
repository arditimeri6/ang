<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Location;
use Faker\Generator as Faker;

$factory->define(Location::class, function (Faker $faker) {
    return [
        'title' => $faker->companySuffix
    ];
});
