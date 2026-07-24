declare module "virtual:cosense-theme-lab/options" {
  export interface ThemeLabNavItem {
    label: string;
    page?: string;
    href?: string;
  }
  export interface ThemeLabLogo {
    src: string;
    height?: number;
    darkSrc?: string;
  }
  export interface ThemeLabRuntimeOptions {
    siteTitle?: string;
    logo?: ThemeLabLogo;
    favicon?: string;
    siteDescription?: string;
    nav: ThemeLabNavItem[];
    homePage?: string;
    newsTag: string;
    memberTag: string;
    affiliation?: string;
    copyrightHolder?: string;
    copyrightUrl?: string;
    tokens: Record<string, string>;
    colorScheme?: "light" | "dark";
    fontHref?: string;
    search: boolean;
  }
  const options: ThemeLabRuntimeOptions;
  export default options;
}
