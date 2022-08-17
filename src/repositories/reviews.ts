import Base from './base';

import { CreateReviewInput } from '@ts-types/generated';

class Review extends Base<CreateReviewInput, CreateReviewInput> {}

export default new Review();
