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
            // VALIDATING THAT FILE BEING SUBMITTED IS OF JPG AND PNG
            'ktp' => ['required', 'file', 'mimes:jpeg,jpg,png', 'max:2048'],
            'foto_rumah' => ['required', 'file', 'mimes:jpeg,jpg,png', 'max:2048'],
            'password' => ['required'],
            'coordinate' => ['required'],
        ]);
        // SECOND VALIDATION. 

        // FILE IS STORED INSIDE STORAGE/APP/PUBLIC/UPLOADS
        
        if ($request->hasFile('ktp')) {
            $file = $request->file('ktp');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $data['ktp'] = $filePath;
        }

        if ($request->hasFile('foto_rumah')) {
            $file = $request->file('foto_rumah');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $data['foto_rumah'] = $filePath;
        }

        $data['password'] = bcrypt($data['password']);
        Request::create($data);

        return redirect()->back()->with('success', 'data submitted');
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
