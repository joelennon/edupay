<?php

namespace App\View\Components\Forms;

use Illuminate\View\Component;

class Input extends Component
{
    /**
     * The type of the input field.
     *
     * @var string
     */
    public $type;

    /**
     * The name of the input field.
     *
     * @var string
     */
    public $name;

    /**
     * The ID of the input field.
     *
     * @var string
     */
    public $id;

    /**
     * The label of the input field.
     *
     * @var string
     */
    public $label;

    /**
     * The placeholder of the input field.
     *
     * @var string
     */
    public $placeholder;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $name, string $id, string $label, string $placeholder, string $type = 'text')
    {
        $this->type = $type;
        $this->name = $name;
        $this->id = $id;
        $this->label = $label;
        $this->placeholder = $placeholder;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.forms.input');
    }
}
