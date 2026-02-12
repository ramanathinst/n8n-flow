"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, Loader2, Plus, Inbox } from "lucide-react"
import { Search, X } from "lucide-react"
import { MoreVertical, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { PAGINATION } from "@/config/constants"

interface EntityPaginationProps {
    page?: number
    totalPages: number
    onPageChange: (page: number) => void
    disabled?: boolean
}

export function EntityPagination({
    page = 1,
    totalPages,
    onPageChange,
    disabled = false,
}: EntityPaginationProps) {
    const currentPage = Math.max(1, Math.min(page, totalPages || 1))

    const hasPreviousPage = currentPage > 1
    const hasNextPage = currentPage < totalPages

    const isPrevDisabled = disabled || !hasPreviousPage
    const isNextDisabled = disabled || !hasNextPage

    return (
        <Pagination>
            <PaginationContent className="flex items-center gap-4">

                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (!isPrevDisabled) {
                                onPageChange(currentPage - 1)
                            }
                        }}
                        className={
                            isPrevDisabled
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                {/* Page Info */}
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages || 1}
                </span>

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if (!isNextDisabled) {
                                onPageChange(currentPage + 1)
                            }
                        }}
                        className={
                            isNextDisabled
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}


// Entity container 
type EntityContainerProps = {
    header?: React.ReactNode
    search?: React.ReactNode
    pagination?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function EntityContainer({
    header,
    search,
    pagination,
    children,
    className,
}: EntityContainerProps) {
    return (
        <div
            className={cn(
                "flex h-full flex-col gap-4 rounded-xl bg-background p-4",
                className
            )}
        >
            {/* Header */}
            <div className="gap-2">
                {header}
            </div>
            <div className="w-full sm:w-auto mt-2 mb-2 ml-auto">
                {search}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto rounded-lg border bg-card">
                {children}
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex fixed bottom-0 right-3 left-3 items-center justify-end">
                    {pagination}
                </div>
            )}
        </div>
    )
}

// Entity-header 
type BaseProps = {
    title: string
    description?: string
    disabled?: boolean
    isCreating?: boolean
    className?: string
}

/* --------------------------------------------------
 * Mutually exclusive action props
 * -------------------------------------------------- */
type WithNewButton = {
    onNewButton: () => void
    onNewHref?: never
}

type WithNewHref = {
    onNewHref: string
    onNewButton?: never
}

type WithoutAction = {
    onNewButton?: never
    onNewHref?: never
}

