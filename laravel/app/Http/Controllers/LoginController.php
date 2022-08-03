<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller {
    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (\Auth::attempt($credentials)) { 
            $user = $request->user();
            $user->token = $user->createToken(\Str::uuid())->plainTextToken;
            return response($user, 200);
        }
 
        return response()->json(["message" => "Incorrect password."], 401);
    }
}
