export class Phieutiepnhan {
    constructor(
        public idphieutiepnhan: string,
        public ngaytiepnhan: {
            day: string,
            month: string,
            year: string
        },
        public bienso: string,
        public hieuxe: string,
        public idkhachhang: string,
        public tenkhachhang: string,
        public dienthoai: string,
        public diachia: string,
        public suachuastt: boolean,
        public tiennostt: boolean,
        public thutienstt: boolean,
        public idsuachua?: string,
        public tienno?: number,
        public idthutien?: string
        /* public tenkhach?: string,
        public dienthoai?: string,
        public diachi?: string,
        public idhieuxe?: string,
        public idxesua?: string, */
    ) {}
}
