export class Comida {
    idDiaSemanaDieta: string;
    nombre: string;
    hora: string;
    proteinasComida?: number;
    chsComida?: number;
    grasasComida?: number;
    kcalComida?: number;
    detalleComida: Array<object>;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}