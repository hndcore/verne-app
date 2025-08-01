# Verne App - Track your literary journey

Developed by: Manuel López Camarena.

A personal reading book management application. Built with React, Typescript and Vite. Made to fulfill certain requirements of complete CRUD, with filtering system, search, sorting, etc.
No backend, only Json server to act as one.

## Project Deployment

### Quick Start on Localhost

```bash
npm install
npm start
```

The `npm start` command uses `concurrently` to start at the same time:

- **JSON Server** on port 3000 (simulated backend API)
- **Vite Dev Server** on port 5173 (frontend application)

### Available Scripts

```bash
npm start             # Start JSON Server + Vite simultaneously
npm run dev           # Vite only (development)
npm run build         # Production build
npm run test          # Unit tests with coverage
npm run cypress       # Cypress in interactive mode
npm run storybook     # Storybook for components
npm run cypress:open  # Start Cypress and the app together with concurrently
```

## Environment Configuration

### System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

## Technological Decisions

### Main Stack

| Technology          | Version | Purpose                             |
| ------------------- | ------- | ----------------------------------- |
| **React**           | 19.1.0  | Main UI library                     |
| **TypeScript**      | 5.x     | Static typing and better DX         |
| **Vite**            | 6.x     | Build tool and fast dev server      |
| **Tailwind CSS**    | 4.1.11  | CSS framework                       |
| **React Query**     | 5.83.0  | Server state management             |
| **Zustand**         | 5.0.6   | Client state management             |
| **React Hook Form** | 7.61.1  | Form management                     |
| **Yup**             | 1.6.1   | Schema validation                   |
| **Storybook**       | 9.0.18  | Component documentation and catalog |

### Development Tools

- **Cypress**: E2E testing with cypress-axe for accessibility
- **Vitest**: Unit testing with coverage
- **Storybook**: Component documentation
- **ESLint + Prettier**: Linting and formatting
- **Husky**: Git hooks for pre-commit

## Use of AI Tools

### Tools Used

- GitHub Copilot with Claude Sonnet 4: Autocompletion agent, scaffolding, etc.
- Github Copilot with GPT 4.1: PR Reviewer.
- Claude Sonnet 4: Specific doubts.
- Lovable: UI/UX ideas.

## Development Assumptions / Business Decisions

### Interpretative Decisions

1. **Data Structure**: Books would be entities that would have dependencies with foreign keys from other entities like author and genre, simulating real databases. This generated a problem with Json server explained in the following issue: https://github.com/hndcore/verne-app/issues/10
2. **Book States**: Concrete states were implemented for books (To Read, Reading, Completed).
3. **Rating System**: 1-5 star system for taste scoring.
4. **Dates**: `dateAdded` is used for tracking when each book was added.
5. **Creation of new entities**: Just as entries can be created for books as the main function, authors and genres can be created if they don't exist in the data when creating the book, thanks to the InputLov component.

## Business decisions to implement in case of scaling

1. Add start and end dates for books.
2. Validation of non-repetition by titles in books, or authors and genres by name.
3. Add cover automatically with some public API so that the detail view is more attractive.
4. Add Publisher fields in entity format, with the same functionality as Author and Genre, so that new ones can be added.
5. Possible ISBN field as identifier.
6. Add the possibility to write a conclusion or moral of the book when it is marked as completed.
7. Social features (sharing recommendations)
8. Metrics of read books per months, year, etc.

**User Experience Decisions:**

- Search works across title, author name, and genre name.
- Rating display with visual stars instead of numbers.
- Date added shows when book was registered.

### Architecture

- **Feature-based**: Organization by domain (books/)
- **Atomic Design**: Reusable components in /lib

## Testing

### Unit Testing (>80% Coverage)

```bash
npm run test  # Execute tests with coverage
```

- **Framework**: Vitest + Testing Library
- **Coverage**: >80% overall
- **Scope**: Components, hooks, utils, stores

### E2E Testing

```bash
npm run cypress:open # As said before, opens concurrently the app and cypress
```

- **Framework**: Cypress
- **Limitations**: Few tests due to time limitations
- **Features**: API interception, fixtures for test data

