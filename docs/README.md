# Documentation Folder

This folder contains markdown files that are rendered as pages in the Many Paths application.

## How to Add a New Document

1. **Create a markdown file** in this `docs/` folder

   - Example: `about.md`, `privacy.md`, `guidelines.md`

2. **Create a new page** in `src/app/[document-name]/page.tsx`

   Example for creating an "about" page at `/about`:

   ```tsx
   import { promises as fs } from "fs";
   import path from "path";
   import { MarkdownDocument } from "@/components/MarkdownDocument";

   export default async function AboutPage() {
     const filePath = path.join(process.cwd(), "docs", "about.md");
     const fileContents = await fs.readFile(filePath, "utf8");

     return (
       <div className="max-w-4xl mx-auto">
         <MarkdownDocument content={fileContents} />
       </div>
     );
   }
   ```

3. **Add a link** to the document on the homepage (`src/app/page.tsx`)

   Add a new card in the "Documentation & Resources" section:

   ```tsx
   <Link
     href="/about"
     className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
   >
     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
       About Us
     </h3>
     <p className="text-gray-600 dark:text-gray-300">
       Learn more about our team and history.
     </p>
   </Link>
   ```

## Markdown Support

The application uses `react-markdown` with GitHub Flavored Markdown (GFM) support, which includes:

- Headers
- Lists (ordered and unordered)
- Links
- Images
- Tables
- Code blocks
- Strikethrough text
- Task lists
- And more!

## Linking to PDFs

You can link to PDF files stored in `/public/pdfs/` from your markdown documents:

```markdown
[Download Guidelines PDF](/pdfs/guidelines.pdf)
```

The PDFs will open in a new browser tab when clicked.

## Existing Documents

- `mission.md` - The mission statement and values of the project
- `manual.md` - By-Name List Operations Manual for Santa Fe's coordinated entry system (adapted from Missoula, Montana template with Santa Fe-specific placeholders)
