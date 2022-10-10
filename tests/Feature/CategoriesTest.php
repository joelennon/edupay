<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Course;
use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    private $categories;
    private $firstTenant;
    private $secondTenant;

    protected function setUp(): void
    {
        parent::setUp();

        $this->firstTenant = Tenant::factory()->create();
        $this->secondTenant = Tenant::factory()->create();
        $this->categories = Category::factory(20)->create(['tenant_id' => $this->firstTenant->id]);
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
        $response = $this->get("https://{$this->firstTenant->domain}/api/categories");

        $response->assertStatus(200);
        $response->assertJsonCount(20);
    }

    /**
     * Enure that only categories for the given tenant are returned by the API.
     *
     * @return void
     *
     * @test
     */
    public function should_only_return_categories_for_given_tenant()
    {
        $categories = Category::factory(5)->create(['tenant_id' => $this->secondTenant->id]);
        $response = $this->get("https://{$this->secondTenant->domain}/api/categories");

        $response->assertStatus(200);
        $response->assertJsonCount(5);
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
        $url = "https://{$this->firstTenant->domain}/api/categories/{$category->hashid}/courses";

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

    /**
     * Enure that only categories for the given tenant are returned by the API.
     *
     * @return void
     *
     * @test
     */
    public function should_only_return_courses_for_a_category_in_the_given_tenant()
    {
        $category = $this->categories->first();
        $url = "https://{$this->secondTenant->domain}/api/categories/{$category->hashid}/courses";

        $response = $this->get($url);
        $response->assertStatus(404);
    }
}
