<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Course;
use App\Models\Tenant;
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
        $firstTenant = Tenant::factory()->create([
            'name' => 'Monday School',
            'domain' => 'monday.edupay.test',
        ]);

        User::factory()->create([
            'tenant_id' => $firstTenant->id,
            'name' => 'Joe Lennon',
            'email' => 'joe@example.com',
        ]);

        $categoryNames = [
            'Learn a Language',
            'Arts and Crafts',
            'Health and Wellness',
            'Sports and Exercise',
            'Hobby and Skills',
            'Social and Development',
            'Community Education',
        ];

        foreach ($categoryNames as $categoryName) {
            $category = Category::factory()->create([
                'tenant_id' => $firstTenant->id,
                'name' => $categoryName,
            ]);

            Course::factory(fake()->numberBetween(10, 30))->create([
                'tenant_id' => $firstTenant->id,
                'category_id' => $category->id,
            ]);
        }

        $secondTenant = Tenant::factory()->create([
            'name' => 'Hello World',
            'domain' => 'hello.edupay.test',
        ]);

        User::factory()->create([
            'tenant_id' => $secondTenant->id,
        ]);

        $categories = Category::factory(10)->create([
            'tenant_id' => $secondTenant->id,
        ]);

        foreach ($categories as $category) {
            Course::factory(fake()->numberBetween(10, 30))->create([
                'tenant_id' => $secondTenant->id,
                'category_id' => $category->id,
            ]);
        }
    }
}
