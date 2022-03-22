import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PoNotificationService]
})
export class AppComponent implements OnInit {
  nome: string;
  nomeRazao: string;
  dataInicio: string;
  descricao: string;
  input: string;
  api: string = environment.api
  constructor(private http: HttpClient,  private notify: PoNotificationService){
  
  }
  ngOnInit(): void {
  }
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];
  
  onClick() {
    this.http.get(`${this.api}/cnpj/v1/${this.input}`).subscribe((response: any) => {
      this.nome = response.nome_fantasia
      this.nomeRazao = response.razao_social
      this.dataInicio = response.data_inicio_atividade
      this.descricao = response.cnae_fiscal_descricao
    }, (error) => {
      this.notify.error("Não encontramos seu cnpj")
    })
  }
  }
