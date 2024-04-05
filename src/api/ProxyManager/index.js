import { ADMIN_PROXY_MANAGER_ENPOINT } from "./endpoints";
import ApiFactory from "../ApiFactory";

const AdminProxyApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

AdminProxyApi.createEntities([{ name: ADMIN_PROXY_MANAGER_ENPOINT }]);

const fetchAdminProxyApi = () =>
  AdminProxyApi.createBasicCRUDEndpoints({
    name: ADMIN_PROXY_MANAGER_ENPOINT,
  }).get();

const detailAdminProxyApi = (id) =>
  AdminProxyApi.createBasicCRUDEndpoints({
    name: ADMIN_PROXY_MANAGER_ENPOINT,
  }).getOne(id);

const createAdminProxyApi = (data) =>
  AdminProxyApi.createBasicCRUDEndpoints({
    name: ADMIN_PROXY_MANAGER_ENPOINT,
  }).post(data);

const updateAdminProxyApi = (data) =>
  AdminProxyApi.createBasicCRUDEndpoints({
    name: ADMIN_PROXY_MANAGER_ENPOINT,
  }).update(data);

const deleteAdminProxyApi = (id) =>
  AdminProxyApi.createBasicCRUDEndpoints({
    name: ADMIN_PROXY_MANAGER_ENPOINT,
  }).delete(id);

export {
  fetchAdminProxyApi,
  detailAdminProxyApi,
  createAdminProxyApi,
  updateAdminProxyApi,
  deleteAdminProxyApi,
};
