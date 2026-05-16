# Contributing to SusuLink

We welcome contributions to SusuLink!

## Development Workflow

1.  **Fork and Clone**: Fork the repository and clone it locally.
2.  **Install Dependencies**: Use `pnpm install`.
3.  **Create a Branch**: `git checkout -b feature/your-feature-name`.
4.  **Coding Standards**:
    - Follow the existing project structure.
    - Ensure TypeScript types are correctly defined.
    - Add tests for new functionality.
5.  **Commit**: Use descriptive commit messages.
6.  **Pull Request**: Submit a PR to the `main` branch.

## Project Structure

- `frontend`: React/Next.js components and logic.
- `backend`: Express services and Prisma models.
- `contracts`: Soroban/Rust contract code.

## Testing

- Run `pnpm test` to execute all test suites.