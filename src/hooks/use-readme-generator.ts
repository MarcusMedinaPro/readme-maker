import { useState, useCallback } from 'react';
import { SECTIONS, generateMarkdown } from '@/lib/readme-sections';

export function useReadmeGenerator() {
  const [data, setData] = useState<Record<string, string>>({});

  const updateSection = useCallback((id: string, value: string) => {
    setData(prev => ({ ...prev, [id]: value }));
  }, []);

  const markdown = generateMarkdown(data);

  const filledSections = SECTIONS.filter(s => data[s.id]?.trim());

  const reset = useCallback(() => setData({}), []);

  return { data, updateSection, markdown, filledSections, reset, sections: SECTIONS };
}
