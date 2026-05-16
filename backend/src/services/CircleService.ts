import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export class CircleService {
  static async createCircle(data: {
    name: string;
    memberCount: number;
    amount: number;
    frequencyDays: number;
    payoutOrder: string;
    penaltyRateBps: number;
    autoRenew: boolean;
    creatorAddress: string;
  }) {
    // In a real implementation, we would deploy the contracts here.
    // For the prototype, we mock the contract IDs.
    const mockContractId = `C${nanoid(55)}`;
    const inviteCode = nanoid(6).toUpperCase();

    return await prisma.circle.create({
      data: {
        ...data,
        contributionAmount: data.amount,
        contractId: mockContractId,
        inviteCode,
        status: "Forming",
      },
    });
  }

  static async joinCircle(inviteCode: string, userAddress: string) {
    const circle = await prisma.circle.findUnique({
      where: { inviteCode },
    });

    if (!circle) {
      throw new Error("Circle not found");
    }

    const currentMembers = await prisma.member.count({
      where: { circleId: circle.id },
    });

    if (currentMembers >= circle.memberCount) {
      throw new Error("Circle is full");
    }

    // Check if already a member
    const existing = await prisma.member.findUnique({
      where: {
        circleId_userId: {
          circleId: circle.id,
          userId: userAddress, // Using address as userId for prototype
        },
      },
    });

    if (existing) {
      throw new Error("Already a member");
    }

    return await prisma.member.create({
      data: {
        circleId: circle.id,
        userId: userAddress,
        payoutPosition: currentMembers + 1,
      },
    });
  }

  static async getMyCircles(address: string) {
    // This is a stub in the index, but we can implement a basic version.
    const memberships = await prisma.member.findMany({
      where: { userId: address },
      select: { circleId: true },
    });

    const circleIds = memberships.map((m: { circleId: string }) => m.circleId);


    return await prisma.circle.findMany({
      where: {
        id: { in: circleIds },
      },
    });
  }
}