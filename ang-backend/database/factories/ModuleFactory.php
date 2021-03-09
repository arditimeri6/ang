<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Module;
use Faker\Generator as Faker;

$factory->define(Module::class, function (Faker $faker) {
    return [
        'title' => $faker->randomElement(['Text box', 'Photo Gallery', 'Video Gallery', 'Places', 'Plans', 'Banner', 'Calendar', 'Event']),
    ];
});
