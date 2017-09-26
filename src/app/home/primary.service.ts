import { Primary } from './primary.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PrimaryService {
  n: number = 0;
  inc () {debugger;
    this.n++;
    console.log(this.n);
  }

  primary_list: Primary[] = [];
  primary_info = {
    investor : ["Fin Bank", "KKR", "JPMC","BAML","Citi","WFC","BCS","DB","MS","GS","CS","MUFG","RBC","BNP","STI","PNC","HSBC","MFG","JEF","CIBC","CFG","KEY"],
    contact : ["John Doe", "Smith B", "Vinny"],
    location : ["NY", "NC", "AL"],
    assigned : ["Jasson", "Ness", "John"],
    status : ["Committed", "Interested", "Interest"],
    t_p : ["T", "P"]
  };
  nd_investors = [];
  sel_investors = [];

  constructor() {
    for (let i = 0; i < 5; i++) {
      let p = {investor: '', contact:'', location:'', assigned: '', status: '', t_p: '',
        interested: {
          amount_min: '',
          spread: '',
          upfront_fee: '',
          OID: '',
          notes: '',
          last_update: new Date()
        },
      };
      for (let key in this.primary_info) {
        let idx = parseInt((Math.random() * this.primary_info[key].length).toString());
        if (key == 'investor')
          idx = i;
        p[key] = this.primary_info[key][idx];
      }
      p.interested.amount_min = (parseInt((Math.random() * 100 + 10).toString())).toString();
      p.interested.spread = "2-" + (parseInt((Math.random() * 5).toString()) + 2);
      p.interested.upfront_fee = "1-" + (parseInt((Math.random() * 3).toString()) + 2);
      p.interested.OID = "1-3";
      p.interested.notes = "Notes from " + p.contact;
      this.primary_list.push(p);
    }
  }

  confirm_selection () {
    for (let i = 0; i < this.sel_investors.length; i++) {
      let p = {investor: this.sel_investors[i].investor, contact: this.sel_investors[i].contact,
        location: this.sel_investors[i].location,
        assigned: '', status: '', t_p: '',
        interested: {
          amount_min: '',
          spread: '',
          upfront_fee: '',
          OID: '',
          notes: '',
          last_update: new Date()
        },
        is_edit: false,
        is_add: false
      };
      this.primary_list.push(p);
    }
    this.sel_investors = [];
  }

  is_investor_used (investor) {
    let filtered_investor = this.primary_list.filter((p) => {return p.investor == investor});
    return filtered_investor.length > 0;
  }
  
  is_sel_investor (investor) {
    let filtered_investor = this.sel_investors.filter((p) => {return p.investor == investor});
    return filtered_investor.length > 0;
  }
  
  is_ND_investor (investor) {
    let filtered_investor = this.nd_investors.filter((p) => {return p.investor == investor});
    return filtered_investor.length > 0;
  }

  available_investors () {
    let investors = this.primary_info.investor.filter((inv) => {
      return !this.is_investor_used(inv) && !this.is_ND_investor(inv) && !this.is_sel_investor(inv);
    });
    return investors;
  }
  
  get_sel_investors () {
    return this.sel_investors;
  }

  add_sel_investors (data) {
    this.sel_investors = this.sel_investors.concat(data);
  }

  restore_sel_investors (data) {
    for (let i = 0; i < data.length; i++) {
      this.sel_investors = this.sel_investors.filter((inv) => {return inv.investor != data[i]});
    }
  }
  
  get_ND_investors () {
    return this.nd_investors;
  }

  add_ND_investors (data) {
    this.nd_investors = this.nd_investors.concat(data);
  }

  restore_ND_investors (data) {
    for (let i = 0; i < data.length; i++) {
      this.nd_investors = this.nd_investors.filter((inv) => {return inv.investor != data[i]});
    }
  }
}