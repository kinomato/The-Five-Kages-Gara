export class Phieutiepnhan {
    constructor(
        public idphieutiepnhan: string,
        public ngaytiepnhan: Date,
        public biensoxe: string,
        public hieuxenhan: string,
        public idkhachhang: string,
        public tenkhach?: string,
        public sodienthoai?: string,
        public diachi?: string,
        public idhieuxe?: string,
        public idxesua?: string,
    ) {}
}
