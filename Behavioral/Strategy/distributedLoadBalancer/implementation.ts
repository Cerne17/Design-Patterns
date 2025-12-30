// 1. The Data Types
export type Server = {
  id: string;
  activeConnections: number;
};

// 2. The Store Interface (The contract for Redis)
export interface AsyncStore {
  // Atomically increments a value and returns the new number
  incr(key: string): Promise<number>; 
}

// 3. The New Routing Interface
export interface AsyncRoutingStrategy {
  getNextServer(servers: Server[]): Promise<Server>;
}

// 4. Mock Redis (Simulates a database)
export class MockRedis implements AsyncStore {
  private data = new Map<string, number>();

  async incr(key: string): Promise<number> {
    // Simulate 100ms network latency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const current = this.data.get(key) || 0;
    const next = current + 1;
    this.data.set(key, next);
    return next;
  }
}

// 5. Your Implementation
export class DistributedRoundRobinStrategy implements AsyncRoutingStrategy {
  private store: AsyncStore;

  constructor(store: AsyncStore) {
    this.store = store;
  }

  async getNextServer(servers: Server[]): Promise<Server> {
	if (servers.length === 0) {
			throw new Error("No servers available");
		}
    // 1. Get the next atomic index from the store (use key 'round_robin_idx')
	const roundRobinIndex = await this.store.incr('round_robin_idx');
    // 2. Calculate the correct index using modulo
	const index = roundRobinIndex % servers.length;
    // 3. Return the server
	return servers[index];
  }
}

// --- TEST SIMULATION ---
async function runSimulation() {
  const redis = new MockRedis();
  const strategy = new DistributedRoundRobinStrategy(redis);
  
  const servers = [
    { id: 'Server-A', activeConnections: 0 },
    { id: 'Server-B', activeConnections: 0 }
  ];

  // Simulating 2 requests happening "at the same time"
  const req1 = strategy.getNextServer(servers);
  const req2 = strategy.getNextServer(servers);
  
  const results = await Promise.all([req1, req2]);
  
  console.log('Request 1 routed to:', results[0].id);
  console.log('Request 2 routed to:', results[1].id);
}

// runSimulation();
