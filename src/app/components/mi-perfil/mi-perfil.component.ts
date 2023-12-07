import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { Horario } from 'src/app/models/horario';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLocal } from 'src/app/models/usuario-local';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalService } from 'src/app/services/local.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  
  loading: boolean = false;
  usuario: Usuario;
  localUsr: UsuarioLocal;
  horarios: Horario[];

  especialistas: Usuario[];
  historiaDetalle: HistoriaClinica;
  historias: HistoriaClinica[];

  especialidadesAtendidas: string[] = [];

  constructor(
    private firestore: FirestoreService,
    private local: LocalService,
    private router: Router
  ){}

  async ngOnInit() {
    this.loading = true;
    this.localUsr = this.local.obtenerUsuario();

    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.especialistas = res.filter(x => x.rol === 'especialista');
      this.usuario = res.filter(u => u.email === this.localUsr.email)[0];
      if(this.usuario.rol === 'especialista') {
        this.firestore.obtenerHorariosPorEspecialista(this.usuario.email).subscribe(hor => {
          this.horarios = hor;
          this.loading = false;
        })
      }
      else if(this.usuario.rol === 'paciente') {
        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his.filter(h => h.paciente === this.usuario.email);

          this.especialidadesAtendidas = [];

          this.historias.forEach(h => {
            if(!this.especialidadesAtendidas.includes(h.especialidad)) {
              this.especialidadesAtendidas.push(h.especialidad);
            }
          });

          this.loading = false;
        })
      }
      else {
        this.loading = false;
      }
    });
  }

  irANuevoHorario() {
    this.router.navigate(['/usuario/especialista/nuevo-horario']);
  }

  formatearFecha(fecha: string) {
    let date = new Date(fecha);
    return date.toLocaleDateString('en-GB');
  }

  formatearHora(fecha: string) {
    let date = new Date(fecha);
    let hora = date.toLocaleTimeString('en-GB').split(':');
    return `${hora[0]}:${hora[1]}`;
  }

  openModalDetalle(historia: HistoriaClinica) {
    this.historiaDetalle = historia;
  }

  closeModalDetalle() {
    this.historiaDetalle = null;
  }

  formatearEspecialista(email: string) {
    const especialista = this.especialistas.filter(x => x.email === email);
    return `${especialista[0].apellido}, ${especialista[0].nombre}`;
  }

  imprimirConsultas(especialidad: string) {

    const historiasImprimir = this.historias.filter(x => x.especialidad === especialidad);
    this.generatePdf(historiasImprimir);

  }



  async generatePdf(historias: HistoriaClinica[]) {
    
    let i = 1;
    let consultas: any[] = [];
    consultas.push(["#", "Especialidad", "Especialista", "Fecha", "Hora"]);
    historias.forEach(e => {
      consultas.push([i.toString(), e.especialidad, this.formatearEspecialista(e.especialista), this.formatearFecha(e.fecha), this.formatearHora(e.fecha)]);
      i++;
    })

    const docDefinition = {
  
      content: [
        {
          
          style: "tableTitle",
          table: {
            widths: [60, 300],
            body: [
                [{
                  image: await this.getBase64ImageFromURL("../../../assets/generico.png"),
                  height: 50,
                  width: 50,
                  border: [false, false, false, false]
                },
                {
                  text: 'Clinica Online',
                  style: "headerTitle",
                  border: [false, false, false, false]
                }
              ]
              
            ]
          }
        },
        {
          text:
            "Lista de Consultas",
          style: "subheader"
        },
        {
          style: "tableExample",
          table: {
            body: consultas
          }
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        headerTitle: {
          fontSize: 30,
          bold: true,
          margin: [20, 7, 0, 20]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 30, 100, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableTitle: {
          margin: [0, 5, 0, 40],
        }
      }
    };

    pdfMake.createPdf(docDefinition).download("consultas.pdf");

  }

  async getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


}
