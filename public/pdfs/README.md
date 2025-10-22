# PDFs Folder

This folder contains PDF documents that are publicly accessible in the Caminos application.

## Adding PDFs

Simply place your PDF files in this folder. They will be automatically accessible via URL.

## Accessing PDFs

PDFs in this folder can be accessed at:

```
/pdfs/filename.pdf
```

For example, if you add `guidelines.pdf` to this folder, it will be available at:

```
https://yourdomain.com/pdfs/guidelines.pdf
```

## Linking to PDFs

### From Markdown Documents

In any markdown file (like those in the `/docs` folder), link to a PDF like this:

```markdown
[Download Guidelines PDF](/pdfs/guidelines.pdf)
```

### From React Components

In React components, create a link like this:

```tsx
<a
  href="/pdfs/guidelines.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-800 underline"
>
  Download Guidelines PDF
</a>
```

Or with Next.js Link (for external PDFs, use regular `<a>` tag):

```tsx
<a
  href="/pdfs/guidelines.pdf"
  download
  className="text-blue-600 hover:text-blue-800 underline"
>
  Download Guidelines PDF
</a>
```

### Adding PDF Links to the Homepage

You can add PDF resources to the homepage's "Documentation & Resources" section:

```tsx
<Link
  href="/pdfs/your-document.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
>
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
    Resource Document
  </h3>
  <p className="text-gray-600 dark:text-gray-300">
    Download our comprehensive resource guide (PDF)
  </p>
</Link>
```

## Best Practices

- Use descriptive filenames (e.g., `outreach-guidelines-2025.pdf`)
- Keep filenames lowercase with hyphens instead of spaces
- Consider file size - large PDFs may take time to download
- Update this README if you establish naming conventions
