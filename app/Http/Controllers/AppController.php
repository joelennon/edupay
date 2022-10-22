<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthUser;
use App\Http\Resources\BasicTenant;
use App\Models\Tenant;
use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $tenant = $request->tenant;
        $color = $this->getTenantColorRgbValue($tenant);

        $rootBaseUrl = $request->getScheme().'://'.config('app.root_domain');

        return view('app')->with([
            'user' => $user ? new AuthUser($user) : null,
            'tenant' => new BasicTenant($tenant),
            'color' => $color,
            'rootBaseUrl' => $rootBaseUrl,
        ]);
    }

    private function getTenantColorRgbValue(Tenant $tenant)
    {
        switch ($tenant->color) {
            case 'red': return '220 38 38';
            case 'orange': return '234 88 12';
            case 'amber': return '217 119 6';
            case 'yellow': return '202 138 4';
            case 'lime': return '101 163 13';
            case 'green': return '22 163 74';
            case 'emerald': return '5 150 105';
            case 'teal': return '13 148 136';
            case 'cyan': return '8 145 178';
            case 'sky': return '2 132 199';
            case 'blue': return '37 99 235';
            case 'indigo': return '79 70 229';
            case 'violet': return '124 58 237';
            case 'purple': return '147 51 234';
            case 'fuchsia': return '192 38 211';
            case 'pink': return '219 39 119';
            case 'rose': return '225 29 72';
            default: return '8 145 178';
        }
    }
}
