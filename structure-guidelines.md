## Script Size

There is no strict rule, but aiming for scripts between 200 to 400 lines is a healthy baseline for readability and maintainability. A single file should ideally:

- Have a clear, single responsibility (e.g., managing player state).
- Be coherent and understandable without needing to scroll endlessly.

If a file starts creeping past 500 lines, it's time to ask whether it can be broken into sub-files.

## Files Per Folder

A good rule is 5-7 files per folder before considering breaking it down into subfolders. Subfolders help to visually declutter the structure and maintain focus within each directory.

## Levels of Depth

Avoid more than 3-4 levels of depth, as excessive nesting becomes hard to navigate and import. A flat structure with logical groupings usually works better.

## Naming Conventions

- Use camelCase for variable, function names and constant names.
- Use PascalCase for class names.
