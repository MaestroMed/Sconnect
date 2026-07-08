import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("electricien");
export const metadata = hub.metadata;
export default hub.Page;
