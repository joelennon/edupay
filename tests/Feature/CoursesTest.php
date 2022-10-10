<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CoursesTest extends TestCase
{
    use RefreshDatabase;

    private $firstTenant;

    public function setUp(): void
    {
        parent::setUp();

        $this->firstTenant = Tenant::factory()->create();
        $this->secondTenant = Tenant::factory()->create();
    }

    /**
     * Ensure getting the courses list API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_courses_returns_correct_results()
    {
        Course::factory(15)->create(['tenant_id' => $this->firstTenant->id]);
        $url = "https://{$this->firstTenant->domain}/api/courses";

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
     * Check that only courses from the given tenant are returned.
     *
     * @return void
     *
     * @test
     */
    public function ensure_courses_not_returned_from_another_tenant()
    {
        Course::factory(15)->create(['tenant_id' => $this->firstTenant->id]);
        Course::factory(3)->create(['tenant_id' => $this->secondTenant->id]);

        $url = "https://{$this->secondTenant->domain}/api/courses";

        $response = $this->get($url);
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    /**
     * Ensure getting the courses show API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_a_course_returns_correct_result()
    {
        $course = Course::factory()->create(['tenant_id' => $this->firstTenant->id]);
        $url = "https://{$this->firstTenant->domain}/api/courses/{$course->hashid}";

        $response = $this->get($url);
        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => $course->title]);
    }

    /**
     * Ensure getting the courses show API returns only results for the given tenant.
     *
     * @return void
     *
     * @test
     */
    public function ensure_getting_a_course_only_works_for_given_tenant()
    {
        $course = Course::factory()->create(['tenant_id' => $this->firstTenant->id]);
        $url = "https://{$this->secondTenant->domain}/api/courses/{$course->hashid}";

        $response = $this->get($url);
        $response->assertStatus(404);
    }
}
