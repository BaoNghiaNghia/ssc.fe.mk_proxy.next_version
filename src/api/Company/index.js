import { COMPANY_INFO_ENDPOINT } from "./endpoints";
import ApiFactory from "../ApiFactory";

const UserPackageApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

UserPackageApi.createEntities([{ name: COMPANY_INFO_ENDPOINT }]);

const fetchCompanyInfoApi = () =>
  UserPackageApi.createBasicCRUDEndpoints({
    name: COMPANY_INFO_ENDPOINT,
  }).get();

export { fetchCompanyInfoApi };
