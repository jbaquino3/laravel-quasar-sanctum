<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller {
    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);
 
        if (\Auth::attempt($credentials)) { 
            $user = $request->user();
            $user->token = $user->createToken(\Str::uuid())->plainTextToken;
            return response($user, 200);
        }
 
        return response()->json(["message" => "Incorrect password."], 401);
    }

    public function register(Request $request) {
        $form = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if($request->confirmation != $form->password) {
            return response()->json(["message" => "Passwords do not match."], 422);
        }

        $user = User::create([
            "name" => $form->name,
            "email" => $form->email,
            "password" => \Hash::make($form->password)
        ]);

        if(!$user) {
            return response()->json(["message" => "There was problem while creating your account."], 500);
        }

        return response()->json($user);
    }
}
