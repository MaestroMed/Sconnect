import { makeLocalService } from "@/lib/local-seo/page-factory";

const svc = makeLocalService("mise-aux-normes-electrique");
export const dynamicParams = false;
export const generateStaticParams = svc.generateStaticParams;
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
