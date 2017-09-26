import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Primary } from './primary.model';
import { PrimaryService } from './primary.service';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './lender.component.html',
  styleUrls: ['./metronics.components.scss', './home.component.scss'],
})

export class LenderComponent implements OnInit {
  primary_list: Primary[] = [];
  primary_info: any;
  table_contacts:any = {};
  table_locations:any = {};
  table_select: any = {};
  table_select_all = false;
  table_nd_select: any = {};
  table_nd_select_all = false;
  table_sel_select: any = {};
  table_sel_select_all = false;
  table_sel_ids = ['table_select', 'table_nd_select', 'table_sel_select'];
  
  constructor(private router: Router, private service: PrimaryService) {
  }

  ngOnInit() {
    this.primary_list = this.service.primary_list;
    this.primary_info = this.service.primary_info;
  }
  
  available_investors () {
    return this.service.available_investors();
  }

  get_sel_investors () {
    return this.service.get_sel_investors();
  }
  
  add_sel_investor (key) {
    let nds = [];
    nds.push({investor: key, contact: this.table_contacts[key], location: this.table_locations[key]});
    this.table_select[key] = false;
    this.service.add_sel_investors(nds);
  }
  
  add_sel_investors () {
    let nds = [];
    for (let key in this.table_select) {
      if (this.table_select[key]) {
        nds.push({investor: key, contact: this.table_contacts[key], location: this.table_locations[key]});
      }
    }
    this.table_select = {};
    this.table_select_all = false;
    this.service.add_sel_investors(nds);
  }

  restore_sel_investors () {
    let nds = [];
    for (let key in this.table_sel_select) {
      if (this.table_sel_select[key]) {
        nds.push(key);
      }
    }
    this.table_sel_select = {};
    this.table_sel_select_all = false;
    this.service.restore_sel_investors(nds);
  }
  
  restore_sel_investor (key) {
    let nds = [];
    nds.push(key);
    this.table_sel_select[key] = false;
    this.table_sel_select_all = false;
    this.service.restore_sel_investors(nds);
  }

  get_ND_investors () {
    return this.service.get_ND_investors();
  }

  add_ND_investors () {
    let nds = [];
    for (let key in this.table_select) {
      if (this.table_select[key]) {
        nds.push({investor: key, contact: this.table_contacts[key], location: this.table_locations[key]});
      }
    }
    this.table_select = {};
    this.table_select_all = false;
    this.service.add_ND_investors(nds);
  }
  
  add_ND_investor (key) {
    let nds = [];
    nds.push({investor: key, contact: this.table_contacts[key], location: this.table_locations[key]});
    this.table_select[key] = false;
    this.table_select_all = false;
    this.service.add_ND_investors(nds);
  }

  restore_ND_investors () {
    let nds = [];
    for (let key in this.table_nd_select) {
      if (this.table_nd_select[key]) {
        nds.push(key);
      }
    }
    this.table_nd_select = {};
    this.table_nd_select_all = false;
    this.service.restore_ND_investors(nds);
  }
  
  restore_ND_investor (key) {
    let nds = [];
    nds.push(key);
    this.table_nd_select[key] = false;
    this.table_nd_select_all = false;
    this.service.restore_ND_investors(nds);
  }

  select_all (id) {
    let tb = this.table_sel_ids[id];
    let value = !this[tb + '_all'];
    if (value) {
      let invs = [];
      if (id == 0)
        invs = this.service.available_investors();
      else if (id == 1)
        invs = this.service.get_ND_investors();
      else
        invs = this.service.get_sel_investors();
      for (let i = 0; i < invs.length; i++) {
        this[tb][invs[i].investor || invs[i]] = true;
      }
    } else {
      this[tb] = {};
    }
  }

  get_select (id) {
    let tb = this.table_sel_ids[id];
    for (let key in this[tb]) {
      if (this[tb][key])
        return true;
    }
    return false;
  }

  change_all (id) {
    let tb = this.table_sel_ids[id];
    this[tb + '_all'] = false;
  }

  done () {
    this.service.confirm_selection();
    this.router.navigateByUrl('/home');
  }
}
