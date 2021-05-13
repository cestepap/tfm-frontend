export class Dieta {
    idCliente: string;
    idProfesional: string;
    titulo: string;
    descripcion?: string;
    fechaInicio: string;
    estado: string;
    proteinasTotalesSemana?: number;
    chsTotalesSemana?: number;
    grasasTotalesSemana?: number;
    kcalTotalesSemana?: number;
    diaSemanaDieta: Array<string>;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}