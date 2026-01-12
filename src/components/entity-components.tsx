import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";

type EntityHeaderProps = {
    name: string;
    description?: string;
    newButtonLebal?: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
        | { onNew: () => void, newButtonHref?: never }
        | { newButtonHref: string, onNew?: never }
        | { onNew?: never, newButtonHref?: never }
    )

export const EntityHeader = ({
    name,
    description,
    newButtonLebal,
    disabled,
    isCreating,
    onNew,
    newButtonHref
}: EntityHeaderProps) => {
    return (
        <div className="flex flex-row justify-between gap-4 border-b">
            <div className="flex flex-col">
                <span className="font-semibold"> {name} </span>
                {description && (
                    <span className="text-muted-foreground text-sm mb-5"> {description} </span>
                )}
            </div>
            {onNew && !newButtonHref && (
                <Button
                    onClick={onNew}
                    variant={"outline"}
                    disabled={disabled || isCreating}
                >
                    <PlusIcon />
                    {newButtonLebal}
                </Button>
            )}

            {newButtonHref && !onNew && (
                <Link href={newButtonHref} prefetch>
                    <PlusIcon />
                    {newButtonLebal}
                </Link>
            )}
        </div>
    )
}

interface EntityContainerProps {
    children?: React.ReactNode;
    header: React.ReactNode;
    search?: React.ReactNode;
    pagination?: React.ReactNode;
}

export const EntityContainer = ({
    children,
    header,
    search,
    pagination
}: EntityContainerProps) => {
    return (
        <div className="flex flex-col gap-5 px-9 py-8">
            {header}
            <div className="flex flex-col items-end mb-3">
                {search}
            </div>
            <div className="flex flex-col ">
                <div>
                    {children}
                </div>
                <div className="fixed mb-5 justify-between sm:w-150  md:w-240 items-center bottom-0">
                    {pagination}
                </div>
            </div>
        </div>
    )
}


// Entity-search

interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeHolder?: string;
}

export const EntitySearch = ({
    value,
    onChange,
    placeHolder = "Search"
}: EntitySearchProps) => {
    return (
        <div className="relative">
            <SearchIcon className="absolute ml-5 size-4 top-1/2 -translate-1/2" />
            <Input
                className="w-60 pl-9"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeHolder}
            />
        </div>
    )
}

// Entity-pagination

interface EntityPaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    disabled?: boolean;
}

export const EntityPagination = ({
    page,
    onPageChange,
    totalPages,
    disabled
}: EntityPaginationProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="font-semibold">
                {page} of {totalPages || 1}
            </div>
            <div className="flex flex-row justify-end gap-3">
                <Button
                    variant={"outline"}
                    disabled={page === 1 || disabled}
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                >
                    Prev
                </Button>
                <Button
                    variant={"outline"}
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
