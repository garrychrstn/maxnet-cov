<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class UserController extends Controller
{
    public function login(Request $r)
    {
        $user = $r->validate([
            'name' => 'required',
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

    public function register(Request $r)
    {
        $req = $r->validate([
            'name' => 'required|unique:users,name',
            'email' => 'required|unique:users,email',
            'password' => 'required'
        ]);

        $req['password'] = bcrypt($req['password']);
        User::create($req);
        return back()->with('success', 'success regis');
    }
    public function showreg()
    {
        return inertia('Register');
    }
    public function showlogin()
    {
        return inertia('Login');
    }
}
