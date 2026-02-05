export interface ReadmeSection {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
  prefix?: string;
  icon: string;
}

export const SECTIONS: ReadmeSection[] = [
  {
    id: 'title',
    label: 'Project Title',
    placeholder: 'My Awesome Project',
    type: 'text',
    prefix: '# ',
    icon: '📦',
  },
  {
    id: 'description',
    label: 'Description',
    placeholder: 'A brief description of what this project does and who it\'s for...',
    type: 'textarea',
    icon: '📝',
  },
  {
    id: 'features',
    label: 'Features',
    placeholder: '- Feature 1\n- Feature 2\n- Feature 3',
    type: 'textarea',
    prefix: '## Features\n\n',
    icon: '✨',
  },
  {
    id: 'techStack',
    label: 'Tech Stack',
    placeholder: '- React\n- TypeScript\n- Tailwind CSS',
    type: 'textarea',
    prefix: '## Tech Stack\n\n',
    icon: '🛠️',
  },
  {
    id: 'installation',
    label: 'Installation',
    placeholder: '```bash\nnpm install my-project\ncd my-project\n```',
    type: 'textarea',
    prefix: '## Installation\n\n',
    icon: '⚙️',
  },
  {
    id: 'usage',
    label: 'Usage / Examples',
    placeholder: '```javascript\nimport Component from \'my-project\'\n\nfunction App() {\n  return <Component />\n}\n```',
    type: 'textarea',
    prefix: '## Usage\n\n',
    icon: '🚀',
  },
  {
    id: 'apiReference',
    label: 'API Reference',
    placeholder: '#### Get all items\n\n```http\nGET /api/items\n```\n\n| Parameter | Type     | Description                |\n| :-------- | :------- | :------------------------- |\n| `api_key` | `string` | **Required**. Your API key |',
    type: 'textarea',
    prefix: '## API Reference\n\n',
    icon: '📡',
  },
  {
    id: 'environment',
    label: 'Environment Variables',
    placeholder: 'To run this project, you will need to add the following environment variables:\n\n`API_KEY`\n`ANOTHER_API_KEY`',
    type: 'textarea',
    prefix: '## Environment Variables\n\n',
    icon: '🔐',
  },
  {
    id: 'screenshots',
    label: 'Screenshots',
    placeholder: '![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)',
    type: 'textarea',
    prefix: '## Screenshots\n\n',
    icon: '📸',
  },
  {
    id: 'roadmap',
    label: 'Roadmap',
    placeholder: '- [x] Initial release\n- [ ] Add more integrations\n- [ ] Multi-language support',
    type: 'textarea',
    prefix: '## Roadmap\n\n',
    icon: '🗺️',
  },
  {
    id: 'contributing',
    label: 'Contributing',
    placeholder: 'Contributions are always welcome!\n\nSee `contributing.md` for ways to get started.',
    type: 'textarea',
    prefix: '## Contributing\n\n',
    icon: '🤝',
  },
  {
    id: 'license',
    label: 'License',
    placeholder: 'MIT',
    type: 'text',
    prefix: '## License\n\n',
    icon: '📄',
  },
  {
    id: 'authors',
    label: 'Authors',
    placeholder: '- [@yourname](https://github.com/yourname)',
    type: 'textarea',
    prefix: '## Authors\n\n',
    icon: '👤',
  },
  {
    id: 'acknowledgements',
    label: 'Acknowledgements',
    placeholder: '- [Awesome README](https://github.com/matiassingers/awesome-readme)\n- [Readme.so](https://readme.so)',
    type: 'textarea',
    prefix: '## Acknowledgements\n\n',
    icon: '🙏',
  },
];

export function generateMarkdown(data: Record<string, string>, orderedSections?: ReadmeSection[]): string {
  const parts: string[] = [];
  const sections = orderedSections || SECTIONS;

  for (const section of sections) {
    const value = data[section.id]?.trim();
    if (!value) continue;

    if (section.id === 'title') {
      parts.push(`# ${value}`);
    } else if (section.id === 'description') {
      parts.push(value);
    } else if (section.id === 'license') {
      parts.push(`## License\n\n[${value}](https://choosealicense.com/licenses/${value.toLowerCase()}/)`);
    } else if (section.prefix) {
      parts.push(`${section.prefix}${value}`);
    } else {
      parts.push(value);
    }
  }

  return parts.join('\n\n');
}
