import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("mise-aux-normes-electrique");
export const metadata = hub.metadata;
export default hub.Page;
