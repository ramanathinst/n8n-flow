import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

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
            <div className="flex flex-col">
                {search}
                {children}
            </div>
            {pagination}
        </div>
    )
}