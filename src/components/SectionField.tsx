import { ReadmeSection } from '@/lib/readme-sections';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionFieldProps {
  section: ReadmeSection;
  value: string;
  onChange: (value: string) => void;
  index: number;
  isDragging: boolean;
  dragOverIndex: number | null;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

export function SectionField({
  section,
  value,
  onChange,
  index,
  isDragging,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}: SectionFieldProps) {
  const hasValue = value?.trim().length > 0;
  const isOver = dragOverIndex === index;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop(e, index)}
      className={cn(
        "group rounded-lg border p-4 transition-all duration-200",
        hasValue
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:border-muted-foreground/30",
        isDragging && "cursor-grabbing",
        isOver && "border-primary/60 ring-1 ring-primary/30"
      )}
    >
      <label className="flex items-center gap-2 mb-3">
        <span
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors p-0.5 -ml-1 rounded"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </span>
        <span className="text-lg">{section.icon}</span>
        <span className="text-sm font-medium text-foreground">{section.label}</span>
        {hasValue && (
          <span className="ml-auto text-xs font-mono text-primary">● included</span>
        )}
      </label>

      {section.type === 'text' ? (
        <Input
          placeholder={section.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="bg-background border-border font-mono text-sm placeholder:text-muted-foreground/50"
        />
      ) : (
        <Textarea
          placeholder={section.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="bg-background border-border font-mono text-sm resize-y min-h-[100px] placeholder:text-muted-foreground/50"
        />
      )}
    </div>
  );
}
