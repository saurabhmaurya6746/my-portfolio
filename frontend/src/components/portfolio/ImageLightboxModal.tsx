import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";

export interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export function ImageLightboxModal({
  isOpen,
  onClose,
  title,
  image,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: ImageLightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-3 sm:p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col w-full max-w-[900px] h-[85vh] max-h-[650px] overflow-hidden rounded-3xl glass-strong border border-border/70 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-4 w-4" />
                </div>
                <h3 className="truncate font-display text-sm font-semibold sm:text-base text-foreground">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {typeof currentIndex === "number" && typeof totalCount === "number" && (
                  <span className="hidden sm:inline-block text-xs font-mono text-muted-foreground mr-2">
                    {currentIndex + 1} / {totalCount}
                  </span>
                )}
                {onPrev && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg glass transition-colors hover:bg-white/10 hover:text-foreground"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext();
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg glass transition-colors hover:bg-white/10 hover:text-foreground"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="ml-1 grid h-8 w-8 place-items-center rounded-lg glass-strong transition-colors hover:bg-destructive/20 hover:text-destructive"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Fixed Image Viewport Area */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden p-3 sm:p-6 flex items-center justify-center bg-black/25">
              <motion.img
                key={image}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                src={image}
                alt={title}
                className="h-full w-full object-contain select-none"
                draggable={false}
              />
            </div>

            {/* Footer Title Bar */}
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-2.5 sm:px-6 bg-surface/40 text-xs text-muted-foreground">
              <span className="truncate">{title}</span>
              {typeof currentIndex === "number" && typeof totalCount === "number" && (
                <span className="shrink-0 font-mono sm:hidden">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
