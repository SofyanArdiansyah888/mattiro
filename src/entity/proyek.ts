export default interface ProyekEntity {
    id: number;
    id_proyek: number;
    id_user: number;
    nama_media: string;
    proyek: {
        id: number;
        nama_proyek: string
    }
}