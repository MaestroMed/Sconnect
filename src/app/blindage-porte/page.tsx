import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("blindage-porte");
export const metadata = hub.metadata;
export default hub.Page;
