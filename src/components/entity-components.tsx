"use client"
import { FolderOpenIcon, Loader2Icon, LucideIcon, MoreVerticalIcon, PlusIcon, SearchIcon, TrashIcon, TriangleAlertIcon, WorkflowIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

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
                    className="cursor-pointer"
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
                <div className="">
                    {children}
                </div>
                <div className="fixed mb-2  justify-between sm:w-150  md:w-300 items-center bottom-0">
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

// State views
interface StateViewProps {
    message?: string;
}
// Loding view
export const LoadingView = ({
    message
}: StateViewProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Loader2Icon className="size-6 animate-spin" />
            {message}
        </div>
    )
}

// Loding view
export const ErrorView = ({
    message
}: StateViewProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <TriangleAlertIcon className="size-6" />
            {message}
        </div>
    )
}
// Empty view

interface EmptyViewProps extends StateViewProps {
    onNew?: () => void;
    disabled?: boolean;
}

export const EmptyView = ({
    message,
    onNew,
    disabled
}: EmptyViewProps) => {
    return (
        <Empty className="border-2 hover:bg-accent">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderOpenIcon />
                </EmptyMedia>
                <EmptyTitle>No Workflows Yet</EmptyTitle>
                {!!message && (
                    <EmptyDescription>
                        {message}
                    </EmptyDescription>
                )}
            </EmptyHeader>
            {!!onNew && (
                <EmptyContent>
                    <Button disabled={disabled} className="cursor-pointer" onClick={onNew} variant={"outline"}>
                        Create Workflow
                    </Button>
                </EmptyContent>
            )}
        </Empty>
    )
}

// Entity list

interface EntityListsProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getKey: (item: T, index: number) => string | number;
    emptyView?: React.ReactNode;
}

export function EntityLists<T>({
    items,
    renderItem,
    getKey,
    emptyView
}: EntityListsProps<T>) {

    if (items.length === 0 && emptyView) {
        return (
            <div className="flex flex-col items-center justify-center">
                {emptyView}
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center">
            {items.map((item, index) => (
                <div key={getKey ? getKey(item, index) : index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    )
}

// Entity item

interface EntityItemProps {
    href: string;
    image: React.ReactNode;
    title: string;
    subTitle?: React.ReactNode;
    isRemoving?: boolean;
    onRemove?: () => void | Promise<void>;
    actions?: React.ReactNode;
    className?: string;
}

export const EntityItem = ({
    href,
    image,
    title,
    subTitle,
    isRemoving,
    onRemove,
    actions,
    className
}: EntityItemProps) => {
    const handleSubmit = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isRemoving) {
            return
        }
        if (onRemove) {
            await onRemove();
        }
    }
    return (
        <Link href={href} prefetch
        >
            <Card className={cn("hover:bg-accent w-6xl mt-2", isRemoving && "hover:cursor-not-allowed bg-amber-100" , className)}>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <span>{image}</span>
                            <div className="space-x-3 ml-30">
                                <span className="font-semibold"> {title}</span>
                                <span className="text-muted-foreground text-sm">{subTitle}</span>
                            </div>
                        </div>
                        <div className="max-w-sm">
                            {(actions || onRemove) && (
                                <div className="flex flex-col">
                                    {actions}
                                    {onRemove && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button onClick={(e: React.MouseEvent) => e.stopPropagation()} variant="outline"> <MoreVerticalIcon /> </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent onClick={(e) => e.stopPropagation()} className="w-56">
                                                <Button disabled={isRemoving} onClick={handleSubmit}>
                                                    <TrashIcon />
                                                    <span>Delete</span>
                                                </Button>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}