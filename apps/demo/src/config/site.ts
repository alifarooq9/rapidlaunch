// purpose: all site configuration for the app

import { urls } from "@/config/urls";
import { headerNav } from "@/config/nav";
import { promotions } from "@/config/promotions";

export const siteConfig = {
  name: "RapidLaunch",
  logo: "🚀",
  promotions: promotions,
  urls: urls,
  headerNav: headerNav,
} as const;
