import { makeServiceHub } from "@/lib/local-seo/page-factory";

const hub = makeServiceHub("controle-acces");
export const metadata = hub.metadata;
export default hub.Page;
