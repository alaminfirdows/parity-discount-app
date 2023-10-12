<?php

declare(strict_types=1);

namespace App\Services;

use App\Exceptions\TeamNotSetException;
use App\Models\Team;
use Illuminate\Cache\Repository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

final class TeamDiscoveryService
{
    public static function currentTeam()
    {
        if (!app()->has(APP_CURRENT_TEAM)) {
            throw new TeamNotSetException('No team set');
        }

        return app()->get(APP_CURRENT_TEAM);
    }

    public static function setCurrentTeam(Team $team)
    {
        app()->forgetInstance(APP_CURRENT_TEAM);
        app()->instance(APP_CURRENT_TEAM, $team);
    }

    public static function cache(): Repository
    {
        if (!Config::has('cache.stores.team')) {
            Config::set('cache.stores.team', array_merge(
                config('cache.stores.' . config('cache.default')),
                ['prefix' => app()->get(APP_CURRENT_TEAM)->id]
            ));
        }

        return Cache::store('team');
    }
}
