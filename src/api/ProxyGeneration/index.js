import {
  GENERATE_ADMIN_PROXY_GENERATION_ENPOINT,
  LIST_ADMIN_PROXY_GENERATION_ENDPOINT,
} from "./endpoints";
import ApiFactory from "../ApiFactory";

const AdminProxyGenerationApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

const generateAdminProxyApi = (params) =>
  AdminProxyGenerationApi.createBasicCRUDEndpoints({
    name: GENERATE_ADMIN_PROXY_GENERATION_ENPOINT,
  }).submitPost(params);

const listAdminProxyApi = (params) =>
  AdminProxyGenerationApi.createBasicCRUDEndpoints({
    name: LIST_ADMIN_PROXY_GENERATION_ENDPOINT,
  }).customGet(params);

export { generateAdminProxyApi, listAdminProxyApi };
