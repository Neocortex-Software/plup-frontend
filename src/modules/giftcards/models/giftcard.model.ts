export interface GiftCard {
  issuerId: number;
  recipientId: number;
  establishmentId: number;
  code: string;
  expirationDate: string;
  redeemedAt: Date;
  redeemed: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
