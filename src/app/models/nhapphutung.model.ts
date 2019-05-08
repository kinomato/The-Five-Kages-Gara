export class Nhapphutung {
    constructor(
        public idnhappt: string,
        public ngaynhap: {
            day: string,
            month: string,
            year: string
        },
        public tongtien: number
    ) {}
}