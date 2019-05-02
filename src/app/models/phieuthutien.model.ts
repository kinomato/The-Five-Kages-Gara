export class Phieuthutien {
    constructor(
        public tenchuxe: string,
        public bienso: string,
        public dienthoai: string,
        public ngaythutien: {
            day: string,
            month: string,
            year: string,
        },
        public sotienthu: number
    ) {}
}
