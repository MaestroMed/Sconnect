import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("ouverture-porte");
export const metadata = hub.metadata;
export default hub.Page;
