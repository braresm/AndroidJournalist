import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './public/components/news/news.component';
import { PageNotFoundComponent } from './public/components/page-not-found/page-not-found.component';

const routes: Routes = [
  // {
  //   path: 'news',
  //   component: NewsComponent,
  // },
  // {
  //   path: 'feed',
  //   component: FeedComponent,
  // },
  // {
  //   path: '',
  //   redirectTo: '/news',
  //   pathMatch: 'full',
  // },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
