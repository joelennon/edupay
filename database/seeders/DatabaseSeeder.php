<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Joe Lennon',
            'email' => 'joe@example.com',
        ]);

        $categories = Category::factory(10)->create();

        foreach ($categories as $category) {
            Course::factory(fake()->numberBetween(10, 30))->create([
                'category_id' => $category->id,
            ]);
        }
    }
}
