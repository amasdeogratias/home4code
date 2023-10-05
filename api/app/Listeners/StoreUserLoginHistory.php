<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\LoginHistory;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StoreUserLoginHistory
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(LoginHistory $event)
    {
        $userinfo = $event->user;
        $current_timestamp = Carbon::now()->toDateTimeString();

        $saveHistory = DB::table('login_history')->insert(
            [
                'name' => $userinfo->name,
                'email' => $userinfo->email,
                // 'token' => $userinfo->token,
                'created_at' => $current_timestamp,
                'updated_at' => $current_timestamp
            ]
        );

        return $saveHistory;
    }
}
