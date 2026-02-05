import { useState, useCallback } from 'react';
import { useReadmeGenerator } from '@/hooks/use-readme-generator';
import { SectionField } from '@/components/SectionField';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { Button } from '@/components/ui/button';
import { Copy, Check, RotateCcw, FileText, Eye, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type PreviewMode = 'preview' | 'raw';

const Index = () => {
  const { data, updateSection, markdown, filledSections, reset, sections } = useReadmeGenerator();
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('preview');
  const [expandedMobile, setExpandedMobile] = useState<'editor' | 'preview'>('editor');

  const handleCopy = useCallback(async () => {
    if (!markdown) {
      toast.error('Nothing to copy yet');
      return;
    }
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const handleReset = useCallback(() => {
    reset();
    toast.info('All sections cleared');
  }, [reset]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground tracking-tight">
                readme<span className="text-primary">.d</span>
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                generate beautiful readmes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-mono text-muted-foreground">
              {filledSections.length}/{sections.length} sections
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1.5">Reset</span>
            </Button>

            <Button
              size="sm"
              onClick={handleCopy}
              disabled={!markdown}
              className="glow-primary-sm"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="ml-1.5">{copied ? 'Copied!' : 'Copy MD'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        {/* Editor panel */}
        <div className="lg:w-1/2 lg:border-r border-border flex flex-col">
          <button
            className="lg:hidden flex items-center justify-between p-3 border-b border-border bg-card/30 text-sm font-medium"
            onClick={() => setExpandedMobile(expandedMobile === 'editor' ? 'preview' : 'editor')}
          >
            <span>✏️ Editor ({filledSections.length} filled)</span>
            {expandedMobile === 'editor' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className={cn(
            "flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6 space-y-3",
            expandedMobile !== 'editor' && "hidden lg:block"
          )}>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              Fill in the sections you need — empty ones are automatically excluded.
            </p>
            {sections.map((section) => (
              <SectionField
                key={section.id}
                section={section}
                value={data[section.id] || ''}
                onChange={(val) => updateSection(section.id, val)}
              />
            ))}
          </div>
        </div>

        {/* Preview panel */}
        <div className="lg:w-1/2 flex flex-col">
          <button
            className="lg:hidden flex items-center justify-between p-3 border-b border-border bg-card/30 text-sm font-medium"
            onClick={() => setExpandedMobile(expandedMobile === 'preview' ? 'editor' : 'preview')}
          >
            <span>👁️ Preview</span>
            {expandedMobile === 'preview' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className={cn(
            "border-b border-border bg-card/30 px-4 py-2 flex items-center gap-1",
            expandedMobile !== 'preview' && "hidden lg:flex"
          )}>
            <button
              onClick={() => setPreviewMode('preview')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5",
                previewMode === 'preview'
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-3 h-3" /> Preview
            </button>
            <button
              onClick={() => setPreviewMode('raw')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5",
                previewMode === 'raw'
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="w-3 h-3" /> Raw
            </button>
          </div>

          <div className={cn(
            "flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6",
            expandedMobile !== 'preview' && "hidden lg:block"
          )}>
            {previewMode === 'preview' ? (
              <MarkdownPreview markdown={markdown} />
            ) : (
              <pre className="font-mono text-xs text-secondary-foreground whitespace-pre-wrap break-words leading-relaxed">
                {markdown || (
                  <span className="text-muted-foreground italic">
                    Your markdown will appear here...
                  </span>
                )}
              </pre>
            )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-3 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          Made with 💚 using{' '}
          <a
            href="https://lovable.dev/invite/T7TQIG5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-2"
          >
            Lovable
          </a>
        </p>
      </footer>
    </div>
    </div>
  );
};

export default Index;
