import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("relamping-led");
export const metadata = hub.metadata;
export default hub.Page;
