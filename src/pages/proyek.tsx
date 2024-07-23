import {IonContent, IonPage, IonRefresher, IonRefresherContent} from '@ionic/react';
import {List} from "antd";
import {useGetList} from "../hooks/useApi";
import ProyekEntity from "../entity/proyek";
import {useHistory} from "react-router";
import SkeletonList from "./shared/skeleton-list";

const Proyek: React.FC = () => {
    const history = useHistory()
    const {data, isLoading, refetch} = useGetList<ProyekEntity[]>({
        name: "proyek",
        endpoint: "/listproyek/5",
        params: {}
    })

    function handleProyekClick(item: ProyekEntity) {
        history.push(`/proyek/${item.id_proyek}`)
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
                    <h3 className={"text-lg font-medium"}>List Proyek</h3>
                </div>
                {
                    isLoading ?
                        <SkeletonList isLoading={isLoading}/>
                        : <List
                            itemLayout="horizontal"
                            dataSource={data}
                            className={"px-4"}
                            renderItem={(item, index) => (
                                <List.Item onClick={() => handleProyekClick(item)}>
                                    <List.Item.Meta
                                        // title={<Link to={`/detail/${item?.id_proyek}`}>{item?.nama_media}</Link>}
                                        title={item?.nama_media}
                                        description={item?.proyek?.nama_proyek}
                                    />
                                </List.Item>
                            )}
                        />
                }
            </IonContent>
        </IonPage>
    );
};

export default Proyek;
