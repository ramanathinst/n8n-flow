import { PAGINATION } from "@/config/constants";
import React from "react";

interface UseEntityDebouncedSearchInputProps<T extends {
    page: number;
    search: string;
}> {
    params: T;
    setParams: (params: T) => void;
    debouncedMs?: number;
}

export function useEntityDebouncedSearchInput<
    T extends { page: number; search: string }
>({
    params,
    setParams,
    debouncedMs = 800,
}: UseEntityDebouncedSearchInputProps<T>) {
    const [localSearch, setLocalSearch] = React.useState(params.search);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (localSearch !== params.search) {
                setParams({
                    ...params,
                    search: localSearch,
                    page: PAGINATION.DEFAULT_PAGE,
                });
            }
        }, debouncedMs);

        return () => clearTimeout(timeout);
    }, [localSearch, params.search, debouncedMs]);

    React.useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search]);

    return {
        searchValue: localSearch,
        setSearchValue: setLocalSearch,
    };
}