import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { Button, List } from 'antd';
import { useGetList } from '../hooks/useApi';
import ProyekEntity from '../entity/proyek';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams } from 'react-router';
import SkeletonList from './shared/skeleton-list';
import { useAuth } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MediaPage: React.FC = () => {
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const params = useParams<{id:string}>();
  console.log(params)
  const query = useQuery();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useGetList<ProyekEntity[]>({
    name: 'proyek_media',
    endpoint: `/proyekmedia/${user?.id}/${params?.id}`,
    params: {},
  });

  function handleMediaClick(item: ProyekEntity) {
    history.push(`/proyek/${item.id}/${item.id_user}?status=${query.get("status")}`);
  }

  return (
    <IonPage>
      <IonContent fullscreen className={'py-6'}>
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
          className={
            'py-3 px-4 text-white justify-between font-semibold  flex gap-4 items-center bg-[#1677ff] '
          }
        >
          <h3 className={'text-lg font-medium'}>List Media</h3>
          <Button
            size={'large'}
            icon={<LeftOutlined />}
            type={'primary'}
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        {isLoading ? (
          <SkeletonList isLoading={isLoading} />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={data}
            className={'px-4'}
            renderItem={(item, index) => (
              <List.Item onClick={() => handleMediaClick(item)}>
                <List.Item.Meta
                  // title={<Link to={`/detail/${item?.id_proyek}`}>{item?.nama_media}</Link>}
                  title={item?.nama_media}
                  // description={item?.proyek?.nama_proyek}
                />
              </List.Item>
            )}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default MediaPage;
