<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    private $categories;
    private $courses;

    protected function setUp(): void
    {
        parent::setUp();

        $this->categories = Category::factory(20)->create();
    }

    /**
     * Ensure getting categories API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_categories_list_returns_correct_results()
    {
        $response = $this->get('/api/categories');

        $response->assertStatus(200);
        $response->assertJsonCount(20);
    }

    /**
     * Ensure getting the category courses API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_category_courses_returns_correct_results()
    {
        $category = $this->categories->first();
        Course::factory(15)->create(['category_id' => $category->id]);
        $url = "/api/categories/{$category->hashid}/courses";

        $response = $this->get($url);
        $response->assertStatus(200);
        $response->assertJsonCount(10, 'data');

        $nextPageUrl = url($url).'?page=2';
        $response->assertJsonFragment(['next_page_url' => $nextPageUrl]);

        $response = $this->get($nextPageUrl);
        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        $response->assertJsonFragment(['next_page_url' => null]);

        $response = $this->get($url.'?query=foo');
        $response->assertStatus(200);
    }
}
