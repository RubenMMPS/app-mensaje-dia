// app.config.ts
import { provideRouter, Routes } from '@angular/router';
import { MensajeComponent } from './mensaje/mensaje.component';
import { CumpleNatComponent } from './cumple-nat/cumple-nat.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: MensajeComponent },
  { path: 'cumple', component: CumpleNatComponent },
];

export const appConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};
