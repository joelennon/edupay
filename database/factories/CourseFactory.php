<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'tenant_id' => Tenant::factory(),
            'category_id' => Category::factory(),
            'code' => strtoupper(fake()->randomLetter()).fake()->randomNumber(2),
            'title' => fake()->sentence(),
            'subtitle' => fake()->boolean(10) ? fake()->sentence() : null,
            'description' => fake()->boolean(80) ? fake()->paragraphs(fake()->numberBetween(1, 5), true) : null,
            'day' => fake()->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'duration' => fake()->randomDigit().' Weeks',
            'fee_cents' => fake()->numberBetween(50, 130) * 100,
            'fee_currency' => 'EUR',
            'tutor' => fake()->name(),
            'new' => fake()->boolean(20),
        ];
    }
}
