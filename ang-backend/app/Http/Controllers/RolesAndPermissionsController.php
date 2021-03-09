<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserBusinessResource;
use App\Http\Resources\UserResource;
use App\User;
use App\Model\UserBusiness;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Symfony\Component\HttpFoundation\Request;

class RolesAndPermissionsController extends Controller
{
    //Function to get all roles
    public function getRoles()
    {
        $roles = Role::all()->pluck('name');
        return response()->json($roles, 200);
    }

    //Function to get all permissions
    public function getPermissions()
    {
        $permission = Permission::all()->pluck('name');
        return response()->json($permission, 200);
    }

    //Function to get users with their roles and permissions
    public function usersWithRolesAndPermissions()
    {
        $userRoles = UserResource::collection(User::all());
        return response()->json($userRoles, 200);
    }

    //Function to get specific user with their roles and permissions
    public function getUserWithRolesAndPermissions($user)
    {
        $userRoles = UserResource::collection(User::where('id', $user)->get());
        return response()->json($userRoles, 200);
    }

    //Function to get User Businesses with their roles and permissions
    public function userBusinessesWithRolesAndPermissions()
    {
        $userBusinessRoles = UserBusinessResource::collection(UserBusiness::all());
        return response()->json($userBusinessRoles, 200);
    }

    //Function to get specific User Businesses with their roles and permissions
    public function getUserBusinessesWithRolesAndPermissions($user)
    {
        $userBusinessRoles = UserBusinessResource::collection(UserBusiness::where('id', $user)->get());
        return response()->json($userBusinessRoles, 200);
    }

    //Function to get all User Businesses with a specific role
    public function getUserBusinessRole(Request $request)
    {
        $userBusinessRole = UserBusiness::role($request->role)->get();
        return response()->json($userBusinessRole, 200);
    }

    //Function to get all User Businesses with a specific permission
    public function getUserBusinessPermission(Request $request)
    {
        $userBusinessPermission = UserBusiness::permission($request->permission)->get();
        return response()->json($userBusinessPermission, 200);
    }

    //Function to change the role of a User 
    public function editUserRoles(User $user, Request $request)
    {
        $user->syncRoles([$request->role]);
        return response()->json(['message'=>'Role updated successfully'], 200);
    }

    //Function to change the permissions of a User
    public function editUserPermissions(User $user, Request $request)
    {
        $user->syncPermissions($request->all());
        return response()->json(['message'=>'Permissions updated successfully'], 200);
    }

    //Function to remove user Permission
    public function removeUserPermission(User $user, Request $request)
    {
        $user->revokePermissionTo($request->all());
        return response()->json(['message'=>'Permission removed successfully'], 200);
    }

    //Function to change the role of a userBusiness 
    public function editRoles(UserBusiness $user, Request $request)
    {
        $user->syncRoles([$request->role]);
        return response()->json(['message'=>'Role updated successfully'], 200);
    }

    //Function to change the permissions of a userBusiness
    public function editPermissions(UserBusiness $user, Request $request)
    {
        $user->syncPermissions($request->all());
        return response()->json(['message'=>'Permissions updated successfully'], 200);
    }

    //Function to remove user business Permission
    public function removePermission(UserBusiness $user, Request $request)
    {
        $user->revokePermissionTo($request->all());
        return response()->json(['message'=>'Permission removed successfully'], 200);
    }

    //Function to add a new Role
    public function addRole(Request $request)
    {
        $role = Role::create(['name' => $request->role]);
        return response()->json(['message'=>'Role added successfully'], 200);
    }

    //Function to add a new Permission
    public function addPermission(Request $request)
    {
        $permission = Permission::create(['name' => $request->permission]);
        return response()->json(['message'=>'Permission added successfully'], 200);
    }
}
