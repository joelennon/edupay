<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Form extends Component
{
    public $method;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($method = 'post')
    {
        $this->method = $method;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.forms.form');
    }
}
