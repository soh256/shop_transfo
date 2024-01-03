<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class LoginController extends Controller
{
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            //Add Role as scope
            $userRole = $user->role()->first();
            $success['user'] =  $user;
            $success['role'] =  $userRole->role;

            // dd($user->createToken($user->email . '_' . now(), [
            //     $userRole->role
            // ])->token->expires_at);

            //Token based on user role(scope)
            $token = $user->createToken($user->email . '_' . now(), [
                $userRole->role
            ]);
            $success['token'] =  $token->accessToken;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', 'User name or password invalid');
        }
    }
}
