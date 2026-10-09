export const content: any;
export const routes: any[];
export const template: any;
export function makeSeo(path: string, config: any, opts?: { production?: boolean }): { metadata: any; jsonLd: any; headHtml: string };
export function makeSitemap(config: any, opts?: { production?: boolean }): string;
export function makeRobots(config: any, opts?: { production?: boolean }): string;
