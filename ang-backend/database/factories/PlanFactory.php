<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Plan;
use Faker\Generator as Faker;

$factory->define(Plan::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement(['Free', 'Plus', 'Premium', 'Starter', 'Brand', 'Gold', 'VIP']),
        'description' => $faker->realText($maxNbChars = 200, $indexSize = 2),
        'price' => $faker->numberBetween(100, 1000),
        'active' => $faker->numberBetween(0,1)
    ];
});
