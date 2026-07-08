import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("interphonie");
export const metadata = hub.metadata;
export default hub.Page;