type EntityHeaderProps =
    | (BaseProps & WithNewButton)
    | (BaseProps & WithNewHref)
    | (BaseProps & WithoutAction)

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */
export function EntityHeader({
    title,
    description,
    onNewButton,
    onNewHref,
    disabled,
    isCreating,
    className,
}: EntityHeaderProps) {
    const isActionDisabled = disabled || isCreating

    return (
        <div className="flex items-center justify-between">
            {/* Left */}
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {/* Right */}
            {(onNewButton || onNewHref) && (
                <div className="ml-auto flex items-center gap-2">
                    {onNewButton && (
                        <Button
                            onClick={onNewButton}
                            disabled={isActionDisabled}
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Workflow
                                </>
                            )}
                        </Button>
                    )}

                    {onNewHref && (
                        <Button asChild disabled={isActionDisabled}>
                            <Link href={onNewHref}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Workflow
                            </Link>
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

// Entity-search
type EntitySearchProps = {
    /** Input placeholder */
    placeholder?: string

    /** Controlled value */
    value: string

    /** Change handler */
    onChangeValue: (value: string) => void

    /** Optional className */
    className?: string
}

export function EntitySearch({
    placeholder = "Search...",
    value,
    onChangeValue,
    className,
}: EntitySearchProps) {
    return (
        <div
            className={cn(
                "relative flex w-full max-w-sm items-center",
                className
            )}
        >
            {/* Search icon */}
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />

            <Input
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                placeholder={placeholder}
                className="pl-9 pr-9"
            />

            {/* Clear button */}
            {value && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 h-7 w-7"
                    onClick={() => onChangeValue("")}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}

// Loading-view
type LoadingViewProps = {
    message?: string
    className?: string
}

export function LoadingView({
    message,
}: LoadingViewProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            {message}
        </div>
    )
}

// Error-view
type ErrorViewProps = {
    /** Error message shown to the user */
    message?: string

    /** Optional className override */
    className?: string
}

export function ErrorView({
    message = "Something went wrong.",
}: ErrorViewProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <AlertTriangleIcon className="h-6 w-6 text-destructive" />
            {message}
        </div>
    )
}

// Empty-view
type EmptyviewProps = {
    /** Empty state message */
    message: React.ReactNode;

    /** Disable action button */
    disabled?: boolean

    /** Loading state for create action */
    isCreating?: boolean

    /** Optional className */
    className?: string
}

/* --------------------------------------------------
 * Mutually exclusive create actions
 * -------------------------------------------------- */
type WithCreateButton = {
    onCreate: () => void
    createHref?: never
}

type WithCreateHref = {
    createHref: string
    onCreate?: never
}

type WithoutCreateAction = {
    onCreate?: never
    createHref?: never
}

type EmptyViewProps =
    | (EmptyviewProps & WithCreateButton)
    | (EmptyviewProps & WithCreateHref)
    | (EmptyviewProps & WithoutCreateAction)

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */
export function EmptyView({
    message,
    onCreate,
    createHref,
    disabled,
    isCreating,
    className,
}: EmptyViewProps) {
    const isActionDisabled = disabled || isCreating

    return (
        <div
            className={cn(
                "flex min-h-65 w-full flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center",
                className
            )}
        >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Message */}
            <div className="max-w-sm text-sm text-muted-foreground">
                {message}
            </div>

            {/* Create Workflow action */}
            {(onCreate || createHref) && (
                <div className="mt-2">
                    {onCreate && (
                        <Button
                            onClick={onCreate}
                            disabled={isActionDisabled}
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating workflow
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create workflow
                                </>
                            )}
                        </Button>
                    )}

                    {createHref && (
                        <Button asChild disabled={isActionDisabled}>
                            <Link href={createHref}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create workflow
                            </Link>
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

// Entity-list

type EntityListItemProps = {
    href: string;
    icon?: React.ReactNode | string;
    name: string;
    subTitle?: React.ReactNode;
    onRemove?: () => void | Promise<void>;
    isRemoveing?: boolean;
    disabled?: boolean;
    className?: string;
}

export function EntityListItem({
    href,
    icon,
    name,
    subTitle,
    onRemove,
    isRemoveing,
    disabled,
    className,
}: EntityListItemProps) {
    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isRemoveing) {
            return;
        }
        if (onRemove) {
            await onRemove();
        }
    }


    return (
        <Link
            href={href}
            className={cn(
                "group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50",
                className
            )}
        >
            {/* Icon */}
            {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <span className="font-medium leading-none truncate">
                    {name}
                </span>

                <span className="text-xs text-muted-foreground truncate">
                    {subTitle}
                </span>
            </div>

            {/* Actions (RIGHT SIDE) */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"              // ⚠️ destructive buttons inside links are bad UX
                        size="icon"
                        disabled={disabled}
                        className="opacity-0 transition-opacity group-hover:opacity-100 shrink-0"
                        onClick={(e) => {
                            e.preventDefault();        // stop link navigation
                            e.stopPropagation();
                        }}
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" sideOffset={4}>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive focus:text-destructive cursor-pointer"
                        disabled={isRemoveing}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </Link>
    );
}


// Entity-list 

type EntityListProps<T> = {
    items: T[];
    renderItem?: (item: T, index: number) => React.ReactNode;
    getKey: (item: T, index: number) => string | number;
    disabled?: boolean
    emptyView?: React.ReactNode;
    className?: string
}

export function EntityList<T>({
    items,
    renderItem,
    getKey,
    disabled,
    emptyView,
    className,
}: EntityListProps<T>) {
    if (!items.length) {
        return <EmptyView message={emptyView} />
    }

    return (
        <div
            className={cn(
                "flex flex-col gap-2",
                disabled && "pointer-events-none opacity-60",
                className
            )}
        >
            {items.map((item, index) => (
                <div
                    key={getKey ? getKey(item, index) : index}
                >
                    {renderItem?.(item, index)}
                </div>
            ))}
        </div>
    )
}