import {type TRequestStatus } from "@/shared/lib/constants";

export type TRequest = {
  id: string;
  skillId: string;
  fromUserId: string;
  toUserId: string;
  status: TRequestStatus;
  createdAt: string;
  updatedAt: string;
};