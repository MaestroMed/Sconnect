import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("borne-recharge-irve");
export const metadata = hub.metadata;
export default hub.Page;
