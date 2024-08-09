import { Test, TestingModule } from '@nestjs/testing';
import { Card } from './card';

describe('Card', () => {
  let provider: Card;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Card],
    }).compile();

    provider = module.get<Card>(Card);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
