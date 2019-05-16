import { Phieusuachua } from '../models/phieusuachua.model';
import { Phieutiepnhan } from '../models/phieutiepnhan.model';
import { Phieuthutien } from '../models/phieuthutien.model';
import { Nhapphutung } from '../models/nhapphutung.model';

export interface Phieufilter {
    phieu: Phieutiepnhan | Phieusuachua | Phieuthutien | Nhapphutung;
    bienso: string;
    ngay: {
        day: string;
        month: string;
        year: string;
    };
    type: Stage;
}

export interface Stage {
    tiepnhan?: boolean;
    suachua?: boolean;
    thutien?: boolean;
    /* nhappt?: boolean; */
}
