import { UseInterceptors } from '@nestjs/common';
import {
  ClassConstructor,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

// interface ClassConstructor {
//   new (...args: any[]): object;
// }

export function HideSensitiveValues(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
