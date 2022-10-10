import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlacklistService } from 'src/blacklist/blacklist.service';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private readonly blacklistService: BlacklistService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = request.headers.authorization.split(' ')[1];
      this.blacklistService.findOne(token).then((data) => {
        if (data) return false;
        return true;
      });
      // this.authService.saveJwtInBlacklist(tokenToDisable);
      // return response.sendStatus(200);
      return false;
    }
  }
}
