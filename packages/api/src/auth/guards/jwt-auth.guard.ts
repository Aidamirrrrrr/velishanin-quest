import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import type { ExecutionContext } from '@nestjs/common'
import type { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
}
