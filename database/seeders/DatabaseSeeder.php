<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Course;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

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
            'name' => 'Douglas Community School',
            'domain' => 'douglas.edupay.test',
        ]);

        User::factory()->create([
            'tenant_id' => $firstTenant->id,
            'name' => 'Joe Lennon',
            'email' => 'joe@example.com',
        ]);

        $categories = [[
            'name' => 'Learn a Language',
            'description' => 'Beginners Level 1 will be held in the Autumn term, Level 2 in the Spring term and Level 3 in the Summer term if demand exists.',
            'courses' => [[
                'code' => 'L01',
                'title' => 'Italian — Beginners',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:15',
                'end_time' => '21:15',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => null,
                'new' => false,
            ], [
                'code' => 'L02',
                'title' => 'Italian — Intermediate',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:15',
                'end_time' => '21:15',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => 'Margherita Bucci',
                'new' => false,
            ], [
                'code' => 'L03',
                'title' => 'German — Beginners',
                'subtitle' => null,
                'description' => null,
                'day' => 'Tuesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => null,
                'new' => false,
            ], [
                'code' => 'L04',
                'title' => 'Spanish — Beginners',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '14:30',
                'end_time' => '16:30',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => 'Felix Monje',
                'new' => false,
            ], [
                'code' => 'L05',
                'title' => 'Spanish — Beginners Level 2',
                'subtitle' => null,
                'description' => null,
                'day' => 'Tuesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => 'Felix Monje',
                'new' => false,
            ], [
                'code' => 'L06',
                'title' => 'Spanish - Intermediate',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => 'Felix Monje',
                'new' => false,
            ], [
                'code' => 'L07',
                'title' => 'English as a 2nd Language',
                'subtitle' => null,
                'description' => null,
                'day' => 'Tuesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 11000,
                'tutor' => null,
                'new' => false,
            ]],
        ], [
            'name' => 'Arts and Crafts',
            'description' => null,
            'courses' => [[
                'code' => 'A01',
                'title' => 'Creative Arts/Crafts',
                'subtitle' => null,
                'description' => 'Learn a new craft each week upcycling items from around the house. No experience required.',
                'day' => 'Tuesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '5 weeks',
                'fee_cents' => 6000,
                'tutor' => 'Maree O Sullivan',
                'new' => true,
            ], [
                'code' => 'A02',
                'title' => 'Christmas Arts/Crafts',
                'subtitle' => 'Starts 1st of November',
                'description' => 'Learn a new craft each week, ideal for gifts, or décor for your home. Fun class for all.',
                'day' => 'Tuesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '5 weeks',
                'fee_cents' => 6000,
                'tutor' => 'Maree O Sullivan',
                'new' => true,
            ], [
                'code' => 'A03',
                'title' => 'Floribunda Workshop',
                'subtitle' => null,
                'description' => 'Get inspired by nature! Join certified horticulturalist and award winning artist Ros and Sophie Longwill in this series of workshops that combines the joy of creativity with a passion for plants. Students will gain gardening knowledge and a variety of artistic skills to create their own bespoke Floribunda Art Book.',
                'day' => 'Wednesday',
                'start_time' => '18:30',
                'end_time' => '20:30',
                'duration' => '8 weeks',
                'fee_cents' => 9000,
                'tutor' => null,
                'new' => true,
            ], [
                'code' => 'A04',
                'title' => 'Watercolour Painting Beginners / Intermediate',
                'subtitle' => null,
                'description' => 'This course will introduce students step-by-step to all skills and techniques needed to begin in Watercolour Painting. Lessons will range from picking the correct paper to work on and materials to use, to laying out a composition through drawing and underpainting, to colour theory and application of the painted layer.',
                'day' => 'Tuesday',
                'start_time' => '19:15',
                'end_time' => '21:15',
                'duration' => '10 weeks',
                'fee_cents' => 10000,
                'tutor' => 'Andrew Carroll',
                'new' => true,
            ], [
                'code' => 'A05',
                'title' => 'Life Drawing - Foundation',
                'subtitle' => null,
                'description' => 'This course will introduce students to the various aspects of Life Drawing, from beginning with systems of proportions of the body, to blocking in the basic masses of the figure, to \'negative\' shapes, and many more.',
                'day' => 'Wednesday',
                'start_time' => '19:15',
                'end_time' => '21:15',
                'duration' => '10 weeks',
                'fee_cents' => 10000,
                'tutor' => 'Andrew Carroll',
                'new' => true,
            ], [
                'code' => 'A06',
                'title' => 'Oil Painting - Beginners / Intermediate',
                'subtitle' => null,
                'description' => 'Paint a variety of subjects following simple demonstrations. This class is open to both beginners and intermediates. Beginners will learn the basic techniques of oil painting while intermediates can develop their skills learned from previous terms.',
                'day' => 'Tuesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Roberto Garcia',
                'new' => false,
            ], [
                'code' => 'A06',
                'title' => 'Oil Painting - Advanced',
                'subtitle' => null,
                'description' => 'This is a group class open to everyone that want to accomplish their own paintings with the help of individual tuition.',
                'day' => 'Wednesday',
                'start_time' => '14:00',
                'end_time' => '16:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Roberto Garcia',
                'new' => false,
            ], [
                'code' => 'A07',
                'title' => 'Ceramics - Beginners',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Roberto Garcia',
                'new' => false,
            ], [
                'code' => 'A08',
                'title' => 'Creative Flowers',
                'subtitle' => null,
                'description' => 'Create floral décor for weddings/parties or for the person who just loves flowers.',
                'day' => 'Wednesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '5 weeks',
                'fee_cents' => 6000,
                'tutor' => 'Maree O Sullivan',
                'new' => false,
            ], [
                'code' => 'A09',
                'title' => 'Christmas Flowers',
                'subtitle' => 'Starts 2nd of November',
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:30',
                'end_time' => '21:30',
                'duration' => '5 weeks',
                'fee_cents' => 6000,
                'tutor' => 'Maree O Sullivan',
                'new' => false,
            ], [
                'code' => 'A10',
                'title' => 'Drawing & Acrylics - Beginners / Improvers',
                'subtitle' => null,
                'description' => 'Pencil. ink, charcoal, acrylics and washes.',
                'day' => 'Tuesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Aoife Layton',
                'new' => false,
            ], [
                'code' => 'A11',
                'title' => 'Advanced Art Group',
                'subtitle' => null,
                'description' => 'For those with previous experience of pencil, ink, charcoal, washes and acrylics seeking to perfect their techniques.',
                'day' => 'Wednesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Aoife Layton',
                'new' => false,
            ], [
                'code' => 'A12',
                'title' => 'Beginners Pastels / Pastel Pencils',
                'subtitle' => null,
                'description' => null,
                'day' => 'Tuesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Gemma Sheehy',
                'new' => false,
            ], [
                'code' => 'A13',
                'title' => 'Pastels Continuation',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:00',
                'end_time' => '21:30',
                'duration' => '10 weeks',
                'fee_cents' => 13000,
                'tutor' => 'Gemma Sheehy',
                'new' => false,
            ]],
        ], [
            'name' => 'Health and Wellness',
            'description' => 'For Yoga, Pilates and Tai Chi, you should bring your own mat or blanket. You should seek medical advice if you have not taken exercise in recent times.',
            'courses' => [[
                'code' => 'W01',
                'title' => 'Gentle Chair Yoga - Beginners',
                'subtitle' => null,
                'description' => 'A very low intensity class designed to introduce you to Yoga at a gentle pace. Accessible to all ages and abilities.',
                'day' => 'Tuesday',
                'start_time' => '18:30',
                'end_time' => '19:30',
                'duration' => '10 weeks',
                'fee_cents' => 8000,
                'tutor' => 'Margherita Bucci',
                'new' => true,
            ], [
                'code' => 'W02',
                'title' => 'Vinyasa Yoga Beginners / Intermediate',
                'subtitle' => null,
                'description' => 'Vinyasa yoga is a creative form of yoga where poses are linked together with the breath in a flowing equence. The peculiarity of Vinyasa yoga is the variety. There is no fixed sequence in Vinyasa yoga, so the style, poses and intensity will vary in every class.',
                'day' => 'Tuesday',
                'start_time' => '19:40',
                'end_time' => '21:00',
                'duration' => '10 weeks',
                'fee_cents' => 9000,
                'tutor' => 'Margherita Bucci',
                'new' => true,
            ], [
                'code' => 'W03',
                'title' => 'Yin Yoga Meditation Beginners / Intermediate',
                'subtitle' => null,
                'description' => 'Yin Yoga is a meditative practice which is a wonderful aid in teaching us how to stop, look in and listen deeply. Give yourself mini vacation\'s from the extremely busy, conditioned mind. You will learn to breathe better and each session will end with a short mediation practice. Suitable for everybody! Things to have for practice - Mat, blanket, cushion.',
                'day' => 'Tuesday',
                'start_time' => '19:00',
                'end_time' => '20:30',
                'duration' => '10 weeks',
                'fee_cents' => 9000,
                'tutor' => 'Lisa Keating',
                'new' => true,
            ], [
                'code' => 'W04',
                'title' => 'Yin Yoga Meditation Beginners / Intermediate',
                'subtitle' => null,
                'description' => 'Yin Yoga is a meditative practice which is a wonderful aid in teaching us how to stop, look in and listen deeply. Give yourself mini vacation\'s from the extremely busy, conditioned mind. You will learn to breathe better and each session will end with a short mediation practice. Suitable for everybody! Things to have for practice - Mat, blanket, cushion.',
                'day' => 'Wednesday',
                'start_time' => '14:30',
                'end_time' => '15:30',
                'duration' => '10 weeks',
                'fee_cents' => 8000,
                'tutor' => 'Lisa Keating',
                'new' => true,
            ], [
                'code' => 'W05',
                'title' => 'An Introduction to Yoga Beginners',
                'subtitle' => null,
                'description' => 'Enjoy a “taster” class in a number of Yoga disciplines to explore a style that suits you. Using a mixture of body work, relaxation and breath work, introducing and exploring yoga in its various forms, to help you find a style and level of yoga that you may wish to follow.',
                'day' => 'Wednesday',
                'start_time' => '19:30',
                'end_time' => '20:45',
                'duration' => '10 weeks',
                'fee_cents' => 9000,
                'tutor' => 'Hazel Moon',
                'new' => true,
            ], [
                'code' => 'W06',
                'title' => 'Mindfulness Based Creativity for Stress Reduction',
                'subtitle' => null,
                'description' => 'This course will combine Mindfulness practices with different forms of creative expression. Participants will learn various techniques that when combined with Art can be both relaxing and beneficial for using on a daily basis to reduce stress. No Artistic experience required.',
                'day' => 'Wednesday',
                'start_time' => '14:30',
                'end_time' => '16:30',
                'duration' => '10 weeks',
                'fee_cents' => 9000,
                'tutor' => 'Roisin Kenny (Mind Body Ireland)',
                'new' => false,
            ], [
                'code' => 'W07',
                'title' => 'Mat Pilates Beginners/Intermediate',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '18:30',
                'end_time' => '19:30',
                'duration' => '10 weeks',
                'fee_cents' => 8000,
                'tutor' => null,
                'new' => false,
            ], [
                'code' => 'W08',
                'title' => 'Mat Pilates Beginners',
                'subtitle' => null,
                'description' => null,
                'day' => 'Wednesday',
                'start_time' => '19:30',
                'end_time' => '20:30',
                'duration' => '10 weeks',
                'fee_cents' => 8000,
                'tutor' => null,
                'new' => false,
            ], [
                'code' => 'W09',
                'title' => 'Tai Chi Beginners/Improvers',
                'subtitle' => null,
                'description' => 'For stress relief, relaxation, well-being, meditation, self-defence, chi development, inner balance, self confidence, health and fitness.',
                'day' => 'Wednesday',
                'start_time' => '19:00',
                'end_time' => '18:30',
                'duration' => '10 weeks',
                'fee_cents' => 9000,
                'tutor' => 'Maurice Shanahan',
                'new' => false,
            ]],
        ],
            'Sports and Exercise',
            'Hobby and Skills',
        ];

        foreach ($categories as $category) {
            if (is_string($category)) {
                $c = Category::factory()->create([
                    'tenant_id' => $firstTenant->id,
                    'name' => $category,
                ]);

                Course::factory(fake()->numberBetween(10, 30))->create([
                    'tenant_id' => $firstTenant->id,
                    'category_id' => $c->id,
                ]);
            } else {
                $c = Category::factory()->create(array_merge(Arr::only($category, ['name', 'description']), ['tenant_id' => $firstTenant->id]));

                foreach ($category['courses'] as $course) {
                    Course::factory()->create(array_merge($course, [
                        'tenant_id' => $firstTenant->id,
                        'category_id' => $c->id,
                    ]));
                }
            }
        }

        $secondTenant = Tenant::factory()->create([
            'name' => 'Ashton School',
            'domain' => 'ashton.edupay.test',
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
