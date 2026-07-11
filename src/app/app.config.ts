import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {ApplicationConfig, isDevMode, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  consultaLotesFeatureKey,
  consultaLotesReducer,
} from './feature/outros-creditos-debitos/store/consulta-lotes.reducer';

// Registra os dados de localidade do português
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      [consultaLotesFeatureKey]: consultaLotesReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
  ]
};
