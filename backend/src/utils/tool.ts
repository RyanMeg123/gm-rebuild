import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export function cleanConditions<T>(conditions: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(conditions).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  ) as Partial<T>;
}

export function generateParseIntPipe(name) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(`${name}应该是数字`);
    },
  });
}
