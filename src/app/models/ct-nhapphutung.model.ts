import { Phutung } from './phutung.model';

export class CTNhapphutung {
    constructor(
        public idctnhappt: string,
        public phutung: Phutung,
        public soluong: number,
        public dongia: number,
        public thanhtien: number
    ) {}
}