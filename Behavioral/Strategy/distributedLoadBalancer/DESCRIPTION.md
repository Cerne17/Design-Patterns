# A. The New Architecture
Instead of the Strategy holding the state, the Strategy will communicate with a **Shared Data Store** (like Redis, Memcached, or a Database).

## Architecture Changes:
1. **The Strategy becomes Stateless:** It doesn't hold `currentIndex`. It asks the Store for it.
2. **Async Everything:** fetching data from a database is asynchronous, so our synchronous `getNextServer` method must change.
3. **Atomic Operations:** We need to handle "Race Conditions". If Process A and Process B both read "Index = 0" at the same time, they both send traffic to Server 1. We need a safe way to count.

# B. Your Design Challenge
We need to create a **Mock Redis** to act as our shared store.

## Design Question 1: The New Interface
Since network calls take time, our `RoutingStrategy` can no longer return Server directly.

**Question:** What should the signature of `getNextServer` look like now?

*Answer:*
```ts
type Server = {
  id: string;
  activeConnections: number;
};

interface AsyncRoutingStrategy {
    getNextServer(servers: Server[]): Promise<Server>;
}
```

## Design Question 2: The Storage Interface
We need an interface for our "fake Redis" so the Strategy can use it.

**Question:** To implement Round Robin safely, simply `get()` and `set()` isn't enough (because of race conditions). What specific method does a database like Redis provide to safely increase a counter by 1? (Hint: It starts with `incr...`).

*Answer:* In Redis, we have some Atomic Operations that can help us achieve truly distributed systems. The most relevant ones are `GET` (so that we can swap the `get()` methods), `CHECK` (so that we can swap the `set()` methods) and `INCR` (to safely increase the counters). Alongside with `INCR`, Redis also exposes the method `EXPIRE` in order to make sure that, not only the data is cohesive, but also is relevant, communicating to the API whether the data should be considered EXPIRED or not. 

**Question:** Draft the new `AsyncStore` interface.

*Answer:*
```ts
interface AsyncStore {
    incr(key: string): Promise<number>;
}
```
