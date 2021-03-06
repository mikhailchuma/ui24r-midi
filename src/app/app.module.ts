import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { AppConfig } from '../environments/environment';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faCaretSquareDown, faCaretSquareUp, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faPlay, faCaretSquareDown, faCaretSquareUp, faPlusSquare);

// services
import { ElectronService } from './services/electron.service';
import { MidiService } from './services/midi.service';
import { ControllerService } from './services/controller.service';

// directives
import { WebviewDirective } from './directives/webview.directive';

// components
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WatcherComponent } from './components/watcher/watcher.component';
import { ProfileComponent } from './components/profile/profile.component';

// pipes
import { BinaryPipe } from './pipes/binary.pipe';
import { HexPipe } from './pipes/hex.pipe';

// reducers
import { reducer as deviceReducer } from './reducers/device.reducer';
import { reducer as profileReducer } from './reducers/profile.reducer';
import { reducer as messageReducer } from './reducers/message.reducer';
import { reducer as commandReducer } from './reducers/command.reducer';

// effects
import { ControllerEffects } from './effects/controller.effects';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    WatcherComponent,
    SettingsComponent,
    ProfileComponent,
    WebviewDirective,
    BinaryPipe,
    HexPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      commands: commandReducer,
      devices: deviceReducer,
      messages: messageReducer,
      profiles: profileReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: AppConfig.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      ControllerEffects
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    ControllerService,
    MidiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
