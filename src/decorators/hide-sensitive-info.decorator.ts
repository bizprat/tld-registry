import { UseInterceptors } from '@nestjs/common';
import {
  ClassConstructor,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

export function HideSensitiveData(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
