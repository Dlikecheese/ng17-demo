import { Routes } from '@angular/router';
import { VirtualListComponent } from './virtual-list/virtual-list.component';

export const routes: Routes = [
  // 访问根路径时重定向到 /virtual-list
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'virtual-list',
  },
  // 实际的虚拟列表页面
  {
    path: 'virtual-list',
    component: VirtualListComponent,
  },
  // 任意未匹配路由都回到虚拟列表，避免 NG04002
  {
    path: '**',
    redirectTo: 'virtual-list',
  },
];
