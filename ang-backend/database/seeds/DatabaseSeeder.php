<?php

use App\User;
use App\Model\Plan;
use App\Model\Place;
use App\Model\Module;
use App\Model\TextBox;
use App\Model\Business;
use App\Model\Location;
use App\Model\EventType;
use App\Model\PhotoGallery;
use App\Model\BusinessType;
use App\Model\UserBusiness;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(Location::class, 10)->create();
        factory(EventType::class, 15)->create();
        factory(Plan::class, 15)->create();
        factory(Module::class, 15)->create();
        factory(BusinessType::class, 10)->create();
        $businesstype = BusinessType::all();
        $plans = Plan::all();
        $plans->each(function($plan) use ($businesstype){
            $plan->businesstypes()->attach(
                $businesstype->random(rand(1,3))->pluck('id')->toArray()
            );
        });
        $modules = Module::all();
        $modules->each(function($module) use ($businesstype){
            $module->businesstypes()->attach(
                $businesstype->random(rand(1,3))->pluck('id')->toArray()
            );
        });


        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $superadmin = Role::create(['name' => 'Super Admin']);
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Manager']);
        Role::create(['name' => 'User']);
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'archive user']);
        Permission::create(['name' => 'delete user']);
        Permission::create(['name' => 'upload photos']);
        Permission::create(['name' => 'edit photos']);
        Permission::create(['name' => 'archive photos']);
        Permission::create(['name' => 'delete photos']);
        Permission::create(['name' => 'upload videos']);
        Permission::create(['name' => 'edit videos']);
        Permission::create(['name' => 'archive videos']);
        Permission::create(['name' => 'delete videos']);
        Permission::create(['name' => 'upload logo']);

        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'status' => '1',
            'password' => 'admini'
        ]);
        $user->assignRole($superadmin);

        factory(User::class, 50)->create();
        factory(Business::class, 50)->create();
        $businesses = Business::all();
        $users = User::all();
        $users->each(function($user) use ($businesses){
            $user->assignRole("User");
            $business = $businesses->random();
            $user->businesses()->attach($business);
        
            $userBusiness = UserBusiness::where(['user_id' => $user->id, 'business_id' => $business->id])->first();
            $userBusiness->assignRole("Admin");
        });
        // $user->givePermissionTo(Permission::all());
        
        factory(Place::class, 250)->create();
        factory(PhotoGallery::class, 50)->create();
        factory(TextBox::class, 50)->create();
    }
}
