import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/models/usuario';

export enum Symbols {
  boven = 'column-reverse',
  onder = 'column',
  links = 'row-reverse',
  rechts = 'row'
}

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.css'],
  animations: speedDialFabAnimations,
})

export class SpeedDialFabComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<Usuario>();

  usuarios: Usuario[];

  constructor(private router: Router, private firestore: FirestoreService) {
  }

  fabButtons: any[] = [
    {
      icon: 'settings',
      information: 'U heeft op het icoon "settings" geklikt',
      route: 'Settings',
      description: 'Settings'
    },
    {
      icon: 'lightbulb',
      information: 'U heeft op het icoon "lightbulb" geklikt',
      route: 'Ideas',
      description: 'Ideas'
    },
    {
      icon: 'lock',
      information: 'U heeft op het icoon "lock" geklikt',
      route: 'Login',
      description: 'Login'
    },
    {
      icon: 'home',
      information: 'U heeft op het icoon "home" geklikt',
      route: 'Home',
      description: 'Home'
    }
  ];

  fabButtons2 = [
    {
      icon: 'add',
      information: 'U heeft op het icoon "add" geklikt',
      route: '',
      description: 'Add'
    },
    {
      icon: 'refresh',
      information: 'U heeft op het icoon "refresh" geklikt',
      route: '',
      description: 'Refresh'
    }
  ];
    
  buttons = [];

  buttons2 = []

  fabTogglerState = 'inactive';



  ngOnInit(): void {
    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.fabButtons = res;
    })
  }

  
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  showItems2() {
    this.fabTogglerState = 'active';
    this.buttons2 = this.fabButtons2;
  }

  hideItems2() {
    this.fabTogglerState = 'inactive';
    this.buttons2 = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  onToggleFab2() {
    this.buttons2.length ? this.hideItems2() : this.showItems2();
  }

  onClick(btn) {
    console.log(btn.information);
    // console.log(btn.route)
    this.router.navigate([btn.route]);
    // this.onToggleFab();
  }

  keys = Object.keys;
  symbols = Symbols;
  selectedOption: string;

  seleccionarUsuario(usr: Usuario) {
    this.newItemEvent.emit(usr);
  }

}
