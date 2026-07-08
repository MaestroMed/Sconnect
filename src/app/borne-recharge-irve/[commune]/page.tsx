import { makeLocalService } from "@/lib/local-seo/page-factory";

const svc = makeLocalService("borne-recharge-irve");
export const dynamicParams = false;
export const generateStaticParams = svc.generateStaticParams;
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
