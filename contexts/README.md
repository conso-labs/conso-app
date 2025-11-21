# ConsoUser Context Usage

## Overview

The `ConsoUserContext` provides global state management for user data across the entire application. It automatically syncs with localStorage and the connected wallet.

## Setup

The provider is already wrapped in `app/layout.tsx`, so you can use it anywhere in the app.

## Usage

### Reading User Data

```tsx
import { useConsoUser } from "@/contexts/ConsoUserContext";

function MyComponent() {
  const { consoUser } = useConsoUser();

  return (
    <div>
      <p>Address: {consoUser.suiAddress}</p>
      <p>Zaps: {consoUser.zapsScore}</p>
      <p>Badges: {consoUser.badges}</p>
    </div>
  );
}
```

### Updating User Data (Partial Update)

```tsx
import { useConsoUser } from "@/contexts/ConsoUserContext";

function MyComponent() {
  const { consoUser, updateConsoUser } = useConsoUser();

  const handleAddZaps = () => {
    // Only update specific fields
    updateConsoUser({
      zapsScore: consoUser.zapsScore + 100,
    });
  };

  return <button onClick={handleAddZaps}>Add 100 Zaps</button>;
}
```

### Setting Entire User Object

```tsx
import { useConsoUser } from "@/contexts/ConsoUserContext";

function MyComponent() {
  const { setConsoUser } = useConsoUser();

  const handleSetUser = () => {
    // Replace entire user object
    setConsoUser({
      suiAddress: "0x1234...",
      substringSuiAddress: "0x12...5678",
      connectedAccounts: [],
      badges: 10,
      zapsScore: 5000,
      consumerPercentile: 85,
    });
  };

  return <button onClick={handleSetUser}>Set User</button>;
}
```

## Features

- **Automatic Persistence**: All updates are automatically saved to localStorage
- **Wallet Integration**: Automatically loads user data when wallet connects
- **Type Safety**: Full TypeScript support with `ConsoUser` type
- **Global Access**: Use in any component without prop drilling

## ConsoUser Type

```typescript
type ConsoUser = {
  suiAddress: string;
  substringSuiAddress: string;
  connectedAccounts: activePlatforms[];
  badges: number;
  zapsScore: number;
  consumerPercentile: number;
};
```
