import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const API_URL = new InjectionToken<AppConfig>('config.app', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'http://localhost:3000/api/v1',
  }),
});
