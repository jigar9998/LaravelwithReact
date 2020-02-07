<?php

namespace App\Http\Controllers;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    protected function register(Request $request )
    {
        $this-> validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $data =  User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        return response()->json('Successfully added');
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */


    protected function login(Request $request){
        $remember = $request->get('rememberme') ? true : false;
        $user = Auth::attempt(['email' => $request->email, 'password' => $request->password] , $remember);
        if ($user) {
            $user_data = User::all()->where('email', $request->email );
            // Authentication passed...
            return response()->json(Auth::user());
        }else{
            
        }
    }   
    protected function logout(Request $request) {
        Auth::logout();
        
        return response()->json('logout Successfully');
    }
}
