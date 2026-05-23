export interface StoredChallenge {
  account: string;
  expiresAt: number;
}

export class MemoryChallengeStore {
  private challenges = new Map<string, StoredChallenge>();

  set(id: string, challenge: StoredChallenge) {
    this.challenges.set(id, challenge);
  }

  get(id: string, now = Date.now()) {
    const challenge = this.challenges.get(id);

    if (!challenge) return undefined;

    if (challenge.expiresAt <= now) {
      this.challenges.delete(id);
      return undefined;
    }

    return challenge;
  }

  delete(id: string) {
    this.challenges.delete(id);
  }
}
