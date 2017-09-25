import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Primary } from './primary.model';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./metronics.components.scss', './home.component.scss']
})

export class HomeComponent implements OnInit {

  welcome: String;
  primary_list: Primary[] = [];
  primary_info = {
    investor : ["Fin Bank", "KKR", "JPMC"],
    contact : ["John Doe", "Smith B", "Sky Vinney"],
    location : ["NY", "NC", "AL"],
    assigned : ["Jasson", "Ness", "John"],
    status : ["Committed", "Interested", "Interest"],
    t_p : ["T", "P"]
  };
  
  constructor(private router: Router) {
    // 
  }

  ngOnInit() {
    this.welcome = "You are welcome";
    jQuery('a.collapse').click((e) => {
      let className = jQuery(e.target)[0].className;
      let table = jQuery(e.target)[0].className.split(' ').filter((c) => {return c.indexOf('table-') != -1})[0];
      let table_body = jQuery('.' + table + '-body');
      if (table_body.hasClass('table-min')) {
        jQuery(e.target).removeClass('expand');
        jQuery(e.target).addClass('collapse');
        table_body.removeClass('table-min');
      } else {
        jQuery(e.target).addClass('expand');
        jQuery(e.target).removeClass('collapse');
        table_body.addClass('table-min');
      }
    });

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

  add_fields = ["investor", "contact", "location", "assigned"];
  edit_fields = ["status", "t_p", "interested"];
  
  primary_add (index) {
    let p = {investor: '', contact:'', location:'', assigned: '', status: '', t_p: '',
      interested: {
        amount_min: '',
        spread: '',
        upfront_fee: '',
        OID: '',
        notes: '',
        last_update: new Date()
      },
      is_add: true,
      is_edit: false
    };
    this.primary_list.splice(index + 1, 0, p);
  }

  primary_edit (index, primary) {
    for (let i = 0; i < this.edit_fields.length; i++) {
      if (this.edit_fields[i] == 'interested') {
        for (let key in primary[this.edit_fields[i]]) {
          primary[this.edit_fields[i]][key + '_edit'] = primary[this.edit_fields[i]][key];
        }
      } else
        primary[this.edit_fields[i] + '_edit'] = primary[this.edit_fields[i]];
    }
    primary.is_edit = true;
    primary.is_add = false;
  }

  primary_save (index, primary) {
    if (primary.is_edit == true) {
      for (let i = 0; i < this.edit_fields.length; i++) {
        if (this.edit_fields[i] == 'interested') {
          for (let key in primary[this.edit_fields[i]]) {
            primary[this.edit_fields[i]][key] = primary[this.edit_fields[i]][key + '_edit'];
          }
        } else
          primary[this.edit_fields[i]] = primary[this.edit_fields[i] + '_edit'];
      }
    } else if (primary.is_add == true) {
      for (let i = 0; i < this.add_fields.length; i++) {
        primary[this.add_fields[i]] = primary[this.add_fields[i] + '_edit'];
      }
    }
    primary.is_edit = false;
    primary.is_add = false;
  }

  primary_cancel (index, primary) {
    if (primary.is_add == true) {
      this.primary_list.splice(index, 1);
    }
    primary.is_edit = false;
    primary.is_add = false;
  }

  primary_remove (index) {
    if (confirm("Are you sure to remove " + this.primary_list[index].investor + "?"))
      this.primary_list.splice(index, 1);
  }

  calculate_total (key, avg) {
    let ret = 0;
    let total_amount = 0;
    for (let i = 0; i < this.primary_list.length; i++) {
      if (this.primary_list[i].interested[key] == '')
        continue;
      let ary = this.primary_list[i].interested[key].split('-');
      let sum = 0;
      for (let a = 0; a < ary.length; a++) {
        sum += parseInt(ary[a]);
      }
      if (avg == true) {
        let amount_min = parseInt(this.primary_list[i].interested.amount_min);
        ret += parseInt((sum / ary.length * amount_min).toString());
        total_amount += amount_min;
      } else
        ret += parseInt((sum / ary.length).toString());
    }
    if (avg == true)
      return parseInt((ret / total_amount * 10).toString()) / 10;
    return ret;
  }

  calculate_time (date) {
    let curDate = new Date(date);
    let today = new Date();
    let seconds = Math.floor((today.getDate() - curDate.getDate()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    if (interval > 20)
      return Math.floor(seconds) + " seconds ago";
    return 'just now';
  }
}
