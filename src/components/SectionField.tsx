import { ReadmeSection } from '@/lib/readme-sections';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface SectionFieldProps {
  section: ReadmeSection;
  value: string;
  onChange: (value: string) => void;
}

export function SectionField({ section, value, onChange }: SectionFieldProps) {
  const hasValue = value?.trim().length > 0;

  return (
    <div
      className={cn(
        "group rounded-lg border p-4 transition-all duration-200",
        hasValue
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:border-muted-foreground/30"
      )}
    >
      <label className="flex items-center gap-2 mb-3">
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
