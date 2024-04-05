/* eslint-disable */
import {
  USER_PACKAGE_ENDPOINT,
  PACKAGE_INFOMATION_ENPOINT,
  USER_PACKAGE_ADMIN_LIST_ENDPOINT,
  CONFIRM_USER_PACKAGE_ENDPOINT,
  DETAIL_USER_PACKAGE_ENDPOINT,
} from "./endpoints";
import ApiFactory from "../ApiFactory";

const UserPackageApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

UserPackageApi.createEntities([
  { name: USER_PACKAGE_ENDPOINT },
  { name: PACKAGE_INFOMATION_ENPOINT },
  { name: USER_PACKAGE_ADMIN_LIST_ENDPOINT },
  { name: CONFIRM_USER_PACKAGE_ENDPOINT },
  { name: DETAIL_USER_PACKAGE_ENDPOINT },
]);

const fetchListUserPackageApi = () =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: USER_PACKAGE_ENDPOINT,
  }).get();
const fetchPackageInfoApi = () =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: PACKAGE_INFOMATION_ENPOINT,
  }).get();
const fetchUserPackageByAdminApi = () =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: USER_PACKAGE_ADMIN_LIST_ENDPOINT,
  }).get();

const confirmUserPackageApi = (id) =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: CONFIRM_USER_PACKAGE_ENDPOINT,
  }).submitPut(id);

// const searchUserPackageApi = (keyword) => {
//   UserPackageApi.createBasicCRUDEndpoints({
//     name: SEARCH_USER_PACKAGE_ENDPOINT,
//   }).get(keyword);
// };

const detailUserPackageApi = (id) =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: DETAIL_USER_PACKAGE_ENDPOINT,
  }).getOne(id);

export {
  fetchListUserPackageApi,
  fetchPackageInfoApi,
  fetchUserPackageByAdminApi,
  confirmUserPackageApi,
  detailUserPackageApi,
  // createUserPackageApi,
  // preOrderUserPackageApi,
  // adminConfirmUserPackageApi,
  // fetchAdminListApi,
  // fetchInfoUserPackageApi
};
