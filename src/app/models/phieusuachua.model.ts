export class Phieusuachua {
    constructor(
        public idphieusuachua: string,
        public bienso: string,
        public ngaysuachua: {
            day: string,
            month: string,
            year: string
        },
        public tongtien: number
    ) {}
}
