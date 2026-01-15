"use client"
import { NodeSelector } from "@/components/node-selector"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

export const AddNodeButton = () => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
            <Button
                variant={"outline"}
                onClick={() => setSelectorOpen(true)}
                className="cursor-pointer"
            >
                <PlusIcon />
            </Button>
        </NodeSelector>
    )
}