import { Injectable } from '@angular/core';
import { nmcall } from 'q';

@Injectable()
export class CalculadoraService {

  constructor() { }

  //definição das constantes de calcula

  static readonly SOMA: string = '+'
  static readonly SUBTRACAO: string = '-'
  static readonly DIVISAO: string = '/'
  static readonly MULTIPLICAO: string = '*'

  //metodo para o calculo das operações matematicas

  public calcular (num1: number, num2: number, operacao: string): number{

    let resultado: number

    switch(operacao){
      case CalculadoraService.SOMA: 
      resultado = num1 + num2
      break;

      case CalculadoraService.SUBTRACAO: 
      resultado = num1 - num2
      break;

      case CalculadoraService.MULTIPLICAO: 
      resultado = num1 * num2
      break;

      case CalculadoraService.DIVISAO: 
      resultado = num1 / num2
      break;

      default: resultado = 0
    }

    return resultado
  }

}
