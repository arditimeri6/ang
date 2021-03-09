<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\BusinessType;
use Faker\Generator as Faker;

$factory->define(BusinessType::class, function (Faker $faker) {
    return [
        'title' => $faker->bs
    ];
});
