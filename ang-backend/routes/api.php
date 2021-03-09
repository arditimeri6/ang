<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([
    'middleware' => 'api',
], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('business', 'AuthController@business');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('verify', 'AuthController@sendVerificationEmail');
    Route::post('confirm','AuthController@confirmRegistration');
    Route::post('registervalidation', 'AuthController@registerValidation');
    Route::post('checkinvitation', 'AuthController@checkInvitation');
    Route::post('registermembers', 'AuthController@registerBusinessMember');

    Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::post('password/reset', 'ResetPasswordController@reset')->name('password.update');

    Route::post('/user/{user}/updateStatus', 'UserController@updateStatus')->name('user.updateStatus');
    Route::post('registermembersnotify','UserController@registerUserFromNotification');
    Route::get('getnotifications', 'UserController@getNotification');
    Route::patch('user/{user}', 'UserController@update')->name('user.update');
    Route::post('/user/{user}', 'UserController@destroy')->name('user.destroy');
    Route::get('/user/trashed', 'UserController@trashed')->name('user.trashed');
    Route::post('/user/trashed/{user}', 'UserController@restoretrashed')->name('user.restore');
    Route::delete('/user/trashed/{user}', 'UserController@forcedelete')->name('user.delete');
});

Route::get('businesstype/getTypes', 'BusinessTypeController@getTypes')->name('businesstype.getTypes');
Route::get('/businesstype/trashed', 'BusinessTypeController@trashed')->name('businesstype.trashed');
Route::post('/businesstype/trashed/{user}', 'BusinessTypeController@restoretrashed')->name('businesstype.restore');
Route::post('/businesstype/delete/{user}', 'BusinessTypeController@forcedelete')->name('businesstype.delete');
Route::apiResource('/businesstype','BusinessTypeController');

Route::get('/eventType/trashed', 'EventTypesController@trashed')->name('eventType.trashed');
Route::post('/eventType/trashed/{user}', 'EventTypesController@restoretrashed')->name('eventType.restore');
Route::post('/eventType/delete/{user}', 'EventTypesController@forcedelete')->name('eventType.delete');
Route::apiResource('/eventType','EventTypesController');

Route::get('/module/trashed', 'ModuleController@trashed')->name('module.trashed');
Route::post('/module/trashed/{user}', 'ModuleController@restoretrashed')->name('module.restore');
Route::post('/module/delete/{user}', 'ModuleController@forcedelete')->name('module.delete');
Route::apiResource('/module','ModuleController');

Route::apiResource('/location','LocationController');

Route::get('getbusinesstypemodule/{businesstype}','BusinessTypeModuleController@getbusinessTypeModules');
Route::apiResource('businesstypemodule', 'BusinessTypeModuleController');

Route::post('postuserdata', 'BusinessTypePlanController@postUserData');
Route::get('getbusinesstypeplan/{businesstype}','BusinessTypePlanController@getbusinessTypePlans');
Route::apiResource('businesstypeplan','BusinessTypePlanController');



Route::get('events/trashed', 'EventController@trashed')->name('event.trashed');
Route::post('/events/trashed/{event}', 'EventController@restoretrashed')->name('event.restore');
Route::delete('/events/trashed/{event}', 'EventController@forcedelete')->name('event.delete');
Route::apiResource('events', 'EventController');

Route::get('/business/{business}/getSelectedPlan','BusinessController@getSelectedPlan')->name('business.getSelectedPlan');
Route::get('/userBusinesses','BusinessController@userBusinesses')->name('business.userBusinesses');
Route::post('/business/{business}/approve', 'BusinessController@approveBusiness')->name('business.approve');
Route::post('/business/{business}/dontApprove', 'BusinessController@dontApproveBusiness')->name('business.dontApprove');
Route::post('/returnbusinessuser', 'BusinessController@returnBusinessUser')->name('business.returnBusinessUser');
Route::patch('business/{business}', 'BusinessController@update')->name('business.update');
Route::post('/business/{business}/updateStatus', 'BusinessController@updateStatus')->name('business.updateStatus');
Route::delete('business/{business}', 'BusinessController@destroy')->name('business.destroy');
Route::get('business/trashed', 'BusinessController@trashed')->name('business.trashed');
Route::post('/business/trashed/{business}', 'BusinessController@restoretrashed')->name('business.restore');
Route::post('/business/delete/{business}', 'BusinessController@forcedelete')->name('business.delete');
Route::get('/business','BusinessController@index')->name('business.index');
Route::get('/business/{business}','BusinessController@show')->name('business.show');
Route::post('/businesslogo/{business}','BusinessController@updateLogo')->name('business.updatelogo');
Route::post('/business/updateplan', 'BusinessController@updatePlan')->name('business.updatePlan');


