import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from '../settings/settings.component';
import { MidiService } from '../../services/midi.service';
import { WatcherComponent } from '../watcher/watcher.component';
import { ControllerService } from '../../services/controller.service';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from '../about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BinaryPipe } from '../../pipes/binary.pipe';
import { HexPipe } from '../../pipes/hex.pipe';
import { reducer as deviceReducer } from '../../reducers/device.reducer';
import { reducer as profileReducer } from '../../reducers/profile.reducer';
import { reducer as messageReducer } from '../../reducers/message.reducer';
import { reducer as commandReducer } from '../../reducers/command.reducer';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        ProfileComponent,
        HomeComponent,
        WatcherComponent,
        SettingsComponent,
        BinaryPipe,
        HexPipe
      ],
      providers: [
        MidiService,
        ControllerService
      ],
      imports: [
        StoreModule.forRoot({
          commands: commandReducer,
          devices: deviceReducer,
          messages: messageReducer,
          profiles: profileReducer
        }),
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
