<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Check that a category has a slug attribute based on its title.
     *
     * @return void
     *
     * @test
     */
    public function a_category_has_a_slug_attribute_from_its_title()
    {
        $category = Category::factory()->make(['name' => 'Just a category']);
        $this->assertSame($category->slug, 'just-a-category');

        $category = Category::factory()->make(['name' => 'A weird - category. with some * punctuation...']);
        $this->assertSame($category->slug, 'a-weird-category-with-some-punctuation');
    }

    /**
     * Check that a category returns a URL attribute in the correct format.
     *
     * @return void
     *
     * @test
     */
    public function a_category_has_the_correct_structure_for_its_url()
    {
        $category = Category::factory()->make(['hashid' => 'xyz123', 'name' => 'Just a category']);
        $this->assertSame($category->uri, '/categories/just-a-category-xyz123');

        $category = Category::factory()->make(['hashid' => 'a1b2c3', 'name' => 'A weird - category. with some * punctuation...']);
        $this->assertSame($category->uri, '/categories/a-weird-category-with-some-punctuation-a1b2c3');
    }

    /**
     * Check that a category can have zero, one or many courses.
     *
     * @return
     *
     * @test
     */
    public function a_category_can_have_zero_to_many_courses()
    {
        $category = Category::factory()->create();
        $this->assertCount(0, $category->courses);

        $course = Course::factory()->create(['category_id' => $category->id]);
        $this->assertCount(1, $category->fresh()->courses);

        $course = Course::factory(10)->create(['category_id' => $category->id]);
        $this->assertCount(11, $category->fresh()->courses);
    }
}
