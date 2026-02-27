---
description: Secure TDD Workflow with Visual Verification
---

# Test-Driven Development (TDD) Process

This workflow ensures test-driven development (TDD) is followed strictly for this project.

## 1. Red Phase: Write Tests First
- Identify the feature or fix to implement.
- Write a failing test using `vitest` and `@testing-library/react`.
- Run the test and confirm it fails (**Red**).

## 2. Green Phase: Write Application Code
- Write the minimum necessary React and TypeScript code to make the test pass.
- Ensure strict typings and security best practices (e.g. no direct DOM manipulation, proper encoding).
- Run the test and confirm it passes (**Green**).

## 3. Refactor Phase: Improve Quality
- Refactor the code for better performance, readability, or security without breaking tests.
- Run all tests to ensure the application is still stable.

## 4. Visual Verification Phase (For UI output)
- Start the development server (`npm run dev`).
- Run the `browser_subagent` to take screenshots or a video of the new UI interaction, verifying it looks correct in a real browser.
- Review the generated visual artifacts.
