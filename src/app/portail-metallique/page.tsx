import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("portail-metallique");
export const metadata = hub.metadata;
export default hub.Page;
