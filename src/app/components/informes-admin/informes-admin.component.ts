import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log';
import { FirestoreService } from 'src/app/services/firestore.service';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup } from '@angular/forms';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informes-admin',
  templateUrl: './informes-admin.component.html',
  styleUrls: ['./informes-admin.component.css']
})
export class InformesAdminComponent implements OnInit {

  logs: Log[];
  turnosPorEspecialidad = [];
  turnosPorDia = [];
  turnosSolicitados = [];
  turnosFinalizados = [];

  range: FormGroup;

  informeElegido:string = 'logs';

  horaInicio = new Date('01/01/2023');
  horaFin = new Date('12/31/2023');

  turnos: Turno[];
  especialistas: Usuario[];
  turnosPorRango: Turno[];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  view: [number, number] = [500, 500];
  legendPosition: string = 'below';

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  constructor(
    private firestore: FirestoreService
  ) {
    //Object.assign(this, { single });
  }


  ngOnInit(): void {

    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    
    this.firestore.obtenerLogs().subscribe(res => {
      this.logs = res;
    })

    this.firestore.obtenerTurnos().subscribe( res => {

      this.turnos = res;

      const especialidades = [];
      const dias = [];

      this.turnosPorEspecialidad = [];
      this.turnosPorDia = [];

      res.forEach(t => {
        if(!especialidades.includes(t.especialidad)) {
          especialidades.push(t.especialidad);
        }

        if(!dias.includes((new Date(t.fecha)).toLocaleDateString())) {
          dias.push((new Date(t.fecha)).toLocaleDateString());
        }
      });
      
      especialidades.forEach(e => {
        const tuernosFiltrados = res.filter(x => x.especialidad === e);
        this.turnosPorEspecialidad.push({name: e, value: tuernosFiltrados.length});
      });

      dias.forEach(d => {
        const tuernosFiltrados2 = res.filter(x => (new Date(x.fecha)).toLocaleDateString() === d);
        this.turnosPorDia.push({name: d, value: tuernosFiltrados2.length});
      });

      this.firestore.obtenerEspecialistas().subscribe(esp => {
        this.especialistas = esp;


        this.turnosPorRango = this.turnos.filter(x => new Date(x.fecha) >= new Date(this.horaInicio) && new Date(x.fecha) <= new Date(this.horaFin));
        console.log(this.turnosPorRango);
        this.generarTurnosEspecialista();

      })

      

    })
    
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //onsole.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  formatearFechaHora(value: string) {
    let date = new Date(value)
    let fecha = date.toLocaleDateString('en-GB');
    let hora = date.toLocaleTimeString('en-GB').split(':');
    return `${fecha} ${hora[0]}:${hora[1]}:${hora[2]}`;
  }


  formatearEspecialista(email: string) {
    const paciente = this.especialistas.filter(x => x.email === email);
    return `${paciente[0].apellido}, ${paciente[0].nombre}`;
  }


  formatearHora(fecha: string) {
    let date = new Date(fecha);
    let hora = date.toLocaleTimeString('en-GB').split(':');
    return `${hora[0]}:${hora[1]}`;
  }



  elegirInforme(informe: string) {
    this.informeElegido = informe;
  }


  actualizarHora() {
    const { start, end } = this.range.getRawValue();
    this.horaInicio = (new Date(start));
    this.horaFin = (new Date(end));
    console.log(this.horaInicio, this.horaFin);

    this.turnosPorRango = this.turnos.filter(x => new Date(x.fecha) >= this.horaInicio && new Date(x.fecha) <= this.horaFin);
    console.log(this.turnosPorRango);

    this.generarTurnosEspecialista();
  }


  generarTurnosEspecialista() {

    const especialistas = [];
    const dias = [];

    this.turnosSolicitados = [];
    this.turnosFinalizados = [];

    this.turnosPorRango.forEach(t => {
      if(!especialistas.includes(t.especialista)) {
        especialistas.push(t.especialista);
      }

    });
    
    especialistas.forEach(e => {
      const tuernosFiltradosSolicitados = this.turnosPorRango.filter(x => x.especialista === e);
      this.turnosSolicitados.push({name: this.formatearEspecialista(e), value: tuernosFiltradosSolicitados.length});

      const tuernosFiltradosFinalizados = this.turnosPorRango.filter(x => x.especialista === e && x.estado === 'finalizado');
      this.turnosFinalizados.push({name: this.formatearEspecialista(e), value: tuernosFiltradosFinalizados.length});
    });

  }







  async generateLogsPdf() {
    
    let i = 1;
    let logsPrint: any[] = [];
    logsPrint.push(["#", "Usuario", "Fecha"]);
    this.logs.forEach(t => {
      logsPrint.push([i.toString(), t.usuario, this.formatearFechaHora(t.fechaHora)]);
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
            "Lista de logs",
          style: "subheader"
        },
        {
          style: "tableExample",
          table: {
            body: logsPrint
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

    pdfMake.createPdf(docDefinition).download("Logs.pdf");


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


  generatePdfChart(elementId: string) {
    let DATA = <HTMLElement>document.getElementById(elementId);

    let titulo = this.generarTitulo(elementId);

    html2canvas(DATA, {height: 500}).then(async (canvas) => {

      const FILEURI = canvas.toDataURL('image/jpg');
      console.log(FILEURI);

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
          text: titulo,
          style: "subheader"
        },
        {
          image: await this.getBase64ImageFromURL(FILEURI),
          //height: 500,
          //width: 500,
          //border: [false, false, false, false]
        },
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
    pdfMake.createPdf(docDefinition).download("Logs.pdf");
    });
  }

  rederGroupedBarChart(){
    html2canvas(document.getElementById('turnosPorEspecialidad'), {height: 500, scale: 1})
      .then((canvas) => {
        console.log(canvas);
        document.body.appendChild(canvas);
      })
  }

  generarTitulo(id: string) {
    let titulo = '';
    if(id === 'turnosPorEspecialidad') {
      titulo = 'Turnos por Especialista';
    }
    else if(id === 'turnosPorDia') {
      titulo = 'Turnos por Fecha';
    }
    else if(id === 'turnosSolicitadosPorEspecialista') {
      titulo = 'Turnos Solicitados por Especialista';
    }
    else if(id === 'turnosFinalizadosPorEspecialista') {
      titulo = 'Turnos Finalizados por Especialista';
    }
    return titulo;
  }

  


}






















