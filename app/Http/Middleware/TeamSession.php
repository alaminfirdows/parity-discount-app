<?php

namespace App\Http\Middleware;

use App\Services\TeamDiscoveryService;
use Closure;
use Illuminate\Http\Response;
use Inertia\Inertia;
use SmartAi\Extensions\Billing\Services\BillingControlService;

class TeamSession
{
    public function handle($request, Closure $next)
    {
        if (!auth()->check()) {
            $this->handleInvalidTenantSession();
        }

        $currentTeam = auth()->user()->currentTeam;

        app(TeamDiscoveryService::class)->setCurrentTeam($currentTeam);

        return $next($request);
    }

    protected function handleInvalidTenantSession()
    {
        abort(Response::HTTP_UNAUTHORIZED);
    }
}
