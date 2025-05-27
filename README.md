# SalesFlow Monorepo

A modular system built using a monorepo approach, emphasizing component-based development and code reusability.

## Project Structure

```
salesflow-monorepo/
├── packages/
│   ├── ui-components/    # Shared UI component library
│   ├── utils/           # Shared utility functions
│   ├── sales-analytics/ # Feature system 1
│   └── lead-management/ # Feature system 2
└── apps/                # Application implementations
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Build all packages:

```bash
npm run build
```

3. Start development:

```bash
npm run dev
```

## Package Descriptions

### UI Components

A shared component library built with modern UI practices, providing reusable components across the system.

### Utils

Common utility functions for date formatting, string manipulation, API requests, and other shared functionality.

### Feature Systems

- **Sales Analytics**: Analytics and reporting features
- **Lead Management**: Lead tracking and management system

## Development Guidelines

1. All shared components should be added to the `ui-components` package
2. Common utilities should be placed in the `utils` package
3. Feature-specific code should be in their respective packages
4. Follow the established coding standards and documentation requirements

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Update documentation as needed

