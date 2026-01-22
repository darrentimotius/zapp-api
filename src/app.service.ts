import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    const uptimeSeconds = Math.floor(process.uptime());

    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);

    return {
      status: 'ok',
      uptime: `${days}d ${hours}h ${minutes}m`,
      timestamp: new Date().toISOString(),
    };
  }
}
