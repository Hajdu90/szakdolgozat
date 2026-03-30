<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return response()->json(['message' => 'Felhasználó sikeresen frissítve!', 'user' => $user]);
    }


    public function updateRole(Request $request, User $user)
    {
        // Annak megakadályozása, hogy az admin levegye a saját jogosultságát
        if ($request->user()->id === $user->id && $request->input('roles') == false) {
            return response()->json(['message' => 'Saját admin jogosultságodat nem vonhatod vissza!'], 403);
        }

        $data = $request->validate([
            'roles' => ['required', 'boolean'],
        ]);

        $user->update([
            'roles' => $data['roles'],
        ]);

        return response()->json(['message' => 'Jogosultság sikeresen módosítva!', 'user' => $user]);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        // Annak megakadályozása, hogy az admin törölje saját magát
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'Saját fiókodat nem törölheted!'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Felhasználó sikeresen törölve!']);
    }

}
