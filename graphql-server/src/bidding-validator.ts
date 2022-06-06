export class BiddingValidator {
  static readonly LOWER_BOUND = Number.parseInt(
    process.env.BIDDING_LOWER_BOUND || '-99',
  );

  static readonly UPPER_BOUND = Number.parseInt(
    process.env.BIDDING_UPPER_BOUND || '1000',
  );

  validate(bidding: number) {
    return (
      bidding >= BiddingValidator.LOWER_BOUND &&
      bidding <= BiddingValidator.UPPER_BOUND
    );
  }
}
