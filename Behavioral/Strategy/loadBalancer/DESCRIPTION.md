# A. Problem Statement
You are building a **Load Balancer**. Its job is to accept an incoming request and route it to one of the available healthy servers.

At first, you only needed **Round Robin** (A -> B -> C -> A...), but now your team wants to test **Random routing**, and eventually **Least Connections** (sending traffic to the idlest server).

**The Problem:** In the naïve implementation, we mix the routing logic directly into the `LoadBalancer` class. Every time we invent a new routing algorithm, we have to modify the core `LoadBalancer` class, adding more `if/else` or `switch` statements. This violates the **Open/Closed Principle** (Open for extension, closed for modification).

# B. Initial (Flawed) Implementation
Here is the "bad" code. Look at how the logic is tangled inside `getNextServer`.

```ts
type Server = {
  id: string;
  activeConnections: number; // Useful for "Least Connections" later
};

class LoadBalancer {
  private servers: Server[] = [];
  private roundRobinIndex = 0;

  constructor(servers: Server[]) {
    this.servers = servers;
  }

  // The Flawed Method: Hard-coded logic
  getNextServer(mode: 'round-robin' | 'random'): Server {
    if (this.servers.length === 0) {
      throw new Error("No servers available!");
    }

    if (mode === 'round-robin') {
      const server = this.servers[this.roundRobinIndex];
      // Advance index, wrap around if needed
      this.roundRobinIndex = (this.roundRobinIndex + 1) % this.servers.length;
      return server;
    } 
    else if (mode === 'random') {
      const randomIndex = Math.floor(Math.random() * this.servers.length);
      return this.servers[randomIndex];
    }

    throw new Error("Unknown selection mode");
  }
}

// Usage
const balancer = new LoadBalancer([{ id: 'S1', activeConnections: 0 }, { id: 'S2', activeConnections: 0 }]);
const server = balancer.getNextServer('round-robin');
console.log(`Routed to: ${server.id}`);
```

# C. Your Design Challenge (Mental Draft)
To refactor this using the **Strategy Pattern**, we need to rip the logic out of `getNextServer` and put it into separate classes.

## The Interface
We need a common interface so the Load Balancer doesn't care if it's using "Round Robin" or "Random".

Draft the `RoutingStrategy` interface. 
> (Hint: It needs a method that takes the list of servers and returns one server).

```ts
type Server = {
  id: string;
  activeConnections: number;
};

interface RoutingStrategy {
    getNextServer(servers: Server[]): Server;
};
```

## The Refactoring:

How should the `LoadBalancer` class now store the strategy? Should it be passed in the constructor, or can we change it later?

The current strategy is stored in the class via a private variable inside the `LoadBalancer` class and can be changed via `getters` and `setters`.


# D. Final Assembly
Here is how the whole system looks now. Notice how clean the `LoadBalancer` has become.

```ts
// --- THE STRATEGY INTERFACE ---
interface RoutingStrategy {
  getNextServer(servers: Server[]): Server;
}

// --- CONCRETE STRATEGIES ---
class RandomStrategy implements RoutingStrategy {
  getNextServer(servers: Server[]): Server {
    return servers[Math.floor(Math.random() * servers.length)];
  }
}

class RoundRobinStrategy implements RoutingStrategy {
  private currentIndex = 0;
  getNextServer(servers: Server[]): Server {
    const server = servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % servers.length;
    return server;
  }
}

// --- THE CONTEXT ---
class LoadBalancer {
  constructor(
    private servers: Server[],
    private strategy: RoutingStrategy
  ) {}

  setStrategy(strategy: RoutingStrategy) {
    this.strategy = strategy;
  }

  getNextServer(): Server {
    if (this.servers.length === 0) throw new Error("No servers!");
    return this.strategy.getNextServer(this.servers);
  }
}
```

# E. Pattern Breakdown

| Role | Name in Code | Responsibility |
| ---- | ------------ | -------------- |
| Context | `LoadBalancer` | Maintains a reference to the current strategy. |
| Strategy Interface | `RoutingStrategy` | Defines the method signature (`getNextServer`). |
| Concrete Strategy | `RoundRobin`, `Random` | Implements the specific algorithm. |

# F. Reflection Question
**Scenario:** You are running this `LoadBalancer` on **3 different machines** (behind a DNS).

* Each machine has its own instance of `RoundRobinStrategy`.
* User A hits Machine 1.
* User B hits Machine 2.

**Question:** Will the Round Robin order be perfectly synchronized across all 3 machines? (e.g. Does Machine 2 know that Machine 1 just picked Server-1?)

*Answer:* As it is currently implemented a Round Robin instance is unaware of any other instances, therefore - no - all Round Robins would work independently and out-of-sync.

# G. The "Least Connections" Challenge
You are doing great. Let's finish the **Strategy Pattern** with a slightly harder algorithm.

**Scenario:** Some servers are faster than others. Round Robin is unfair because it treats all servers as equal. We want to send traffic to the server that is currently **doing the least work**.

**Your Task:** Implement the `LeastConnectionsStrategy` class.
1. It must implement `RoutingStrategy`.
2. It needs to look at the `activeConnections` property of every server.
3. It should return the server with the **lowest** number.

> **Hint:** You can use a simple loop, `.sort()`, or `.reduce()`.

Here is the boilerplate to get you started:
```ts
// Reminder of the Server type
type Server = {
  id: string;
  activeConnections: number;
};

export class LeastConnectionsStrategy implements RoutingStrategy {
  getNextServer(servers: Server[]): Server {
    // TODO: logic to find the server with min(activeConnections)
  }
}
```

**Solution:**
```ts
// Reminder of the Server type
type Server = {
  id: string;
  activeConnections: number;
};

export class LeastConnectionsStrategy implements RoutingStrategy {
    getNextServer(servers: Server[]): Server {
        return servers.reduce((best, current) => {
            return current.activeConnections < best.activeConnections ? current : best;
        })
  }
}
```

