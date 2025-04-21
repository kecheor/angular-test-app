import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import authMockInterceptor from './http/auth.mock.interceptor';
import delayInterceptor from './http/delay.interceptor copy';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([
      delayInterceptor, authMockInterceptor
    ])),
    provideRouter(routes)
  ]
};
