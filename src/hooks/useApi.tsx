import {create, destroy, getDetail, getList, update} from "../lib/api";
import {useMutation, UseMutationOptions, useQuery, useQueryClient} from "@tanstack/react-query";
import {message} from "antd";


interface IGet {
    name: string;
    endpoint: string;
    params: object;
}


export function useGetList<T>({
                                  name,
                                  endpoint,
                                  params
                              }: IGet) {

    return useQuery<T>({
        queryKey: [name, params],
        queryFn: async ({queryKey}) => await getList(endpoint, queryKey[1]),
    });
}

interface IGetDetail extends Omit<IGet, "params"> {
    id: string
}

export function useGetDetail<T>({
                                    name,
                                    endpoint,
                                    id
                                }: IGetDetail) {

    return useQuery<T>({
        queryKey: [name, id],
        queryFn: async ({queryKey}) => await getDetail<T>(endpoint, queryKey[1] as string),
    });
}

interface IPOST {
    name: string;
    endpoint: string;
    options?: UseMutationOptions
}


export function usePost({
                            name,
                            endpoint,
    options
                        }: IPOST) {
    const queryClient = useQueryClient()
    return useMutation({

        onSuccess: async () => {
            message.success("Berhasil")
            return await queryClient.invalidateQueries({
                queryKey: [name]
            })
        },
        onError: () => {
            message.error("Gagal menambahkan data!")
        },
        mutationFn: (data) => {
            return create(endpoint, data)
        },
        ...options
    })
}

export function usePut({
                           name,
                           endpoint,
                           id
                       }: IPOST & { id: string }) {
    const queryClient = useQueryClient()
    return useMutation({
        onSuccess: async () => {
            return await queryClient.invalidateQueries({
                queryKey: [name]
            })
        },
        onError: () => {

        },
        mutationFn: (data) => {
            return update(id, endpoint, data)
        },
    })
}

export function useDelete({
                              name,
                              endpoint,
                          }: IPOST) {
    const queryClient = useQueryClient()
    return useMutation({
        onSuccess: async () => {
            return await queryClient.invalidateQueries({
                queryKey: [name]
            })
        },
        onError: () => {

        },
        mutationFn: (id: string) => {
            return destroy(id, endpoint)
        },
    })
}
