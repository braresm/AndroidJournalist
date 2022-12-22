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
  { path: 'planner', loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule) },
  { path: 'newsroom', loadChildren: () => import('./newsroom/newsroom.module').then(m => m.NewsroomModule) },
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
