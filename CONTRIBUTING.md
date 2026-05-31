# Contributing to Shoaib Aftab JS

First off, thank you for considering contributing to the Shoaib Aftab JS Framework! It's people like you that make this ecosystem enterprise-ready and globally adopted.

## 🛑 The Golden Rule: Absolute Zero Dependency
Before you submit a Pull Request, you MUST understand our core architecture:
**We do not use NPM packages for the final build. We do not use Webpack. We do not use external CDNs.**

If your PR requires adding a dependency to `package.json` (other than standard dev tools if absolutely negotiated), it will be **rejected**.

## How to Contribute

### 1. Local Development
1. Clone the repository.
2. Make your JS changes in the `src/modules/` directory.
3. Run the custom native build script to minify the JS:
   ```bash
   npm run build
   ```
4. Verify that `dist/shoaib-aftab.min.js` was generated successfully and no errors were thrown.

### 2. Code Guidelines
- **Modularity:** Keep functions small and modular.
- **Security:** Do NOT use `eval()` or `new Function()`. All string parsing must be done safely. Ensure any DOM manipulation passes through our `sanitizeHTML` function if handling user input.
- **Performance:** Avoid layout thrashing. DOM updates should ideally be batched using `queueMicrotask` as implemented in the reactivity module.

### 3. Submitting a Pull Request
- Create a feature branch (`git checkout -b feature/amazing-feature`).
- Commit your changes.
- Ensure the build passes.
- Open a PR with a clear description of the problem solved or feature added.
