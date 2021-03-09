<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Model\EventType;
use Faker\Generator as Faker;

$factory->define(EventType::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement(['Seminar', 'Conference', 'Trade Show', 'Workshop', 'Reunion', 'Party', 'Gala', 'Wedding']),
    ];
});
