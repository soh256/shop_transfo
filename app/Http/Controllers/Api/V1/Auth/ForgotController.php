<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Mail\PasswordReset;
use DB;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ForgotRequest;
use App\Http\Controllers\Api\V1\BaseController as Controller;
use Illuminate\Support\Facades\Hash;

class ForgotController extends Controller
{
    public function forgot(Request $req, Mailer $mailer)
    {
        $validated = Validator::make($req->all(), [
            'email' => 'required|email'
        ]);

        if ($validated->passes()) {
            if (!$user = User::where('email',  $req->input('email'))->first()) {
                return $this->sendError('Aucun compte ne correspond à cet email.', ['error' => 'User doen\'t exists !!!']);
            }

            $token = Str::random(30);
            try {
                $passwordRset = DB::table('password_resets')->where('email', $user->email)->first();
                if (!$passwordRset) {
                    DB::table('password_resets')->insert([
                        'email' => $user->email,
                        'token' => $token
                    ]);
                } else {
                    DB::table('password_resets')
                        ->where('email', $user->email)
                        ->update(['token' => $token]);
                }

                // send email
                $mailer->to($user)->send(new PasswordReset($token, $user));

                $success['email'] = $user->email;
                return $this->sendResponse($success, 'Check your email !');
            } catch (\Exception $ex) {
                return $this->sendError($ex->getMessage(), [], 400);
            }
        }
        return $this->sendError('Field required', $validated->errors(), 422);
    }

    public function reset(Request $req)
    {
        $validated = Validator::make($req->all(), [
            "token" => $req->query->has('id') ? "nullable" : "required",
            "current" => $req->query->has('id') ? "required" : "nullable",
            "password" => "required",
            "c_password" => "required|same:password"
        ]);

        if ($validated->passes()) {
            $user = null;
            if ($req->has("token")){
                $token = $req->input('token');
                $passwordResets = DB::table('password_resets')->where('token', $token)->first();
                if (!$passwordResets) {
                    return $this->sendError('Invalid token', [], 400);
                }
                $user = User::where('email', $passwordResets->email)->first();
            }

            if ($req->query->has('id')) {
                $user = User::find($req->query('id'));
                if ($user->password != Hash::make($req->input('password'))){
                    return $this->sendError('The current password is not valid', [], 400);
                }
            }

            if (!$user) {
                return $this->sendError('User doesn\'t exist !!!');
            }

            $user->password = Hash::make($req->input('password'));
            $user->save();

            DB::table('password_resets')->where('token',  $token)->delete();
            return $this->sendResponse($user, 'Password reset successfully');
        }
        return $this->sendError('Field required', $validated->errors(), 422);
    }
}
