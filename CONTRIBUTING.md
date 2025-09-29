# 🤝 Contributing to The Lab

> **Thank you for your interest in contributing!**
>
> This guide will help you get started with contributing to The Lab.

We love contributions! Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your help makes The Lab better for everyone.

---

## 🎯 Ways to Contribute

### 💡 Ideas & Discussions
- Share feature ideas in [Discussions](https://github.com/NickSloggett/The-Lab/discussions)
- Vote on existing proposals
- Provide feedback on RFCs

### 🐛 Bug Reports
- Report bugs in [Issues](https://github.com/NickSloggett/The-Lab/issues)
- Provide detailed reproduction steps
- Include system information

### 📝 Documentation
- Fix typos and improve clarity
- Add examples and tutorials
- Translate documentation

### 🎨 Design
- Suggest UI/UX improvements
- Create mockups and prototypes
- Improve accessibility

### 💻 Code
- Fix bugs
- Add features
- Improve performance
- Write tests

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top of this repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/The-Lab.git
cd The-Lab
```

### 3. Set Up Development Environment

```bash
# Run the setup script
./setup.sh

# Or manually set up what you need:
cd web && npm install
cd apps/apple && make bootstrap && make generate
cd web/apps/android && npm install
```

### 4. Create a Branch

```bash
# Create a branch for your changes
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/bug-description
```

---

## 📋 Development Workflow

### Code Style

We use automated tools to maintain code quality:

**JavaScript/TypeScript:**
- ESLint for linting
- Prettier for formatting
- TypeScript for type checking

**Swift:**
- SwiftLint for linting
- SwiftFormat for formatting

**Python:**
- Black for formatting
- isort for import sorting
- Flake8 for linting
- MyPy for type checking

### Before Committing

```bash
# Web
cd web
npm run lint:fix
npm run format
npm run typecheck
npm test

# iOS/macOS
cd apps/apple
make lint
make format
make test

# AI Backend
cd ai-automation-boilerplate
poetry run black .
poetry run isort .
poetry run flake8 .
poetry run mypy .
poetry run pytest
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(web): add AI chat interface
fix(ios): resolve navigation bug
docs(readme): update setup instructions
style(ui): improve button styling
refactor(api): simplify auth logic
test(agents): add unit tests for TaskAgent
chore(deps): update dependencies
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

---

## 🧪 Testing

### Web App

```bash
cd web

# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### iOS/macOS

```bash
cd apps/apple

# Run tests
make test

# Or in Xcode: ⌘+U
```

### AI Backend

```bash
cd ai-automation-boilerplate

# Run tests
poetry run pytest

# With coverage
poetry run pytest --cov=src
```

---

## 📝 Writing Good PRs

### PR Checklist

Before submitting a pull request:

- [ ] Code follows the style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No unrelated changes included
- [ ] Screenshots added for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #123
```

### Good PR Practices

✅ **Do:**
- Keep PRs focused and small
- Write clear descriptions
- Add tests for new features
- Update documentation
- Respond to feedback promptly

❌ **Don't:**
- Mix unrelated changes
- Submit huge PRs
- Ignore CI failures
- Leave TODOs without issues

---

## 🎨 Code Guidelines

### Web (TypeScript/React)

```typescript
// ✅ Good
export interface ButtonProps {
  /** Button label text */
  label: string
  /** Click handler */
  onClick: () => void
  /** Button variant */
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// ❌ Bad
function button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### iOS (Swift)

```swift
// ✅ Good
/// A reusable button component
struct PrimaryButton: View {
    /// Button label text
    let title: String
    /// Action to perform on tap
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .background(Color.blue)
                .cornerRadius(8)
        }
    }
}

// ❌ Bad
struct btn: View {
    var t: String
    var a: () -> Void
    var body: some View {
        Button(action: a) { Text(t) }
    }
}
```

### Python

```python
# ✅ Good
from typing import List, Optional

def process_documents(
    documents: List[str],
    max_length: Optional[int] = None
) -> List[str]:
    """
    Process a list of documents.
    
    Args:
        documents: List of document strings
        max_length: Optional maximum length
        
    Returns:
        List of processed documents
    """
    processed = []
    for doc in documents:
        result = doc.strip()
        if max_length and len(result) > max_length:
            result = result[:max_length]
        processed.append(result)
    return processed

# ❌ Bad
def proc(d):
    return [x.strip() for x in d]
```

---

## 📚 Documentation

### What to Document

- Public APIs and functions
- Complex logic and algorithms
- Configuration options
- Setup and deployment steps
- Examples and tutorials

### Documentation Style

```typescript
/**
 * Generates AI-powered insights from data
 * 
 * @param data - Input data array
 * @param options - Configuration options
 * @param options.model - AI model to use
 * @param options.temperature - Sampling temperature (0-1)
 * @returns Promise resolving to insights
 * 
 * @example
 * ```typescript
 * const insights = await generateInsights(data, {
 *   model: 'gpt-4-turbo',
 *   temperature: 0.7
 * })
 * ```
 */
export async function generateInsights(
  data: any[],
  options: InsightOptions
): Promise<Insights> {
  // Implementation
}
```

---

## 🏗️ Architecture Guidelines

### File Organization

```
feature/
├── index.ts          # Public API
├── component.tsx     # Main component
├── hooks.ts          # Custom hooks
├── utils.ts          # Utility functions
├── types.ts          # Type definitions
├── styles.css        # Styles (if not using Tailwind)
└── __tests__/        # Tests
    └── component.test.tsx
```

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface MyComponentProps {
  title: string
}

// 3. Component
export function MyComponent({ title }: MyComponentProps) {
  // 3a. Hooks
  const [count, setCount] = useState(0)
  
  // 3b. Handlers
  const handleClick = () => {
    setCount(count + 1)
  }
  
  // 3c. Render
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  )
}
```

---

## 🚀 Release Process

### Version Numbers

We use [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes (v2.0.0)
- **Minor**: New features (v1.1.0)
- **Patch**: Bug fixes (v1.0.1)

### Release Checklist

- [ ] Update version numbers
- [ ] Update CHANGELOG.md
- [ ] Run all tests
- [ ] Update documentation
- [ ] Create GitHub release
- [ ] Deploy to production

---

## 💬 Community

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

### Getting Help

- **Documentation**: Check `docs/` folder
- **Discussions**: [GitHub Discussions](https://github.com/NickSloggett/The-Lab/discussions)
- **Discord**: [Join our community](https://discord.gg/thelab)
- **Issues**: [Open an issue](https://github.com/NickSloggett/The-Lab/issues)

---

## 🎓 Learning Resources

### For Web Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### For iOS Development
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)

### For AI Integration
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI Cookbook](https://cookbook.openai.com)
- [LangChain Documentation](https://python.langchain.com/)

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Featured in our newsletter (with permission)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to The Lab!** 🎉

Your contributions help make AI-powered development accessible to everyone.

[← Back to README](README.md) | [Code of Conduct](CODE_OF_CONDUCT.md) | [License](LICENSE)

</div>

