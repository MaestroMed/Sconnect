import { makeLocalService } from "@/lib/local-seo/page-factory";

// ISR : tier A pré-généré au build, longue traîne rendue à la demande + cache.
export const dynamicParams = true;
export const revalidate = 604800; // 7 jours

const svc = makeLocalService("interphonie");
export const generateStaticParams = svc.generateStaticParams;
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
