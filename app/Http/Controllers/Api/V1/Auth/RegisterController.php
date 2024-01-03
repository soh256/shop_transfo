<?php

namespace App\Http\Controllers\Api\V1\Auth;

use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\BaseController as Controller;
use App\Http\Resources\UserResource;
use App\Models\Role;
use Exception;

class RegisterController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'sexe' => 'in:m,f',
            'adresse' => 'min:4',
            'city' => 'required|min:3',
            'phone' => 'required|min:9|numeric|unique:users,phone',
            'cni' => 'min:9|numeric',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $role = new Role();
        $role->role = 'guest';
        $user = User::create($input)->role()->save($role);

        try {
            $u = User::find($user->user_id);
            $uRole = $u->role()->first();

            $success['user'] =  new UserResource($u);

            $token = $u->createToken($u->email . '_' . now(), [
                $uRole->role
            ]);

            $success['token'] =  $token->accessToken;

            return $this->sendResponse($success, 'User register successfully.');
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
