//Load modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { PanelRoutingModule } from "./panel-routing.module";

//load components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { MomentModule } from 'angular2-moment';

//Services
import { UserService } from "../services/user.service";
import { UserGuard } from "../services/user.guard";

//NgModule
@NgModule({
    declarations:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports:[
        CommonModule,FormsModule,HttpClientModule,PanelRoutingModule,MomentModule
    ],
    exports:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers:[
        UserService,
        UserGuard
    ]
})

//Export
export class PanelModule{}