<?php

namespace Tests\Unit;

use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Check that a course has an accurate string representration of the fee.
     *
     * @return void
     *
     * @test
     */
    public function a_course_has_a_fee_attribute_that_is_the_cents_figure_divided_by_100()
    {
        $course = Course::factory()->make(['fee_cents' => '17900']);
        $this->assertSame($course->fee, '179');

        $course = Course::factory()->make(['fee_cents' => '20099']);
        $this->assertSame($course->fee, '200.99');
    }

    /**
     * Check that euro currency courses return the euro symbol.
     *
     * @return void
     *
     * @test
     */
    public function a_course_in_euro_currency_returns_the_euro_symbol()
    {
        $course = Course::factory()->make(['fee_currency' => 'EUR']);
        $this->assertSame($course->currency, '€');
    }

    /**
     * Check that a course has a slug attribute based on its title.
     *
     * @return void
     *
     * @test
     */
    public function a_course_has_a_slug_attribute_from_its_title()
    {
        $course = Course::factory()->make(['title' => 'A simple lesson']);
        $this->assertSame($course->slug, 'a-simple-lesson');

        $course = Course::factory()->make(['title' => 'A weird - lesson. with some * punctuation...']);
        $this->assertSame($course->slug, 'a-weird-lesson-with-some-punctuation');
    }

    /**
     * Check that a course returns a URL attribute in the correct format.
     *
     * @return void
     *
     * @test
     */
    public function a_course_has_the_correct_structure_for_its_url()
    {
        $course = Course::factory()->make(['hashid' => 'xyz123', 'title' => 'A simple lesson']);
        $this->assertSame($course->url, '/courses/a-simple-lesson-xyz123');

        $course = Course::factory()->make(['hashid' => 'a1b2c3', 'title' => 'A weird - lesson. with some * punctuation...']);
        $this->assertSame($course->url, '/courses/a-weird-lesson-with-some-punctuation-a1b2c3');
    }

    /**
     * Check that a course's new label always returns a boolean value.
     *
     * @return void
     *
     * @test
     */
    public function a_course_should_return_its_new_label_as_a_boolean_value()
    {
        $course = Course::factory()->make(['new' => 1]);
        $this->assertSame($course->new, true);

        $course = Course::factory()->make(['new' => 0]);
        $this->assertSame($course->new, false);

        $course = Course::factory()->make(['new' => true]);
        $this->assertSame($course->new, true);

        $course = Course::factory()->make(['new' => false]);
        $this->assertSame($course->new, false);
    }

    /**
     * Check that saving a new course generates a hashid value.
     *
     * @return void
     *
     * @test
     */
    public function creating_a_new_course_should_generate_a_hashid()
    {
        $course = Course::factory()->create();

        $this->assertNotNull($course->hashid);
    }
}
