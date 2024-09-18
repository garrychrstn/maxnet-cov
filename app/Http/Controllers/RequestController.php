<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Http\Requests\StoreRequestRequest;
use App\Http\Requests\UpdateRequestRequest;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Crud');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequestRequest $request)
    {
        $data = $request->validate([
            'nama' => ['required'],
            'email' => ['required'],
            'alamat' => ['required'],
            'notel' => ['required'],
            'nik' => ['required'],
            'ktp' => ['required'],
            'password' => ['required'],
            'coordinate' => ['required'],
        ]);
        $data['password'] = bcrypt($data['password']);
        Request::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateRequestRequest $request, Request $request)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
    }
};
