<?php

namespace Tests\Feature;

use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CoursesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Ensure getting the courses list API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_courses_returns_correct_results()
    {
        Course::factory(15)->create();
        $url = '/api/courses';

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
     * Ensure getting the courses show API returns correct results.
     *
     * @return void
     *
     * @test
     */
    public function getting_a_course_returns_correct_result()
    {
        $course = Course::factory()->create();
        $url = "/api/courses/{$course->hashid}";

        $response = $this->get($url);
        $response->assertStatus(200);
        $response->assertJsonFragment(['title' => $course->title]);
    }
}
