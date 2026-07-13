export interface Alquiler{
    id?: string;
    clienteId:string;
    dias:string;
    fechaInicio:string;
    fechaFin:string;
    total:number;
    estado?:string;
}
