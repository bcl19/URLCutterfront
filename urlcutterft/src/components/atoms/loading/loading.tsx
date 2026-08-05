import { Spinner } from "@/components/ui/spinner";

export const Loading = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Carregando">
    
      <Spinner className="size-8 text-white" />
    </div>
  );
};
