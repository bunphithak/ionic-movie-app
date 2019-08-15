import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        loadChildren: '../pages/movies/movies.module#MoviesPageModule'
      },
      {
        path: 'movies/:id',
        loadChildren: '../pages/movie-details/movie-details.module#MovieDetailsPageModule'
      },
      {
        path: 'bookmark',
        loadChildren: '../pages/bookmark/bookmark.module#BookmarkPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [TabsPage]
})
export class TabsPageModule {}
