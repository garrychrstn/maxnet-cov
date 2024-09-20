<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function login(Request $r) {
        $user = $r->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt($user)) {
            $r->session()->regenerate();
            
            return redirect()->intended();
        }

        return back()->withErrors([
            'username' => 'credential does not match with our record'
        ])->onlyInput('username');
    }

    public function showlogin() {
        return inertia('Login');
    }
}
