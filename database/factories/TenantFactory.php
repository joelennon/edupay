<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->company(),
            'domain' => fake()->domainWord().'.'.config('app.root_domain'),
            'color' => fake()->randomElement(['blue', 'green', 'pink', 'red', 'orange', 'cyan', 'teal', 'purple', 'indigo']),
        ];
    }
}
