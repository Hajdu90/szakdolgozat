<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        //role: true(1) = admin | false(0) = user
        if(!$user || !$user->roles) {
            return response()->json([
                'message' => 'Nincs jogosultságod ehhez a művelethez!',
            ], 403);
        }
        
        return $next($request);
    }
}
