"use client";

import { PAGINATION } from "@/config/constants";
import { useEffect, useState } from "react";

interface UseEntitySearchProps<T extends {
    page: number;
    search: string;
}> {
    params: T;
    setParams: (params: T) => void;
    debounceMs?: number;
}

export function useEntitySearch<T extends {
    page: number;
    search: string;
}>({
    params,
    setParams,
    debounceMs = 1000
}: UseEntitySearchProps<T>) {
    const [localSearch, setLocalSearch] = useState(params.search);
    
        useEffect(() => {
            if(localSearch === "" && params.search !== "") {
                setParams({
                    ...params,
                    search: "",
                    page: PAGINATION.DEFAULT_PAGE
                })
            }
            const timer = setTimeout(() => {
                if(localSearch !== params.search){
                    setParams({
                        ...params,
                        search: localSearch,
                        page: PAGINATION.DEFAULT_PAGE
                    })
                }
            }, debounceMs)
            return () => clearTimeout(timer);
            
        }, [localSearch, debounceMs, setParams, params])

        useEffect(() => {
            if(params.search){
                setLocalSearch(localSearch)
            }
        }, [params.search])

        return {
            searchValue: localSearch,
            onSearchChange: setLocalSearch
        }
}