//Roles and Permissions
Route::get('/getRoles','RolesAndPermissionsController@getRoles')->name('role.getRoles');
Route::get('/getPermissions','RolesAndPermissionsController@getPermissions')->name('permission.getPermissions');
Route::get('/usersWithRolesAndPermissions','RolesAndPermissionsController@usersWithRolesAndPermissions')->name('role.usersWithRolesAndPermissions');
Route::get('/getUserWithRolesAndPermissions/{user}','RolesAndPermissionsController@getUserWithRolesAndPermissions')->name('role.getUserWithRolesAndPermissions');
Route::get('/userBusinessesWithRolesAndPermissions','RolesAndPermissionsController@userBusinessesWithRolesAndPermissions')->name('role.userBusinessesWithRolesAndPermissions');
Route::get('/getUserBusinessesWithRolesAndPermissions/{user}','RolesAndPermissionsController@getUserBusinessesWithRolesAndPermissions')->name('role.getUserBusinessesWithRolesAndPermissions');
Route::post('/getUserBusinessRole','RolesAndPermissionsController@getUserBusinessRole')->name('role.getUserBusinessRole');
Route::post('/getUserBusinessPermission','RolesAndPermissionsController@getUserBusinessPermission')->name('permission.getUserBusinessPermission');
Route::post('/addRole','RolesAndPermissionsController@addRole')->name('role.addRole');
Route::post('/addPermission','RolesAndPermissionsController@addPermission')->name('permission.addPermission');
Route::post('/editUserRoles/{user}','RolesAndPermissionsController@editUserRoles')->name('role.editUserRoles');
Route::post('/editUserPermissions/{user}','RolesAndPermissionsController@editUserPermissions')->name('permission.editUserPermissions');
Route::post('/removeUserPermission/{user}','RolesAndPermissionsController@removeUserPermission')->name('permission.removeUserPermission');
Route::post('/editRoles/{user}','RolesAndPermissionsController@editRoles')->name('role.editRoles');
Route::post('/editPermissions/{user}','RolesAndPermissionsController@editPermissions')->name('permission.editPermissions');
Route::post('/removePermission/{user}','RolesAndPermissionsController@removePermission')->name('permission.removePermission');

