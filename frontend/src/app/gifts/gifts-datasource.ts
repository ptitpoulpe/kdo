import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { GiftService } from '../gift.service';
import { Gift, Page } from '../gift';

// TODO: Replace this with your own data model type
export interface GiftsItem {
  name: string;
  id: number;
}


// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: Gift[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];*/

/**
 * Data source for the Gifts view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GiftsDataSource extends DataSource<Gift> {
  data: Gift[] = []; //EXAMPLE_DATA;
  length: number = 0;
  pageIndex: number = 0;
  private giftsSubject = new BehaviorSubject<Gift[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    private giftService: GiftService,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Gift[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      /*return this.giftService.getGifts(this.paginator.pageIndex, this.paginator.pageSize)
        .pipe(
          map(results => {
            this.length = results.total;
            this.pageIndex = results.page;
            return results.items;
          })
        );*/
      return merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            console.log(this.paginator)
            return this.giftService.getGifts(
              this.paginator ? this.paginator.pageIndex + 1 : 1,
              this.paginator ? this.paginator.pageSize : 1,
            );
          }),
          map(result => {
            this.length = result.total;
            this.pageIndex = result.page - 1;
            return result.items;
          })
        );

      /*return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));*/
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Gift[]): Gift[] {
    /*if (this.paginator) {
      return this.giftService.getGifts(this.paginator.pageIndex * this.paginator.pageSize, this.paginator?.pageSize);
    } else {
      return this.giftService.getGifts();
    }*/
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: GiftsItem[]): GiftsItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
