import { BiddingValidator } from 'src/bidding-validator';
import { PercentageOutOfRange } from 'src/graphql';

export class PercentageOutOfRangeFactory {
  create(): PercentageOutOfRange {
    const result = new PercentageOutOfRange();
    result.message = 'Percetange out of range.';
    result.lowerBound = BiddingValidator.LOWER_BOUND;
    result.upperBound = BiddingValidator.UPPER_BOUND;

    return result;
  }
}
