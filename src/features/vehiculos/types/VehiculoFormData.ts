export interface VehiculoFormData {
    placa: string;
    tipo: 'AUTO' | 'MOTO' | 'CAMIONETA' | 'SUV' | '';
    marca: string;
    modelo: string;
    color: string;
    clienteId: string; // En el formulario es string porque proviene del <select> HTML
}