Route::group(['prefix'=>'business'], function(){
    Route::get('/{business}/banner/trashed', 'BannerController@trashed')->name('banner.trashed');
    Route::post('/{business}/banner/trashed/{banner}', 'BannerController@restoretrashed')->name('banner.restore');
    Route::post('/{business}/banner/delete/{banner}', 'BannerController@forcedelete')->name('banner.delete');
    Route::apiResource('/{business}/banner','BannerController');

    Route::apiResource('/{business}/textbox','TextBoxController');
    
    Route::get('/{business}/places/trashed', 'PlaceController@trashed')->name('place.trashed');
    Route::post('/{business}/places/trashed/{textbox}', 'PlaceController@restoretrashed')->name('place.restore');
    Route::delete('/{business}/places/trashed/{textbox}', 'PlaceController@forcedelete')->name('place.delete');
    Route::apiResource('/{business}/places','PlaceController');

    Route::apiResource('/{business}/places/{place}/calendar','CalendarController');
   
    Route::get('/{business}/videogallery/trashed', 'VideoGalleryController@trashed')->name('videogallery.trashed');
    Route::post('/{business}/videogallery/trashed/{videogallery}', 'VideoGalleryController@restoretrashed')->name('videogallery.restore');
    Route::delete('/{business}/videogallery/trashed/{videogallery}', 'VideoGalleryController@forcedelete')->name('videogallery.delete');
    Route::apiResource('/{business}/videogallery','VideoGalleryController');

    Route::get('/{business}/photogallery/trashed', 'PhotoGalleryController@trashed')->name('photogallery.trashed');
    Route::post('/{business}/photogallery/trashed/{photogallery}', 'PhotoGalleryController@restoretrashed')->name('photogallery.restore');
    Route::delete('/{business}/photogallery/trashed/{photogallery}', 'PhotoGalleryController@forcedelete')->name('photogallery.delete');
    Route::apiResource('/{business}/photogallery','PhotoGalleryController');

    Route::get('/{business}/offer/trashed', 'OfferController@trashed')->name('offer.trashed');
    Route::post('/{business}/offer/trashed/{offer}', 'OfferController@restoretrashed')->name('offer.restore');
    Route::post('/{business}/offer/delete/{offer}', 'OfferController@forcedelete')->name('offer.delete');
    Route::apiResource('/{business}/offer','OfferController');

    Route::apiResource('/{business}/invitations','InvitationController');
    
    Route::get('/{business}/reservation/trashed', 'ReservationController@trashed')->name('reservation.trashed');
    Route::post('/{business}/reservation/trashed/{reservation}', 'ReservationController@restoretrashed')->name('reservation.restore');
    Route::post('/{business}/reservation/delete/{reservation}', 'ReservationController@forcedelete')->name('reservation.delete');
    Route::apiResource('/{business}/reservation','ReservationController');

    Route::get('/{business}/venue/trashed', 'VenueController@trashed')->name('venue.trashed');
    Route::post('/{business}/venue/trashed/{venue}', 'VenueController@restoretrashed')->name('venue.restore');
    Route::post('/{business}/venue/delete/{venue}', 'VenueController@forcedelete')->name('venue.delete');
    Route::apiResource('/{business}/venue','VenueController');

    Route::get('/{business}/{venue}/menu/trashed', 'MenusController@trashed')->name('menu.trashed');
    Route::post('/{business}/{venue}/menu/trashed/{menu}', 'MenusController@restoretrashed')->name('menu.restore');
    Route::post('/{business}/{venue}/menu/delete/{menu}', 'MenusController@forcedelete')->name('menu.delete');
    Route::apiResource('/{business}/{venue}/menu','MenusController');

    Route::get('/{business}/{venue}/{menu}/photo/trashed', 'MenuPhotoController@trashed')->name('menuphoto.trashed');
    Route::post('/{business}/{venue}/{menu}/photo/trashed/{menuphoto}', 'MenuPhotoController@restoretrashed')->name('menuphoto.restore');
    Route::post('/{business}/{venue}/{menu}/photo/delete/{menuphoto}', 'MenuPhotoController@forcedelete')->name('menuphoto.delete');
    Route::apiResource('/{business}/{venue}/{menu}/photo','MenuPhotoController');
    
    Route::get('/{business}/venuecalendar/{venue}','CalendarController@indexVenue')->name('venue.calendar');

    // Route::get('/{business}/event-types/{businesstype}','BusinessEventTypeController@getbusinessTypeModules');
    Route::apiResource('/{business}/event-types', 'BusinessEventTypeController');

    Route::get('/{business}/businessusers/getBusinessUsers', 'UserBusinessController@getBusinessUsers')->name('businessusers.getBusinessUsers');
    Route::get('/{business}/businessusers/getBusinessUsersTrashed', 'UserBusinessController@getBusinessUsersTrashed')->name('businessusers.getBusinessUsersTrashed');

    Route::get('/{business}/plans/getBusinessPlans', 'PlanController@getBusinessPlans')->name('plan.getBusinessPlans');
});


Route::get('plans/getPlans', 'PlanController@getPlans')->name('plan.getPlans');
Route::get('plans/trashed', 'PlanController@trashed')->name('plan.trashed');
Route::post('plans/trashed/{plan}', 'PlanController@restoretrashed')->name('plan.restore');
Route::delete('plans/trashed/{plan}', 'PlanController@forcedelete')->name('plan.delete');
Route::apiResource('/plans','PlanController');

Route::get('/businessusers/trashed', 'UserBusinessController@trashed')->name('businessusers.trashed');
Route::post('/businessusers/trashed/{user}', 'UserBusinessController@restoretrashed')->name('businessusers.restore');
Route::post('/businessusers/delete/{user}', 'UserBusinessController@forcedelete')->name('businessusers.delete');
Route::apiResource('/businessusers', 'UserBusinessController');

Route::post('/calendarreservation/{placeslug}', 'CalendarController@requestReservation');
Route::get('/usercalendars','CalendarController@getUserReservation');

Route::get('/businessprofiles', 'BusinessController@getbusinessesprofiles');
Route::get('categorizedprofiles', 'BusinessController@categorizedbusiness');
Route::get('/businessprofiles/{slug}', 'BusinessController@getsinglebusinessprofile');

Route::get('/businessprofilessingleplace/{slug}', 'PlaceController@getbusinessplaces');
Route::get('/businessprofilessingleplace/{slug}/{place}', 'PlaceController@getsinglebusinessprofileplace');

Route::get('/businessprofilesvideo/{slug}', 'VideoGalleryController@getbusinessesprofilesvideos');

Route::get('/businessprofilestext/{slug}', 'TextBoxController@getbusinessesprofilestext');

Route::get('/businessprofilesgallery/{slug}', 'PhotoGalleryController@getbusinessesprofilesgalleries');