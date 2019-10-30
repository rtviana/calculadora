import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services/calculadora.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  constructor(
    //injecao de servico / dependencia
    private calculadoraService: CalculadoraService
  ) { }

  private numero1: string
  private numero2: string
  private resultado: number
  private operacao: string

  ngOnInit() {
    //inicializa limpando os valores
    this.limpar()
  }

  //inicialização dos operadores para os valores padrão
  public limpar(): void{
    this.numero1 = '0'
    this.numero2 = null
    this.resultado = null
    this.operacao = null
  }

  public adicionarNumero(numero: string): void{
    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1, numero)
    } else{
      this.numero2 = this.concatenarNumero(this.numero2, numero)
    }
  }

  public concatenarNumero(numAtual: string, numConcat: string): string {
    
    //caso contenha apenas 0 ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = ''
    }

    //primeiro digito é . (ponto), concatena 0 antes do ponto
    if (numConcat === '' && numAtual === '') {
      return '0.'
    }
    
    //caso . digitado ja contenha um ., apenas retorna (index busca o ponto dentro da string)
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual
    }

    return numAtual + numConcat
  }

  //public
  public definirOperacao(operacao: string): void{

    //apenas define a operação caso nao exista uma
    if(this.operacao === null){
      this.operacao = operacao
      return
    }

    //caso a operaçao definida e numero 2 selecionado, efetua o calculo da operação
    if (this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao)

        this.operacao = operacao
        this.numero1 = this.resultado.toString()
        this.numero2 = null
        this.resultado = null
    }
  }

  //efetua o calculo da operação
  public calcular(): void {
    if(this.numero2 === null){
      return
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao
    )
  }

  //retorno o valor a ser exibido na tela da calculadora
  get display(): string{
    if(this.resultado !== null){
      return this.resultado.toString()
    }

    if(this.numero2 !== null){
      return this.numero2
    }
    return this.numero1
  }
}