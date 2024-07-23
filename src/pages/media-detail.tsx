import {IonContent, IonPage, IonRefresher, IonRefresherContent} from '@ionic/react';
import {Button, Empty, FloatButton, Image, message, Popconfirm} from "antd";
import {DeleteOutlined, LeftOutlined, PlusCircleOutlined} from "@ant-design/icons"
import {useHistory, useParams, useLocation} from "react-router";
import {useState} from "react";
import {useDelete, useGetList} from "../hooks/useApi";
import MediaDetailEntity from "../entity/media-detail";
import DetailModal from "./shared/detail-modal";
import SkeletonList from "./shared/skeleton-list";

const MediaDetailPage: React.FC = () => {
    const history = useHistory()
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      };
      const query = useQuery();
    const params = useParams<{
        idMedia: string,
        idUser: string
    }>()

    const {data, isLoading, refetch} = useGetList<{ id: number, detail: MediaDetailEntity[] }>({
        name: "media_detail",
        endpoint: `/mediadetail/${params?.idMedia}/${params?.idUser}`,
        params: {}
    })

    const {mutate} = useDelete({
        name: "media_detail",
        endpoint: `/mediadetail`,
        options:{
            onSuccess: async () => {
                await refetch()
                message.success("Berhasil menghapus data")

            }
        }
    })

    const [modal, setModal] = useState<boolean>(false)


    function handleDeleteClick(item: MediaDetailEntity) {
        // @ts-ignore
        mutate(item.id)
    }

    return (
        <IonPage>

            <IonContent fullscreen className={"py-6"}>
                <IonRefresher
                    slot="fixed"
                    onIonRefresh={(e) => {
                        refetch();
                        e.detail.complete();
                    }}
                >
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div
                    className={"py-3 px-4 text-white justify-between font-semibold  flex gap-4 items-center bg-[#1677ff] "}>

                    <h3 className={"text-lg font-medium"}>Detail Media</h3>

                    <Button
                        size={"large"}
                        icon={<LeftOutlined/>}
                        type={"primary"}
                        onClick={() => {
                            history.goBack()
                        }}
                    />
                </div>


                {
                    isLoading ?
                        <SkeletonList isLoading={isLoading}/> :
                        <div className={" gap-3"}>
                            {
                                !data && <Empty className={"my-24"} />
                            }
                            {
                                data?.detail?.map((item, i) =>
                                    <div
                                        className={"flex border-b-[1px] gap-2 p-3 w-full justify-between items-center"}>
                                        <div className={"flex gap-4 items-center"}>
                                            <Image
                                                src={`https://mattiro.banisadar.com/img/proyek_img/${item.nama_file}`}
                                                style={{
                                                    borderRadius: "8px",
                                                }}
                                                width={50}
                                            />
                                            <p>{item.deskripsi}</p>
                                        </div>
                                        <div className={"space-x-1"}>
                                            {
                                            query.get("status") === 'open' &&
                                            <Popconfirm
                                                placement="left"
                                                title={"Hapus"}
                                                description={"Apakah yakin ingin menghapus data ini ?"}
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleDeleteClick(item)}
                                                // okButtonProps={{ loading: confirmLoading }}
                                                // onCancel={handleCancel}
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: "#ef4444",
                                                        color: "white"
                                                    }}
                                                    icon={<DeleteOutlined/>}
                                                />
                                            </Popconfirm>}
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                }
                {
                     query.get("status") === 'open' &&
                    <FloatButton
                    icon={<PlusCircleOutlined/>}
                    shape={"circle"}
                    type={"primary"}
                    onClick={() => setModal(true)}
                />
                }
                

                <DetailModal
                    isOpen={modal}
                    handleCancel={() => setModal(false)}
                    setIsOpen={setModal}
                    data={data}
                    refetch={refetch}
                />
            </IonContent>
        </IonPage>
    );
};


export default MediaDetailPage;
