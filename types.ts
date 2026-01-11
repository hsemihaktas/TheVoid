export enum SystemStatus {
  IDLE = "IDLE",
  ANALYZING = "ANALYZING",
  READY = "READY",
  ERROR = "ERROR",
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}