### Accessibility Testing

- **Tool**: cypress-axe
- **Integration**: Automatic tests in pipeline
- **Standards**: WCAG 2.1 AA

## Git Strategy

### Methodology: Trunk-based Development

- **Main Branch**: `master`
- **Strategy**: Trunk-based with releases
- **Pull Requests**: Mandatory for every change
- **Issues**: Problem and feature tracking

### Development Workflow

1. **Feature Branch**: Create branch from master
2. **Development**: Small and descriptive commits
3. **Pull Request**: Review + CI/CD checks
4. **Merge**: Squash merge to master
5. **Release**: Tags for versions

## UI/CSS Framework

### Tailwind CSS - Decision and Justification

#### Why Tailwind?

Tailwind allows rapid development with utility classes, helping to create a coherent design system. It has tree shaking tools for production deployment, customization possibilities, etc.
Integrated directly as a plugin in Vite.

## Responsive Design

Thanks to tailwind, there are utility classes to create responsive design using certain classes corresponding to standard breakpoints (sm, md, lg, xl...).

### Custom Example: Responsive DataTableRow

A special case of responsive implementation is the `DataTableRow` component, which solves the classic problem of tables on mobile devices:

- **Desktop (md+)**: Renders as traditional table row with aligned columns
- **Mobile (< md)**: Transforms into individual cards with vertical layout

```tsx
// Responsive implementation in DataTableRow
<tr className="border-b border-gray-200 hover:bg-gray-50 md:table-row">
  {/* On desktop: normal table columns */}
  <td className="hidden md:table-cell px-4 py-3">{/* Column content */}</td>

  {/* On mobile: card layout */}
  <td className="md:hidden col-span-full p-4">
    <div className="space-y-2">{/* Vertical card layout */}</div>
  </td>
</tr>
```

This solution eliminates excessive horizontal scrolling on mobile and significantly improves user experience on small screens.

## Reusable Components

### Component Library Structure

A component library has been developed for the application in `/src/lib/` organized following Atomic Design principles. Reusable components in any feature domain.

```
src/lib/
├── Button/          # Buttons with variants and states
├── InputText/       # Text fields with validation
├── InputLov/        # List of Values input, async, with creation option
├── InputRate/       # Star rating system
└── Badge/           # Badges for states and labels
```

### Reusability Strategy

- **Forms**: Inputs, buttons and validations
- **Data visualization**: Badges, ratings, states
- **Interactions**: Action buttons, navigation

### General Trade-offs

#### Advantages

- **Consistency**: Unified design system
- **Maintainability**: Centralized changes
- **Testing**: Each component has its own tests
- **Documentation**: Storybook integration
- **TypeScript**: Strict typing and autocompletion

#### Limitations

- **Bundle size**: Larger initial size due to variants
- **Flexibility**: Restrictions on extreme customization
- **Complexity**: Overhead for simple cases
- **Learning curve**: Requires knowing each component's API

\*For design details, properties and interactive examples, check the documentation in **Storybook\***

## Performance Optimizations

### 1. Lazy Loading

#### Implementation

```tsx
// Dialog components loaded on demand
const CreateBookForm = lazy(() => import("./CreateBookForm"));
const DetailedBookDialog = lazy(() => import("./DetailedBookDialog"));
const DeleteBookDialog = lazy(() => import("./DeleteBookDialog"));
```

#### Benefits

- **Memory**: Loads only when needed, these are components that won't be visible initially, and some like CreateBookForm are somewhat heavy.

### 2. Memoization

#### React.memo in DataTableRow

```tsx
export default memo(DataTableRow);
```

#### Justification

- **List rendering**: Prevents unnecessary re-renders
- **Performance**: Especially important with many books
- **UX**: Smoother interactions

### 3. React Query Optimizations

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

#### Impact

- **Reduced requests**: Fewer API calls
- **Better UX**: Cached data for fast navigation
- **Bandwidth**: Lower network usage

### 4. useMemo for Heavy Logic

#### Implementation

