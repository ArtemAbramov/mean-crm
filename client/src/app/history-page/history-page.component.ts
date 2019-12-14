import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MaterialInstance, MaterialService} from '../shared/classes/material.service'
import {OrdersService} from '../shared/services/orders.service'
import {Subscription} from 'rxjs'
import {Filter, Order} from '../shared/interfaces'

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip', null) tooltipRef: ElementRef
  tooltip: MaterialInstance
  isFilterVisible = false
  oSub: Subscription
  orders: Order[] = []
  loading = false
  reloading = false
  noMoreOrders = false
  filter: Filter = {}

  offset = 0
  limit = STEP

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
        offset: this.offset,
        limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }
}
