import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTAyOTIxMjEsIkFwcGxpY2F0aW9uIjoiUnVrb3ZvZGl0ZWwifQ.tdUIEg-hrhP2dRQHL1r6x3raC2GZ8qu0utwrTC8zUBk";

const instance = axios.create({
    baseURL: `https://portal.liloo.by/api/services/`,
    headers: {
        Authorization : `Bearer ${token}`,
        "Access-Control-Allow-Origin": "https://portal.liloo.by/api/",
    },
});
instance.interceptors.response.use(
    (response) => response,
    (error) => checkError(error)
);
const checkError = (error) => {
    alert(error.message);
};

export const getDataForCreateTtn = async () => {
    const response = await instance.post("get_data_for_create_ttn");
    return response.data;
};

export const fillTemplate = async (value) => {
    const response = await instance.post("fill_template", value);
    return response.data;
};

export const sendTemplate = async (params) => {
    const json = {...params};
    console.log("json", json);
};

export const sendCommodityDictionary = async (params) => {
    const json = {...params};
    const response = await instance.post("add_position", json);
    return response.status === 200;
};

export const showSection = async (section) => {
    const response = await instance.post("show_section", { "position": section });
    return response;
};

export const deleteSection = async (section) => {
    const response = await instance.post("remove_position", { "position": section });
    return response.status === 200;
};

export const updateCommodityDictionary = async (params) => {
    const json = {...params};
    await instance.post("update_section", json);
};

export const getCommodityDictionary = async (searchText) => {
    const response = await instance.post("get_commodity_dictionary",  { filter: searchText });
    return response.data;
};