```tsx
// Memoization of expensive calculations
const filteredAndSortedBooks = useMemo(() => {
  return books
    .filter(
      book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      // Complex sorting logic
      return sortBooks(a, b, sortConfig);
    });
}, [books, searchTerm, sortConfig]);
```

#### Justification

- **Heavy calculations**: Avoids recalculating filters and sorting on each render
- **Complex filtering**: Multiple search in title, author and genre
- **Sorting logic**: Configurable sorting that can be expensive
- **Performance**: Especially important with large lists

### 5. Search Debounce

#### Implementation with use-debounce

```tsx
import { useDebounce } from "use-debounce";

// In the search component
const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

// Only executes when user stops typing for 300ms
useEffect(() => {
  if (debouncedSearchTerm) {
    // Execute search
    performSearch(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```

#### Benefits

- **Server relief**: Avoids saturating the server with requests on each character
- **Better UX**: Reduces visual lag during typing
- **Resource optimization**: Fewer unnecessary network calls
- **Configurable delay**: 300ms balance between responsiveness and efficiency

## Accessibility

### Implemented Standards

#### ARIA Roles and Attributes

```tsx
// Implementation example
<nav role="navigation" aria-label="Pagination">
  <button aria-label="Previous page" aria-hidden="false">
    <ChevronLeft aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </button>
</nav>
```

#### Keyboard Navigation

- **Tab order**: Logical navigation between elements
- **Enter/Space**: Button activation
- **Escape**: Dialog closing
- **Arrow keys**: Navigation in complex components

#### Screen Reader Support

Thanks to Tailwind utility classes, we can provide support for buttons and actions without text, with help text only visible to screen readers.

```tsx
<span className="sr-only">Click to view book details</span>
```

### Validation Tools

#### Cypress AXE

Complete e2e testing to validate accessibility. They can be launched and viewed, thanks to a custom Cypress command, the WCAG rule violations that have occurred.

**IMPORTANT**: All errors regarding accessibility violations have been resolved, except for one, of minor severity, deliberately, so that when running the test you can see the custom command functioning.

```javascript
// src/cypress/e2e/screen-accesibility
cy.injectAxe();
cy.customCheckA11y();
```

- **Automation**: Accessibility tests in CI/CD
- **Coverage**: All main pages
- **Standards**: WCAG 2.1 AA compliance

## Improvements on AI Suggestions

**GitHub Copilot as PR Reviewer**:

- Semantic markup recommendations.
- Code improvement and optimization.
- Forgotten imports.
- Typescript typing enhancement.

AI suggestions were used as a starting point. In each case they were reviewed, refactored or discarded if they didn't fit with the logic or architecture of the project, prioritizing own decisions regarding code, performance and accessibility.

## Self-review and Refactor

### Review Process

#### Code Review Checklist

1. **Performance**: Are there obvious optimizations?
2. **Accessibility**: Does it meet WCAG standards?
3. **Testing**: Is it covered by tests?
4. **Types**: TypeScript strict compliance?
5. **Consistency**: Does it follow established patterns?

### Problems Found and Solutions

#### 1. JSON Server Limitations

**Problem**: Complex relationships not natively supported
**Solution**: Custom endpoints and data transformation

#### 2. Accessibility Gaps

**Problem**: Cypress axe tests failing
**Solution**: Comprehensive aria-label implementation

#### 3. Too much logic in frontend.

**Problem**: I wanted to create a thin client, but due to the JSON-server limitations already commented in the corresponding issue, all pagination, sorting and search logic had to be moved to the frontend, which might increase the load. In case of more than 1000 books for example, it would be necessary to scale with a real backend.
**Solution**: Lazy loading of dialogs, useMemo and other performance improvements to avoid unnecessary reloads etc.

## CI/CD Pipeline

### GitHub Actions

#### Workflow on each PR

```yaml
name: Run tests
on:
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

This file defines a GitHub Actions workflow that runs automatically every time a pull request is created or updated towards the master branch, and what it does is set up an Ubuntu environment with Node.js 18, install the project dependencies and run the tests to verify that the proposed changes don't break the existing code before allowing their integration.
