import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { PacienteHistoria } from 'src/app/models/paciente-historia';
import { Turno } from 'src/app/models/turno';
import { TurnoCompleto } from 'src/app/models/turno-completo';
import { Usuario } from 'src/app/models/usuario';
import { ExcelService } from 'src/app/services/excel.service';
import { FirestoreService } from 'src/app/services/firestore.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})

export class SeccionUsuariosComponent implements OnInit{
  
  usuarios: Usuario[];
  loading: boolean = false;

  mostrarPacientes = true;

  pacientes: Usuario[];
  especialistas: Usuario[];
  historias: HistoriaClinica[];
  pacientesHistorias: PacienteHistoria[];
  turnos: Turno[];
  turnosCompletos: TurnoCompleto[];
  pacienteTurnoCompleto: any[];
  
  historiaDetalle: HistoriaClinica;

  constructor(
    private firestore: FirestoreService,
    private excel: ExcelService
  ){}
  
  ngOnInit(): void {
    this.loading = true;
    this.firestore.obtenerTodosUsuarios().subscribe(res => {
      this.usuarios = res;
      this.loading = false;
    })

    this.firestore.obtenerEspecialistas().subscribe(esp => {
      this.especialistas = esp;

      this.firestore.obtenerPacientes().subscribe(pac => {
        this.pacientes = pac;
  
        this.firestore.obtenerHistoriasClinicas().subscribe(his => {
          this.historias = his;
  
          this.pacientesHistorias = [];
  
          this.pacientes.forEach(p => {
  
            const hisAux = this.historias.filter(h => h.paciente === p.email);
  
            const pacienteHistoria: PacienteHistoria = {
              paciente: p,
              historias: hisAux.length > 0 ? hisAux : null 
            }
  
            this.pacientesHistorias.push(pacienteHistoria);

          });
  
        });
      });

    });

    
  }

  activarUsuario(usuario: Usuario) {
    this.firestore.activarUsuario(usuario);
  }

  desactivarUsuario(usuario: Usuario) {
    this.firestore.desactivarUsuario(usuario);
  }

  descargarExcel() {
    this.excel.generateExcel(this.usuarios);
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

  formatearFechaHora(value: string) {
    let date = new Date(value)
    let fecha = date.toLocaleDateString('en-GB');
    let hora = date.toLocaleTimeString('en-GB').split(':');
    return `${fecha} ${hora[0]}:${hora[1]}:${hora[2]}`;
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



  generatePdf(paciente: Usuario) {
    

    this.firestore.obtenerTurnosPorPaciente(paciente.email).subscribe(async tur => {

      let i = 1;
      let turnoPrint: any[] = [];
      turnoPrint.push(["#", "Fecha", "Especialidad", "Especialista", "Estado"]);
      tur.forEach(t => {
        turnoPrint.push([i.toString(), this.formatearFechaHora(t.fecha), t.especialidad, this.formatearEspecialista(t.especialista), t.estado]);
        i++;
      })

      console.log(turnoPrint);

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
          { text: paciente.apellido + ' ' + paciente.nombre, style: "header" },
          "DNI: " + paciente.dni,
          "Edad: " + paciente.edad,
          "O. Social: " + paciente.obraSocial,
          "Email: " + paciente.email,
          {
            text:
              "Lista de turnos",
            style: "subheader"
          },
          {
            style: "tableExample",
            table: {
              body: turnoPrint
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

      pdfMake.createPdf(docDefinition).download("test.pdf");

    })

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
