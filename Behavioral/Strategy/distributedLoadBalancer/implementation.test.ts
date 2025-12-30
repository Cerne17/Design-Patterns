// distributedLB.test.ts
import { 
  DistributedRoundRobinStrategy, 
  MockRedis, 
  Server 
} from './implementation'; // <--- UPDATE THIS PATH to your actual file name

describe('Distributed Round Robin Load Balancer', () => {
  let redis: MockRedis;
  let strategy: DistributedRoundRobinStrategy;

  // Test Data
  const servers: Server[] = [
    { id: 'Server-A', activeConnections: 0 }, // Index 0
    { id: 'Server-B', activeConnections: 0 }, // Index 1
    { id: 'Server-C', activeConnections: 0 }  // Index 2
  ];

  beforeEach(() => {
    // Reset the "Database" and Strategy before every test
    redis = new MockRedis();
    strategy = new DistributedRoundRobinStrategy(redis);
  });

  test('should route sequentially (Round Robin behavior)', async () => {
    // Note: MockRedis starts at 0. First incr returns 1.
    // 1 % 3 = 1 -> Server-B
    const s1 = await strategy.getNextServer(servers);
    expect(s1.id).toBe('Server-B');

    // 2 % 3 = 2 -> Server-C
    const s2 = await strategy.getNextServer(servers);
    expect(s2.id).toBe('Server-C');

    // 3 % 3 = 0 -> Server-A (Wrap around)
    const s3 = await strategy.getNextServer(servers);
    expect(s3.id).toBe('Server-A');
  });

  test('should handle concurrent requests safely (Atomic Increments)', async () => {
    // We simulate 5 requests firing at the exact same time
    const promises = [
      strategy.getNextServer(servers),
      strategy.getNextServer(servers),
      strategy.getNextServer(servers),
      strategy.getNextServer(servers),
      strategy.getNextServer(servers)
    ];

    const results = await Promise.all(promises);

    // Because Redis operations are atomic, we should get 5 unique tickets 
    // mapped to servers. We just need to verify we got results.
    expect(results).toHaveLength(5);
    
    // Verify distribution: roughly even or at least valid servers
    results.forEach(server => {
      expect(['Server-A', 'Server-B', 'Server-C']).toContain(server.id);
    });
    
    // Verify the internal counter actually went up by 5
    // We can "cheat" and peek into the strategy logic by calling it one more time
    // Next one should be the 6th increment
    const nextServer = await strategy.getNextServer(servers);
    // 6 % 3 = 0 -> Server-A
    expect(nextServer.id).toBe('Server-A'); 
  });

  test('should throw error if server list is empty', async () => {
    await expect(async () => {
      await strategy.getNextServer([]);
    }).rejects.toThrow('No servers available');
  });

  test('should use the correct key for Redis increment', async () => {
    // Spy on the redis instance to ensure we are calling the right DB key
    const spy = jest.spyOn(redis, 'incr');

    await strategy.getNextServer(servers);

    expect(spy).toHaveBeenCalledWith('round_robin_idx');
  });
});
