import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminComponent } from './admin.component';
import { PlansComponent } from './plans/plans.component';
import { TrashedPlanComponent } from './plans/trashed-plan/trashed-plan.component';
import { AddPlanComponent } from './plans/add-plan/add-plan.component';
import { PlanComponent } from './plans/plan/plan.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
        MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, 
        MatSlideToggleModule, MatTableModule, MatIconModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { EditComponent } from './users/edit/edit.component';
import { DeleteComponent } from './users/delete/delete.component';
import { PermissionsComponent } from './users/permissions/permissions.component';
import { UserBusinessesComponent } from './user-businesses/user-businesses.component';
import { DeleteUserComponent } from './user-businesses/delete-user/delete-user.component';
import { EditUserComponent } from './user-businesses/edit-user/edit-user.component';
import { UserPermissionsComponent } from './user-businesses/user-permissions/user-permissions.component';
import { ArchiveComponent } from './users/archive/archive.component';
import { ArchiveUserComponent } from './user-businesses/archive-user/archive-user.component';
import { EditPermissionsComponent } from './users/permissions/edit-permissions/edit-permissions.component';
import { EditUserPermissionsComponent } from './user-businesses/user-permissions/edit-user-permissions/edit-user-permissions.component';
import { BusinessTypesComponent } from './business-types/business-types.component';
import { ArchiveTypeComponent } from './business-types/archive-type/archive-type.component';
import { DeleteTypeComponent } from './business-types/delete-type/delete-type.component';
import { EditTypeComponent } from './business-types/edit-type/edit-type.component';
import { AddTypeComponent } from './business-types/add-type/add-type.component';
import { ModulesComponent } from './modules/modules.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { ArchiveModuleComponent } from './modules/archive-module/archive-module.component';
import { DeleteModuleComponent } from './modules/delete-module/delete-module.component';
import { EditModuleComponent } from './modules/edit-module/edit-module.component';
import { TypeModulesComponent } from './business-types/type-modules/type-modules.component';
import { AddTypeModulesComponent } from './business-types/type-modules/add-type-modules/add-type-modules.component';
import { BusinessComponent } from './business/business.component';
import { ArchiveBusinessComponent } from './business/archive-business/archive-business.component';
import { DeleteBusinessComponent } from './business/delete-business/delete-business.component';
import { EditBusinessComponent } from './business/edit-business/edit-business.component';
import { TypePlansComponent } from './business-types/type-plans/type-plans.component';
import { AddTypePlansComponent } from './business-types/type-plans/add-type-plans/add-type-plans.component';
import { EventTypesComponent } from './event-types/event-types.component';
import { AddEventTypeComponent } from './event-types/add-event-type/add-event-type.component';
import { ArchiveEventTypeComponent } from './event-types/archive-event-type/archive-event-type.component';
import { DeleteEventTypeComponent } from './event-types/delete-event-type/delete-event-type.component';
import { EditEventTypeComponent } from './event-types/edit-event-type/edit-event-type.component';
import { BusinessEventTypesComponent } from './business/business-event-types/business-event-types.component';
import { AddBusinessEventTypesComponent } from './business/business-event-types/add-business-event-types/add-business-event-types.component';



@NgModule({
    declarations: [
      AdminSidebarComponent, 
      AdminComponent, 
      PlansComponent, 
      TrashedPlanComponent, 
      AddPlanComponent, 
      PlanComponent, 
      UsersComponent, 
      EditComponent, 
      DeleteComponent, 
      PermissionsComponent, 
      UserBusinessesComponent, 
      DeleteUserComponent, 
      EditUserComponent, 
      UserPermissionsComponent, 
      ArchiveComponent, 
      ArchiveUserComponent, 
      EditPermissionsComponent, 
      EditUserPermissionsComponent, 
      BusinessTypesComponent, 
      ArchiveTypeComponent, 
      DeleteTypeComponent, 
      EditTypeComponent, 
      AddTypeComponent, 
      ModulesComponent, 
      AddModuleComponent, 
      ArchiveModuleComponent, 
      DeleteModuleComponent, 
      EditModuleComponent, 
      TypeModulesComponent, 
      AddTypeModulesComponent, 
      BusinessComponent, 
      ArchiveBusinessComponent, 
      DeleteBusinessComponent, 
      EditBusinessComponent, TypePlansComponent, AddTypePlansComponent, EventTypesComponent, AddEventTypeComponent, ArchiveEventTypeComponent, DeleteEventTypeComponent, EditEventTypeComponent, BusinessEventTypesComponent, AddBusinessEventTypesComponent, 

    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule, 
    MatNativeDateModule, 
    MatPaginatorModule
  ]
})
export class AdminModule { }
