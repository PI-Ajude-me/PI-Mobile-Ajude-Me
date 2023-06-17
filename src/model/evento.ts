import { PessoaFisica, PessoaJurica } from './pessoa';

export class Evento{
    id?: number;
    titulo?: string;
    descricao?: string;
    data: Date = new Date();
    fisicaeventos?:PessoaFisica;
    juridicaeventos?:PessoaJurica;

}