import { parse } from "papaparse";
import config from "../config/papaParseConfig.js";
import dateService from "./dateService.js";

const transform = (value, header) => {
  if (header === "DateFrom" || header === "DateTo") {
    if (value === "NULL") {
      value = new Date();
    }

    value = dateService.strToDate(value);
  }

  return value;
};

const scvToJson = (str) => {
  return parse(str, { ...config, transform });
};
const parser = {
  scvToJson,
};

export default parser;
