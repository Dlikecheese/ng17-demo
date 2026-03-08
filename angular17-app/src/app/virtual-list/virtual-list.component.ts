import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  CdkDrag,
  CdkDropList,
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-virtual-list',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    DragDropModule,
    CdkVirtualScrollViewport,
    CdkDropList,
    CdkDrag,
  ],
  template: `
    <div class="page">
      <h2>CDK 虚拟滚动 + 拖拽示例</h2>

      <div class="toolbar">
        <button type="button" (click)="reset()">重置顺序</button>
        <span>当前条数：{{ items.length }}</span>
      </div>

      <cdk-virtual-scroll-viewport
        #viewport
        itemSize="56"
        minBufferPx="300"
        maxBufferPx="500"
        class="viewport"
        cdkDropList
        [cdkDropListData]="items"
        (cdkDropListDropped)="drop($event)"
      >
        <div
          *cdkVirtualFor="
            let item of items;
            let i = index;
            templateCacheSize: 0;
            trackBy: trackByItem
          "
          cdkDrag
          class="item"
        >
          <div class="handle" cdkDragHandle>::</div>
          <div class="content">
            <div class="title">{{ item }}</div>
            <div class="desc">当前索引：{{ i + 1 }}</div>
          </div>
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 16px;
        height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f5f5f5;
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
          Arial,
          sans-serif;
      }

      h2 {
        margin: 0;
        font-size: 20px;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
      }

      .toolbar button {
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid #1976d2;
        background-color: #1976d2;
        color: #fff;
        cursor: pointer;
      }

      .toolbar button:hover {
        background-color: #115293;
      }

      .viewport {
        flex: 1;
        height: 100%;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .list {
        padding: 8px 0;
      }

      .item {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        gap: 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        background: #fff;
      }

      .item.cdk-drag-preview {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }

      .item.cdk-drag-placeholder {
        opacity: 0;
      }

      .handle {
        width: 16px;
        cursor: grab;
        user-select: none;
        color: #999;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .title {
        font-weight: 500;
      }

      .desc {
        font-size: 12px;
        color: #666;
      }
    `,
  ],
})
export class VirtualListComponent {
  @ViewChild('viewport', { static: false }) viewport!: CdkVirtualScrollViewport;
  readonly originalItems = Array.from({ length: 1000 }).map(
    (_, i) => `这里是第 ${i + 1} 行的内容，用于演示虚拟滚动和拖拽。`,
  );

  items = [...this.originalItems];

  drop(event: CdkDragDrop<string[]>) {
    const range = this.viewport.getRenderedRange();
    const previousIndex = event.previousIndex + range.start;
    const currentIndex = event.currentIndex + range.start;

    if (previousIndex === currentIndex) {
      return;
    }

    moveItemInArray(this.items, previousIndex, currentIndex);
    // 重新赋值一个新数组引用，确保虚拟滚动检测到变更并刷新视图
    this.items = [...this.items];
  }

  reset() {
    this.items = [...this.originalItems];
  }

  trackByItem(index: number, item: string) {
    return item;
  }
}
