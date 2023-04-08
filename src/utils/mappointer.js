import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.HERE_GEOCODING_API_KEY;
const appId = process.env.HERE_GEOCODING_APP_ID;

export const MapPointer = {
  getAllProvinces: async () => {
    const url = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
    return axios
      .get(url)
      .then((response) => {
        return response?.data?.data?.data?.map((province) => {
          return { code: province.code, name: province.name };
        });
      })
      .catch(async (error) => {
        const urlBackup = `https://provinces.open-api.vn/api/p?depth=2`;
        return (await axios.get(urlBackup))?.data;
      });
  },
  getAllDistrictsByProvinceCode: async (provinceCode) => {
    const url = `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`;
    return axios
      .get(url)
      .then((response) => {
        return response?.data?.data?.data?.map((district) => {
          return { code: district.code, name: district.name_with_type };
        });
      })
      .catch(async (error) => {
        const urlBackup = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
        return (await axios.get(urlBackup))?.data?.districts;
      });
  },
  getAllWardsByDistrictCode: async (districtCode) => {
    const url = `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`;
    return axios
      .get(url)
      .then((response) => {
        return response?.data?.data?.data?.map((ward) => {
          return { code: ward.code, name: ward.name_with_type };
        });
      })
      .catch(async (error) => {
        const urlBackup = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;
        return (await axios.get(urlBackup))?.data?.wards;
      });
  },
  getRelativeCoordinatesByAdress: async (address) => {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${apiKey}`;
    return (await axios.get(url))?.data?.items[0].position;
  },
  getLocationByCoordinates: async ({ lat, lng }) => {
    lat = parseFloat(lat).toFixed(4);
    lng = parseFloat(lng).toFixed(4);
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&app_id=${appId}&at=${lat},${lng}`;
    const { street, district, city, county, countryName } = (
      await axios.get(url)
    ).data.items[0].address;
    return { street, district, city, county, countryName };
  },
};
