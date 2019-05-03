export class Phieuthutien {
    constructor(
        public idphieuthutien: string,
        public tenchuxe: string,
        public bienso: string,
        public dienthoai: string,
        public diachi: string,
        public ngaythutien: {
            day: string,
            month: string,
            year: string,
        },
        public sotienthu: number
    ) {}
}
