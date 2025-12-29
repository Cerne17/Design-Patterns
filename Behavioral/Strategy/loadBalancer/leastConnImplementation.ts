type Server = {
  id: string;
  activeConnections: number;
};

interface RoutingStrategy {
  getNextServer(servers: Server[]): Server;
}

export class LeastConnectionsStrategy implements RoutingStrategy {
  getNextServer(servers: Server[]): Server {
    if (servers.length === 0) {
      throw new Error("No servers available");
    }
    
    return servers.reduce((minServer, currentServer) => {
      return currentServer.activeConnections < minServer.activeConnections 
        ? currentServer 
        : minServer;
    });
  }
}

// --- TEST IT ---
const myServers = [
  { id: 'S1', activeConnections: 10 },
  { id: 'S2', activeConnections: 3 }, // <--- Winner
  { id: 'S3', activeConnections: 8 }
];

const strategy = new LeastConnectionsStrategy();
console.log("Best server:", strategy.getNextServer(myServers).id);
