export interface CreateGiftCard {
  issuerId: number;
  recipientId: number;
  recipientEmail: string;
  establishmentId: number;
  message: string;
  value: number;
  currency: string; // ARS
  expirationDate: Date;
  active: boolean;
}
