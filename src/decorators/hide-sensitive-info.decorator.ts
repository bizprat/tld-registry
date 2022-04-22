import { UseInterceptors } from '@nestjs/common';
import {
  ClassConstructor,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

// interface ClassConstructor {
//   new (...args: any[]): object;
// }

export function HideSensitiveData(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
