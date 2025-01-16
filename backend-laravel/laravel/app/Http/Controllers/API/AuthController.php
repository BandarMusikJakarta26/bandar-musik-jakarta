<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        /** @var \App\Models\User $user */
        $body = $request->validated();
        $user = User::create([
            "username"=>$body["username"],
            "password"=>bcrypt($body["password"]),
        ]);
        if($user){ 
            $token = auth()->login($user);
            return $this->responseWithToken($token, $user);
        } else {
            return $this->responseWithError("Error saat Register Akun!");
        }
        // $token = $user->createToken("accessToken")->plainTextToken;
        // info($token);
        // info($user);
        // return response()->json([ "success"=>true, "token"=>$token ]);
    }

    public function responseWithError($message){
        return response()->json([
            "success"=>false,
            "message"=>$message
        ], 500);
    }

    public function responseWithToken($token,$user){
        return response()->json([
            "success"=>true,
            "user"=>$user,
            "accessToken"=>$token,
            "type"=>"bearer"
        ], 200);
    }

    public function login(LoginRequest $request){
        /** @var \App\Models\User $user */
        $body = $request->validated();
        $token = Auth::attempt($body);
        if($token){
            return $this->responseWithToken($token,auth()->user());
        }else{
            return response()->json(['message' => 'Unauthorized!'], 401);
        }
    }

    public function logout(){
        // Auth::logout();
        $cookie = Cookie::forget('access-token');
        return response()->json(['success'=>true,'message'=> 'Berhasil Logout'],200)->withCookie($cookie);
    }

    public function setCookie(Request $request){
        $cookie = Cookie::make("access-token", $request["token"], 60 * 24, null, null, false, true, false, "Lax");
        return response()->json(["success"=>true, "token"=>$request["token"]])->withCookie($cookie);
     }

    public function getCookie(){
        $cookie = Cookie::get('access-token');
        if(!$cookie){ return response()->json(["success"=>false, "message"=>"Unauthorized!"], 200);
        }else { return response()->json(["success"=>true], 200)->withCookie($cookie); }

     }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
