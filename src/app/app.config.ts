import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/interceptor/header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()), 
    provideClientHydration() , 
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loadingInterceptor])) 
    , provideAnimations() 
    , provideToastr() ,
    importProvidersFrom(NgxSpinnerModule)
  ]
};
