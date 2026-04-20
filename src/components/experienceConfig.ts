export const CAMERA_STAGE_Y = [30, -82, -154, -226, -298, -370] as const;
export const EXPERIENCE_STAGE_EVENT = "zyflus:experience-stage-change";
export const EXPERIENCE_STAGE_COUNT = CAMERA_STAGE_Y.length;

export type SceneStage = 0 | 1 | 2 | 3 | 4 | 5;
export type ViewportMode = "mobile" | "tablet" | "desktop";

export const SCROLL_SNAP_POINTS = [0, 0.2, 0.4, 0.6, 0.8, 1] as const;
export const STAGE_THRESHOLDS = [0.1, 0.3, 0.5, 0.7, 0.9] as const;
export const VIEWPORT_BREAKPOINTS = {
  mobile: 640,
  tablet: 900,
} as const;

const SCENE_DEPTH = -28;

export const SCENE_CENTERS = {
  services: [0, CAMERA_STAGE_Y[1], SCENE_DEPTH] as [number, number, number],
  clients: [0, CAMERA_STAGE_Y[2], SCENE_DEPTH] as [number, number, number],
  caseStudies: [0, CAMERA_STAGE_Y[3], SCENE_DEPTH] as [number, number, number],
  contact: [0, CAMERA_STAGE_Y[4], SCENE_DEPTH] as [number, number, number],
  footer: [0, CAMERA_STAGE_Y[5], SCENE_DEPTH] as [number, number, number],
};

export function stageFromProgress(progress: number): SceneStage {
  if (progress >= STAGE_THRESHOLDS[4]) return 5;
  if (progress >= STAGE_THRESHOLDS[3]) return 4;
  if (progress >= STAGE_THRESHOLDS[2]) return 3;
  if (progress >= STAGE_THRESHOLDS[1]) return 2;
  if (progress >= STAGE_THRESHOLDS[0]) return 1;
  return 0;
}

export function progressFromStage(stage: SceneStage) {
  return stage / (EXPERIENCE_STAGE_COUNT - 1);
}

export function resolveViewportMode(width: number): ViewportMode {
  if (width <= VIEWPORT_BREAKPOINTS.mobile) return "mobile";
  if (width <= VIEWPORT_BREAKPOINTS.tablet) return "tablet";
  return "desktop";
}
