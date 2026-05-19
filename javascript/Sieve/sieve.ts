/** 0-based primes: 0 is 2, 1 is 3, and so on. */
export class Sieve {
  NthPrime(n: number): number {
    if (n === 0) {
      return 2;
    }

    // Unlike the original Eratosthenes algorithm, n tells us which prime to find, not what limit to search up to.
    // We sieve all integers up to limit and count primes until we hit index n.
    // If the range is too small, double it.
    let limit = n;

    while (true) {
      const prime = nthPrimeUpToLimit(n, limit);
      if (prime !== null) {
        return prime;
      }
      limit *= 2;
    }
  }
}

// Returns the nth prime or null if it lies above limit.
function nthPrimeUpToLimit(n: number, limit: number): number | null {
  // One byte per odd number. 0 means still might be prime, 1 means composite.
  const size = Math.floor((limit - 1) / 2);
  const composite = new Uint8Array(size);

  // Index 0 is 2, handled in NthPrime. The first odd here is 3 at index 1.
  let primeIndex = 1;

  // Walk odds in order. Each unmarked slot is prime; mark its multiples before moving on.
  for (let i = 0; i < size; i++) {
    if (composite[i] === 0) {
      const p = 2 * i + 3;

      if (primeIndex === n) {
        return p;
      }
      primeIndex++;

      // Multiples below p squared were already crossed off by smaller primes.
      if (p * p <= limit) {
        for (let j = (p * p - 3) / 2; j < size; j += p) {
          composite[j] = 1;
        }
      }
    }
  }

  return null;
}
