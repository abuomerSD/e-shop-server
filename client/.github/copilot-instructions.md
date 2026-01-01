# E-Shop Client - AI Assistant Instructions

## Architecture Overview

This is a React 19 + TypeScript e-commerce frontend built with Vite, using role-based access control (RBAC) for admin dashboard functionality. The app separates public shopping features from protected admin management.

### Key Architectural Patterns

**Three-Layer Layout System**:

- `MainLayout` - Public shopping interface
- `DashboardLayout` - Admin interface with sidebar navigation
- `AdminLayout` - Higher-privilege admin-only sections

**Role-Based Protection**: Uses nested `ProtectedRoute` components with role hierarchy (`user` < `manager` < `admin`). Dashboard requires "manager", Users page requires "admin".

**Centralized API Layer**: All HTTP calls go through `src/services/http.ts` with automatic auth token injection, 401 handling, and standardized `IApiResponse<T>` typing.

## Development Workflows

**Start Development**: `npm run dev` (Vite dev server)
**Build**: `npm run build` (TypeScript check + Vite build)
**Styling**: `npm run style` (Tailwind CLI watcher for custom styles)

**Key Commands**:

- Authentication flows automatically redirect on 401s
- Environment variables use `VITE_` prefix (see `src/config/env.ts`)

## Project-Specific Conventions

**Service Pattern**: Each entity has a dedicated service in `src/services/api/` (e.g., `categoryService`, `userService`) exporting CRUD operations. All services use the shared `http` utility.

**Type Organization**:

- Interface naming: `IUser`, `ICategory`, `IApiResponse<T>`
- Separate create types: `IUserCreate` vs `IUser`
- All types centralized in `src/types/types.ts`

**State Management**: React Context for auth (`AuthContext`), local state for UI. No external state library.

**Pagination Pattern**: Uses `react-paginate` with `PAGE_LIMIT` constant (10). Standard pattern in dashboard pages:

```typescript
const [page, setPage] = useState(0);
const fetchData = async () => {
  const response = await service.getAll({ page: page + 1, limit: PAGE_LIMIT });
};
```

**Modal Pattern**: Dashboard pages use consistent modal states:

```typescript
const [showCreateModal, setShowCreateModal] = useState(false);
const [selectedItem, setSelectedItem] = useState<IType | null>(null);
```

## Integration Points

**API Communication**:

- Base URL from `VITE_API_URL` environment variable
- Axios instance with 10s timeout, credentials enabled
- Bearer token auth with automatic localStorage management
- File uploads use `http.upload()` with FormData

**Authentication Flow**:

1. Login/signup stores token + user data in localStorage
2. `AuthProvider` wraps app, provides user state globally
3. `authUtils` handles token operations, automatic expiry redirects
4. Protected routes check roles before rendering

**Styling System**: Tailwind CSS v4 with Vite plugin. Custom config in `src/tailwind.config.ts`. Uses Heroicons for consistent iconography.

## Common Patterns

**Dashboard Page Structure**:

1. State setup (data, pagination, modals, loading)
2. `fetchData` function with error handling
3. `useEffect` to fetch on mount/search changes
4. Search input with debouncing
5. Data table with edit/delete actions
6. Modal components for CRUD operations

**Error Handling**: Set error state strings for user display, console.error for debugging. Network errors auto-handled by axios interceptors.

**Component Organization**:

- `components/` for reusable UI components
- `pages/` for route components
- `layouts/` for wrapper components
- Feature-based folders (e.g., `components/auth/`, `pages/dashboard/`)
