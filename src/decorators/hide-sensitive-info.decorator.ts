import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function HideSensitiveValues(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
