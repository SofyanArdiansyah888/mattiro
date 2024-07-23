import {Skeleton} from "antd";

export default function SkeletonList({isLoading}:{isLoading: boolean}) {
    return <div className={"p-4 space-y-2"}>
        {
            [1, 2, 3, 4].map((_,index) => <Skeleton key={index} active={isLoading} loading={isLoading}/>)
        }
    </div>
}