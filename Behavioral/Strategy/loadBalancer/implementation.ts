// 1. Common Data Structure
export type Server = {
  id: string;
  activeConnections: number;
};

// 2. The Interface
export interface RoutingStrategy {
  getNextServer(servers: Server[]): Server;
}

// 3. Concrete Strategy: Random (Stateless)
export class RandomStrategy implements RoutingStrategy {
  getNextServer(servers: Server[]): Server {
    const randomIndex = Math.floor(Math.random() * servers.length);
    return servers[randomIndex];
  }
}

// 4. Concrete Strategy: Round Robin (Stateful)
export class RoundRobinStrategy implements RoutingStrategy {
	private currentIndex: number = 0;
	public getNextServer(servers: Server[]): Server {
		const server = servers[this.currentIndex];
		this.currentIndex = (this.currentIndex + 1) % servers.length;
		return server;
	}
}

// 5. The Context: Load Balancer
export class LoadBalancer {
  private servers: Server[];
  private strategy: RoutingStrategy;

  constructor(servers: Server[], strategy: RoutingStrategy) {
    this.servers = servers;
    this.strategy = strategy;
  }

  // This allows runtime switching!
  setStrategy(strategy: RoutingStrategy) {
    this.strategy = strategy;
  }

  getNextServer(): Server {
    if (this.servers.length === 0) {
      throw new Error("No servers available!");
    }
    return this.strategy.getNextServer(this.servers);
  }
}

// --- CLIENT CODE (Test yourself) ---
const servers = [
  { id: 'Server-1', activeConnections: 0 },
  { id: 'Server-2', activeConnections: 0 },
  { id: 'Server-3', activeConnections: 0 }
];

const loadBalancer = new LoadBalancer(servers, new RoundRobinStrategy());

console.log(loadBalancer.getNextServer().id); // Should be Server-1
console.log(loadBalancer.getNextServer().id); // Should be Server-2
console.log(loadBalancer.getNextServer().id); // Should be Server-3
console.log(loadBalancer.getNextServer().id); // Should be Server-1 (Wrapped)

// Switch to Random
loadBalancer.setStrategy(new RandomStrategy());
console.log("Switched to Random:", loadBalancer.getNextServer().id);
