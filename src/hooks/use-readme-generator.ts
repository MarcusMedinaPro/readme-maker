import { useState, useCallback } from 'react';
import { SECTIONS, ReadmeSection, generateMarkdown } from '@/lib/readme-sections';

export function useReadmeGenerator() {
  const [data, setData] = useState<Record<string, string>>({});
  const [orderedSections, setOrderedSections] = useState<ReadmeSection[]>(SECTIONS);

  const updateSection = useCallback((id: string, value: string) => {
    setData(prev => ({ ...prev, [id]: value }));
  }, []);

  const markdown = generateMarkdown(data, orderedSections);

  const filledSections = orderedSections.filter(s => data[s.id]?.trim());

  const reset = useCallback(() => {
    setData({});
    setOrderedSections(SECTIONS);
  }, []);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setOrderedSections(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  return {
    data,
    updateSection,
    markdown,
    filledSections,
    reset,
    sections: orderedSections,
    reorderSections,
  };
}
