import { Spinner } from "@/components/ui/spinner";

export const Loading = () => {
    return (
        <div className="min-h-screen bg-transparent">
        <Spinner className="size-lg"/>
        </div>
    )
}