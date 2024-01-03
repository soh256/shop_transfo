<?php

namespace App\Http\Controllers\Api\V1;

use Validator;
use Exception;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\V1\BaseController as Controller;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(['auth:api','scope:admin'])->except(['current','update']);
    }

    public function index(Request $request)
    {
        $user = UserResource::collection(User::with('role')->get());
        return $this->sendResponse($user,'List of users');
    }



    public function current()
    {
        $user = Auth::user();
        return $this->sendResponse(new UserResource($user), 'Current User information');
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'sexe' => 'required|in:m,f',
            'adresse' => 'required|min:4',
            'city' => 'required',
            'role' => 'required|in:guest,seller,admin',
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
        $role->role = $input['role'];
        unset($input['role']);
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

    public function show(User $user)
    {
        $user = User::find($user->id);
        return $this->sendResponse(new UserResource($user), 'User information');
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'sexe' => 'in:m,f',
            'adresse' => 'min:4',
            'city' => 'min:3',
            'phone' => 'numeric',
            'cni' => 'min:9|numeric',
            'email' => 'email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        try {
            $user = Auth::user();

            if (key_exists('role',$input)) {
                $r = $input['role'];
                if($user->role->role === 'admin'){
                    if ($r !== $user->role->role) {
                        $role = new Role();
                        $role->role = $r;
                        $user->role()->save($role);
                    }
                }else{
                    return $this->sendError("you don't have the right to perform this action", 403);
                }
                unset($input['role']);
            }
            $user->update($input);

            return $this->sendResponse(new UserResource($user), "User updated successfully");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }

    public function updateAdmin(Request $request, User $user)
    {
        $validator = Validator::make($request->all(),[
            'sexe' => 'in:m,f',
            'adresse' => 'min:4',
            'city' => 'min:3',
            'phone' => 'numeric',
            'cni' => 'min:9|numeric',
            'email' => 'email',
            'role'=>'in:admin,seller,guest'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }
        $input = $request->all();

        try {
            $userAuth = Auth::user();
            if (key_exists('role',$input)) {
                $r = $input['role'];
                if($userAuth->role->role === 'admin'){
                    if ($r !== $user->role->role) {
                        $role = DB::update( 'update roles set role = ? where user_id = ? and role = ?', [$r, $user->id, $user->role->role]);
                    }
                }else{
                    return $this->sendError("you don't have the right to perform this action", [], 403);
                }
                unset($input['role']);
            }
            $user->update($input);

            return $this->sendResponse(new UserResource($user), "User updated successfully");
        } catch (Exception $ex) {
            return $this->sendError('Server Errors', $ex->getMessage(), 500);
        }
    }
}
